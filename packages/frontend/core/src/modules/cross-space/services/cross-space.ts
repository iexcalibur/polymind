import { LiveData, Service } from '@toeverything/infra';

import type { SpaceService } from '../../space/services/space';
import type { SpaceMemoryStore } from '../../space/stores/space-memory';
import type {
  CrossSpaceConnectionRecord,
  CrossSpaceStore,
} from '../stores/cross-space';

const CLAUDE_API_KEY_KEY = 'ploy-note:claude-api-key';
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const CLAUDE_MODEL = 'claude-3-5-haiku-20241022';

export class CrossSpaceService extends Service {
  constructor(
    private readonly store: CrossSpaceStore,
    private readonly spaceService: SpaceService,
    private readonly memoryStore: SpaceMemoryStore
  ) {
    super();
  }

  readonly connections$ = LiveData.from<CrossSpaceConnectionRecord[]>(
    this.store.watchConnections$(),
    []
  );

  /**
   * Ask Claude to find connections between spaces based on their content.
   */
  async findConnections(): Promise<void> {
    const apiKey = localStorage.getItem(CLAUDE_API_KEY_KEY);
    if (!apiKey) throw new Error('No Claude API key configured.');

    const spaces = this.spaceService.spaces$.value;
    if (spaces.length < 2) return;

    // Gather space info
    const spaceDescriptions: string[] = [];
    for (const space of spaces) {
      const name = space.name$.value;
      const docIds = this.spaceService.getSpaceDocIds$(space.id).value;

      // Get memories
      const memories = await new Promise<string[]>(resolve => {
        this.memoryStore
          .watchMemories$(space.id)
          .subscribe(mems => {
            resolve(mems.map(m => m.content));
          })
          .unsubscribe();
      }).catch(() => [] as string[]);

      spaceDescriptions.push(
        `Space "${name}" (id:${space.id}): ${docIds.length} docs. Memories: ${memories.length > 0 ? memories.join('; ') : 'none'}`
      );
    }

    const prompt = `Given these Spaces in a knowledge management workspace:

${spaceDescriptions.join('\n')}

Identify meaningful connections between pairs of Spaces based on overlapping topics, related memories, or complementary content.

Reply with ONLY valid JSON — no markdown, no explanation:
[{"source":"space_id_1","target":"space_id_2","label":"short description","strength":0.8}]

strength is 0-1 (1 = strongly connected). Return at most 10 connections. If no meaningful connections exist, return [].`;

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
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Claude API error ${response.status}`);
    }

    const data = (await response.json()) as {
      content: Array<{ type: string; text: string }>;
    };

    try {
      const raw = data.content[0]?.text ?? '[]';
      const connections = JSON.parse(raw) as Array<{
        source: string;
        target: string;
        label?: string;
        strength?: number;
      }>;

      // Clear old connections and store new ones
      this.store.clearAll();
      for (const conn of connections) {
        if (conn.source && conn.target) {
          this.store.addConnection({
            sourceSpaceId: conn.source,
            targetSpaceId: conn.target,
            label: conn.label,
            strength: conn.strength ?? 0.5,
          });
        }
      }
    } catch {
      // Claude returned non-JSON — ignore
    }
  }
}
