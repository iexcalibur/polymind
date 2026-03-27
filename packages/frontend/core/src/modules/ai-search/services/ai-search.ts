import { Service } from '@toeverything/infra';

import type { DocsService } from '../../doc';
import type { DocPropertiesStore } from '../../doc/stores/doc-properties';
import type { SpaceService } from '../../space/services/space';

const CLAUDE_API_KEY_KEY = 'ploy-note:claude-api-key';
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const CLAUDE_MODEL = 'claude-3-5-haiku-20241022';

export class AISearchService extends Service {
  constructor(
    private readonly spaceService: SpaceService,
    private readonly docsService: DocsService,
    private readonly docPropertiesStore: DocPropertiesStore
  ) {
    super();
  }

  hasApiKey(): boolean {
    return !!localStorage.getItem(CLAUDE_API_KEY_KEY);
  }

  /**
   * Search across all docs using Claude to reason about relevance.
   * Streams an explanation of the most relevant documents.
   */
  async searchWithAI(
    query: string,
    onChunk: (chunk: string) => void
  ): Promise<void> {
    const apiKey = localStorage.getItem(CLAUDE_API_KEY_KEY);
    if (!apiKey) {
      throw new Error('No Claude API key configured.');
    }

    // Gather all spaces and their docs
    const spaces = this.spaceService.spaces$.value;
    const spaceInfo: Array<{
      spaceName: string;
      spaceId: string;
      docTitles: string[];
    }> = [];

    for (const space of spaces) {
      const docIds = this.spaceService.getSpaceDocIds$(space.id).value;
      const docTitles: string[] = [];
      for (const docId of docIds) {
        const record = this.docsService.list.doc$(docId).value;
        if (record) {
          const title = record.title$.value;
          if (title) docTitles.push(`"${title}" (id:${docId})`);
        }
      }
      spaceInfo.push({
        spaceName: space.name$.value,
        spaceId: space.id,
        docTitles,
      });
    }

    const systemPrompt = this.buildSearchPrompt(spaceInfo);

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
        max_tokens: 1024,
        system: systemPrompt,
        stream: true,
        messages: [{ role: 'user', content: query }],
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
    if (!reader) throw new Error('No response body');

    const decoder = new TextDecoder();
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
            onChunk(parsed.delta.text);
          }
        } catch {
          // ignore
        }
      }
    }
  }

  private buildSearchPrompt(
    spaceInfo: Array<{
      spaceName: string;
      spaceId: string;
      docTitles: string[];
    }>
  ): string {
    const lines: string[] = [
      'You are an AI search engine for a personal knowledge management workspace called Ploy-Note.',
      'The user will type a search query. Your job is to find and rank the most relevant documents from the workspace.',
      'Explain WHY each result is relevant. Be concise.',
      '',
      'Available documents by Space:',
    ];

    for (const space of spaceInfo) {
      if (space.docTitles.length === 0) {
        lines.push(`\n[${space.spaceName}]: (empty)`);
      } else {
        lines.push(
          `\n[${space.spaceName}]:\n${space.docTitles.map(t => `  - ${t}`).join('\n')}`
        );
      }
    }

    lines.push(
      '',
      'For each relevant result, format as:',
      '**Doc Title** (Space: SpaceName)',
      'Brief explanation of relevance.',
      '',
      'If nothing matches, say so honestly. Rank by relevance, most relevant first.'
    );

    return lines.join('\n');
  }
}
