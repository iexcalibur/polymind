import { Service } from '@toeverything/infra';

import type { DocsService } from '../../doc';
import type { DocPropertiesStore } from '../../doc/stores/doc-properties';
import type { SpaceCanvasStore } from '../stores/space-canvas';

export const SPACE_SYSTEM_ID = '__system__';

export class SpaceCanvasService extends Service {
  constructor(
    private readonly spaceCanvasStore: SpaceCanvasStore,
    private readonly docsService: DocsService,
    private readonly docPropertiesStore: DocPropertiesStore
  ) {
    super();
  }

  /**
   * Returns the canvas doc ID for a given Space.
   * Creates a hidden edgeless doc if one doesn't exist yet.
   */
  getOrCreateCanvasDoc(spaceId: string): string {
    const existing = this.spaceCanvasStore.getCanvasDocId(spaceId);
    if (existing) {
      return existing;
    }

    // Create a new hidden doc in edgeless mode
    const docRecord = this.docsService.createDoc({
      primaryMode: 'edgeless',
    });

    // Mark as system doc so it's hidden from All Docs, Search, etc.
    this.docPropertiesStore.updateDocProperties(docRecord.id, {
      spaceId: SPACE_SYSTEM_ID,
    });

    // Store the mapping
    this.spaceCanvasStore.setCanvasDocId(spaceId, docRecord.id);

    return docRecord.id;
  }

  watchCanvasDocId$(spaceId: string) {
    return this.spaceCanvasStore.watchCanvasDocId$(spaceId);
  }
}
