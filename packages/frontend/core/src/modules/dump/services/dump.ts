import { LiveData, Service } from '@toeverything/infra';

import type { DocsService } from '../../doc';
import type { DocPropertiesStore } from '../../doc/stores/doc-properties';
import type { Space } from '../../space/entities/space';
import type { SpaceService } from '../../space/services/space';
import type { DumpItemRecord, DumpStore } from '../stores/dump';

const CLAUDE_API_KEY_KEY = 'ploy-note:claude-api-key';
const VISION_MODEL = 'claude-3-5-sonnet-20241022';
const FAST_MODEL = 'claude-3-5-haiku-20241022';
const API_URL = 'https://api.anthropic.com/v1/messages';

/**
 * sessionStorage key prefix for raw image data.
 * Images are held in session storage during OCR processing and are never
 * persisted to the workspace DB (to avoid bloating CRDT sync).
 */
const IMG_SESSION_PREFIX = 'dump-img-';

export class DumpService extends Service {
  constructor(
    private readonly store: DumpStore,
    private readonly spaceService: SpaceService,
    private readonly docsService: DocsService,
    private readonly docPropertiesStore: DocPropertiesStore
  ) {
    super();
  }

  // ─── Reactive data ────────────────────────────────────────────────────

  allItems$(): LiveData<DumpItemRecord[]> {
    return LiveData.from<DumpItemRecord[]>(this.store.watchAllItems$(), []);
  }

  pendingItems$(): LiveData<DumpItemRecord[]> {
    return LiveData.from<DumpItemRecord[]>(this.store.watchPendingItems$(), []);
  }

  pendingCount$(): LiveData<number> {
    return this.pendingItems$().map(items => items.length);
  }

  // ─── Capture ──────────────────────────────────────────────────────────

  /** Capture a plain text snippet */
  captureText(text: string): string {
    const id = this.store.addItem({ type: 'text', content: text });
    this.scheduleProcessing(id, 'text', text);
    return id;
  }

  /**
   * Capture an image (base64 data URL).
   * The raw image is saved in sessionStorage; only extracted text goes to DB.
   */
  captureImage(dataUrl: string): string {
    const id = this.store.addItem({ type: 'image', content: '' });
    sessionStorage.setItem(`${IMG_SESSION_PREFIX}${id}`, dataUrl);
    this.scheduleImageProcessing(id, dataUrl);
    return id;
  }

  /** Capture a URL */
  captureUrl(url: string): string {
    const id = this.store.addItem({
      type: 'url',
      content: url,
      sourceUrl: url,
    });
    this.scheduleProcessing(id, 'url', url);
    return id;
  }

  // ─── Actions ──────────────────────────────────────────────────────────

  /**
   * Move a dump item to a Space by creating a new blank doc and assigning it.
   * Returns the new doc ID so the caller can navigate to it.
   */
  moveToSpace(itemId: string, spaceId: string): string {
    const doc = this.docsService.createDoc();
    this.docPropertiesStore.updateDocProperties(doc.id, { spaceId });
    this.store.updateItem(itemId, {
      movedToSpaceId: spaceId,
      movedToDocId: doc.id,
    });
    sessionStorage.removeItem(`${IMG_SESSION_PREFIX}${itemId}`);
    return doc.id;
  }

  deleteItem(id: string) {
    sessionStorage.removeItem(`${IMG_SESSION_PREFIX}${id}`);
    this.store.deleteItem(id);
  }

  /** Retrieve the raw image data URL for preview (session-only) */
  getSessionImage(id: string): string | null {
    return sessionStorage.getItem(`${IMG_SESSION_PREFIX}${id}`);
  }

  // ─── AI processing ────────────────────────────────────────────────────

  private scheduleProcessing(id: string, type: string, content: string) {
    const apiKey = localStorage.getItem(CLAUDE_API_KEY_KEY);
    if (!apiKey) {
      this.store.updateItem(id, { isProcessed: true });
      return;
    }
    const spaces = this.spaceService.spaces$.value;
    if (!spaces.length) {
      this.store.updateItem(id, { isProcessed: true });
      return;
    }
    this.categoriseText(apiKey, type, content, spaces)
      .then(suggestedSpaceId => {
        this.store.updateItem(id, { suggestedSpaceId, isProcessed: true });
      })
      .catch(() => {
        this.store.updateItem(id, { isProcessed: true });
      });
  }

  private scheduleImageProcessing(id: string, dataUrl: string) {
    const apiKey = localStorage.getItem(CLAUDE_API_KEY_KEY);
    if (!apiKey) {
      this.store.updateItem(id, {
        content:
          '(Screenshot captured — configure Claude API in the Chat tab to enable OCR)',
        isProcessed: true,
      });
      return;
    }
    const spaces = this.spaceService.spaces$.value;
    this.extractAndCategorise(apiKey, dataUrl, spaces)
      .then(result => {
        this.store.updateItem(id, {
          content: result.extractedText,
          suggestedSpaceId: result.suggestedSpaceId,
          isProcessed: true,
        });
      })
      .catch(() => {
        this.store.updateItem(id, {
          content:
            '(OCR failed — the image is still available in this session)',
          isProcessed: true,
        });
      });
  }

  // ─── Claude helpers ───────────────────────────────────────────────────

  private spaceListFor(spaces: Space[]): string {
    return spaces.map(s => `"${s.name$.value}" (id:${s.id})`).join(', ');
  }

  private async categoriseText(
    apiKey: string,
    type: string,
    content: string,
    spaces: Space[]
  ): Promise<string | undefined> {
    const spaceList = this.spaceListFor(spaces);
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: FAST_MODEL,
        max_tokens: 80,
        messages: [
          {
            role: 'user',
            content: `Categorise this captured item into one of these Spaces: ${spaceList}

Item type: ${type}
Content: ${content.slice(0, 600)}

Reply with ONLY valid JSON — no markdown, no explanation:
{"spaceId":"matching_id_or_null"}`,
          },
        ],
      }),
    });

    if (!res.ok) return undefined;
    const data = (await res.json()) as {
      content: Array<{ type: string; text: string }>;
    };
    try {
      const parsed = JSON.parse(data.content[0]?.text ?? '{}') as {
        spaceId?: string | null;
      };
      return parsed.spaceId ?? undefined;
    } catch {
      return undefined;
    }
  }

  private async extractAndCategorise(
    apiKey: string,
    dataUrl: string,
    spaces: Space[]
  ): Promise<{ extractedText: string; suggestedSpaceId?: string }> {
    const spaceList = spaces.length
      ? this.spaceListFor(spaces)
      : 'No spaces yet';

    const commaIdx = dataUrl.indexOf(',');
    const header = dataUrl.slice(0, commaIdx);
    const base64 = dataUrl.slice(commaIdx + 1);
    const mediaType = header.split(':')[1]?.split(';')[0] ?? 'image/png';

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: VISION_MODEL,
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: { type: 'base64', media_type: mediaType, data: base64 },
              },
              {
                type: 'text',
                text: `1. Extract ALL text visible in this image, preserving structure where possible.
2. Based on the content, suggest which Space it belongs to from: ${spaceList}

Reply with ONLY valid JSON — no markdown, no preamble:
{"extractedText":"...all text..","spaceId":"matching_id_or_null"}`,
              },
            ],
          },
        ],
      }),
    });

    if (!res.ok) throw new Error(`Vision API ${res.status}`);

    const data = (await res.json()) as {
      content: Array<{ type: string; text: string }>;
    };
    const raw = data.content[0]?.text ?? '';

    try {
      const parsed = JSON.parse(raw) as {
        extractedText?: string;
        spaceId?: string | null;
      };
      return {
        extractedText: parsed.extractedText ?? raw,
        suggestedSpaceId: parsed.spaceId ?? undefined,
      };
    } catch {
      // Claude returned plain text instead of JSON — use it as the OCR output
      return { extractedText: raw };
    }
  }
}
