import { Store } from '@toeverything/infra';
import { map } from 'rxjs';

import type { WorkspaceDBService } from '../../db';

export interface SpaceMemoryRecord {
  id: string;
  spaceId: string;
  content: string;
  createdAt: number;
}

export class SpaceMemoryStore extends Store {
  constructor(private readonly dbService: WorkspaceDBService) {
    super();
  }

  watchMemories$(spaceId: string) {
    return this.dbService.db.spaceMemory
      .find$()
      .pipe(
        map(records =>
          [...records]
            .filter(r => r.spaceId === spaceId)
            .sort((a, b) => (a.createdAt ?? 0) - (b.createdAt ?? 0))
        )
      );
  }

  addMemory(spaceId: string, content: string): string {
    const record = this.dbService.db.spaceMemory.create({
      spaceId,
      content,
      createdAt: Date.now(),
    });
    return record.id;
  }

  deleteMemory(id: string) {
    this.dbService.db.spaceMemory.delete(id);
  }

  updateMemory(id: string, content: string) {
    this.dbService.db.spaceMemory.update(id, { content });
  }
}
