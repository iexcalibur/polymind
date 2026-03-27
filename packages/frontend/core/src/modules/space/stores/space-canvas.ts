import { Store } from '@toeverything/infra';

import type { WorkspaceDBService } from '../../db';

export class SpaceCanvasStore extends Store {
  constructor(private readonly dbService: WorkspaceDBService) {
    super();
  }

  getCanvasDocId(spaceId: string): string | null {
    const record = this.dbService.db.spaceCanvasDoc.get(spaceId);
    return record?.canvasDocId ?? null;
  }

  setCanvasDocId(spaceId: string, canvasDocId: string): void {
    const existing = this.dbService.db.spaceCanvasDoc.get(spaceId);
    if (existing) {
      this.dbService.db.spaceCanvasDoc.update(spaceId, { canvasDocId });
    } else {
      this.dbService.db.spaceCanvasDoc.create({ spaceId, canvasDocId });
    }
  }

  watchCanvasDocId$(spaceId: string) {
    return this.dbService.db.spaceCanvasDoc.get$(spaceId);
  }
}
