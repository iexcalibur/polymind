import { LiveData, Service } from '@toeverything/infra';
import { firstValueFrom, take } from 'rxjs';

import type { SpaceService } from '../../space/services/space';
import type { SpaceMemoryStore } from '../../space/stores/space-memory';
import type {
  WorkspaceChatMessageRecord,
  WorkspaceChatStore,
} from '../stores/workspace-chat';

const CLAUDE_API_KEY_KEY = 'ploy-note:claude-api-key';
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const CLAUDE_MODEL = 'claude-3-5-haiku-20241022';
const MAX_HISTORY = 10;

export class WorkspaceChatService extends Service {
  constructor(
    private readonly chatStore: WorkspaceChatStore,
    private readonly spaceService: SpaceService,
    private readonly memoryStore: SpaceMemoryStore
  ) {
    super();
  }

  // ─── API Key (shared with Space Chat) ──────────────────────────────

  getApiKey(): string {
    return localStorage.getItem(CLAUDE_API_KEY_KEY) ?? '';
  }

  setApiKey(key: string) {
    localStorage.setItem(CLAUDE_API_KEY_KEY, key.trim());
  }

  hasApiKey(): boolean {
    return !!this.getApiKey();
  }

  removeApiKey() {
    localStorage.removeItem(CLAUDE_API_KEY_KEY);
  }

  // ─── Reactive messages ────────────────────────────────────────────────

  messages$(): LiveData<WorkspaceChatMessageRecord[]> {
    return LiveData.from<WorkspaceChatMessageRecord[]>(
      this.chatStore.watchMessages$(),
      []
    );
  }

  // ─── Send a message and stream the response ───────────────────────────

  async sendMessage(
    userMessage: string,
    onChunk: (chunk: string) => void
  ): Promise<void> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error(
        'No Claude API key configured. Enter your key in the Chat panel.'
      );
    }

    // Persist the user message immediately
    this.chatStore.addMessage('user', userMessage);

    // Fetch all messages for history
    const allMessages = await firstValueFrom(
      this.chatStore.watchMessages$().pipe(take(1))
    );

    // Build conversation history (exclude the message we just added)
    const history = allMessages
      .slice(0, -1)
      .slice(-MAX_HISTORY)
      .map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }));

    const systemPrompt = await this.buildSystemPrompt();

    let fullResponse = '';
    try {
      fullResponse = await this.callClaude(
        apiKey,
        systemPrompt,
        history,
        userMessage,
        onChunk
      );
    } catch (err) {
      // Remove the user message if the call fails
      const latest = allMessages.at(-1);
      if (latest) this.chatStore.deleteMessage(latest.id);
      throw err;
    }

    // Persist the assistant response
    this.chatStore.addMessage('assistant', fullResponse);
  }

  // ─── Clear chat history ───────────────────────────────────────────────

  clearHistory() {
    this.chatStore
      .watchMessages$()
      .pipe(take(1))
      .subscribe(messages => {
        messages.forEach(m => this.chatStore.deleteMessage(m.id));
      });
  }

  // ─── Internal helpers ─────────────────────────────────────────────────

  private async buildSystemPrompt(): Promise<string> {
    const spaces = this.spaceService.spaces$.value;

    const lines: string[] = [
      'You are the global AI assistant for Ploy-Note, a personal knowledge management workspace.',
      'You have access to information across ALL Spaces in this workspace.',
      'Your role is to help the user find connections, answer cross-Space questions, and route queries to the right context.',
    ];

    if (spaces.length === 0) {
      lines.push('\nThis workspace has no Spaces yet.');
    } else {
      lines.push(`\nThis workspace contains ${spaces.length} Space(s):\n`);

      for (const space of spaces) {
        const spaceName = space.name$.value;
        const docIds = this.spaceService.getSpaceDocIds$(space.id).value;
        const docCount = docIds.length;

        // Fetch memories for this space
        const memories = await firstValueFrom(
          this.memoryStore.watchMemories$(space.id).pipe(take(1))
        );

        const memoryStr =
          memories.length > 0
            ? ` | Memories: ${memories.map(m => m.content).join('; ')}`
            : '';

        lines.push(
          `- "${spaceName}" (${docCount} doc${docCount === 1 ? '' : 's'})${memoryStr}`
        );
      }
    }

    lines.push(
      '\nWhen answering, identify which Space(s) are relevant to the question. Synthesize knowledge across Spaces when appropriate.',
      'Be concise and helpful.'
    );

    return lines.join('\n');
  }

  private async callClaude(
    apiKey: string,
    systemPrompt: string,
    history: Array<{ role: 'user' | 'assistant'; content: string }>,
    userMessage: string,
    onChunk: (chunk: string) => void
  ): Promise<string> {
    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: 2048,
        system: systemPrompt,
        stream: true,
        messages: [...history, { role: 'user', content: userMessage }],
      }),
    });

    if (!response.ok) {
      let detail = '';
      try {
        detail = await response.text();
      } catch {
        // ignore
      }
      throw new Error(`Claude API error ${response.status}: ${detail}`);
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error('No response body from Claude API');

    const decoder = new TextDecoder();
    let fullResponse = '';

    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;

      const text = decoder.decode(value, { stream: true });
      for (const line of text.split('\n')) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6).trim();
        if (!data || data === '[DONE]') continue;
        try {
          const parsed = JSON.parse(data) as {
            type?: string;
            delta?: { type?: string; text?: string };
          };
          if (
            parsed.type === 'content_block_delta' &&
            parsed.delta?.type === 'text_delta' &&
            parsed.delta.text
          ) {
            fullResponse += parsed.delta.text;
            onChunk(parsed.delta.text);
          }
        } catch {
          // Incomplete JSON chunk — safe to ignore
        }
      }
    }

    return fullResponse;
  }
}
