import { Store } from '@toeverything/infra';
import { map } from 'rxjs';

import type { WorkspaceDBService } from '../../db';

export interface CrossSpaceConnectionRecord {
  id: string;
  sourceSpaceId: string;
  targetSpaceId: string;
  label?: string;
  strength?: number;
  createdAt?: number;
}

export class CrossSpaceStore extends Store {
  constructor(private readonly dbService: WorkspaceDBService) {
    super();
  }

  watchConnections$() {
    return this.dbService.db.crossSpaceConnections
      .find$({})
      .pipe(
        map(conns =>
          [...conns].sort((a, b) => (b.strength ?? 0) - (a.strength ?? 0))
        )
      );
  }

  addConnection(data: Omit<CrossSpaceConnectionRecord, 'id'>): string {
    const record = this.dbService.db.crossSpaceConnections.create({
      ...data,
      createdAt: Date.now(),
    });
    return record.id;
  }

  clearAll() {
    // Get all and delete one by one (no bulk delete in ORM)
    const all = this.dbService.db.crossSpaceConnections.find({});
    for (const conn of all) {
      this.dbService.db.crossSpaceConnections.delete(conn.id);
    }
  }
}
