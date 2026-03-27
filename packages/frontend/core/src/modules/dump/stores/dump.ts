import { Store } from '@toeverything/infra';
import { map } from 'rxjs';

import type { WorkspaceDBService } from '../../db';

export interface DumpItemRecord {
  id: string;
  type: string; // 'text' | 'image' | 'url'
  content: string;
  sourceUrl?: string;
  suggestedSpaceId?: string;
  isProcessed?: boolean;
  movedToSpaceId?: string;
  movedToDocId?: string;
  createdAt?: number;
}

export class DumpStore extends Store {
  constructor(private readonly dbService: WorkspaceDBService) {
    super();
  }

  watchAllItems$() {
    return this.dbService.db.dumpItems
      .find$({})
      .pipe(
        map(items =>
          [...items].sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
        )
      );
  }

  watchPendingItems$() {
    return this.watchAllItems$().pipe(
      map(items => items.filter(i => !i.movedToSpaceId))
    );
  }

  addItem(data: { type: string; content: string; sourceUrl?: string }): string {
    const record = this.dbService.db.dumpItems.create({
      ...data,
      createdAt: Date.now(),
    });
    return record.id;
  }

  updateItem(
    id: string,
    updates: Partial<Omit<DumpItemRecord, 'id' | 'createdAt'>>
  ) {
    this.dbService.db.dumpItems.update(id, updates);
  }

  deleteItem(id: string) {
    this.dbService.db.dumpItems.delete(id);
  }
}
