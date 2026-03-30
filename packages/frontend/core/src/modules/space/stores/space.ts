import { Store } from '@toeverything/infra';
import { map } from 'rxjs';

import type { WorkspaceDBService } from '../../db';

export interface SpaceRecord {
  id: string;
  name: string;
  index?: string;
  parentSpaceId?: string;
}

export class SpaceStore extends Store {
  constructor(private readonly dbService: WorkspaceDBService) {
    super();
  }

  watchAllSpaces$() {
    return this.dbService.db.spaces
      .find$()
      .pipe(
        map(spaces =>
          [...spaces].sort((a, b) =>
            (a.index ?? '').localeCompare(b.index ?? '')
          )
        )
      );
  }

  watchRootSpaces$() {
    return this.watchAllSpaces$().pipe(
      map(spaces => spaces.filter(s => !s.parentSpaceId))
    );
  }

  watchChildSpaces$(parentId: string) {
    return this.watchAllSpaces$().pipe(
      map(spaces => spaces.filter(s => s.parentSpaceId === parentId))
    );
  }

  watchSpaceIds$() {
    return this.watchAllSpaces$().pipe(map(spaces => spaces.map(s => s.id)));
  }

  watchSpace$(id: string) {
    return this.dbService.db.spaces.get$(id);
  }

  getSpace(id: string) {
    return this.dbService.db.spaces.get(id);
  }

  createSpace(name: string, parentSpaceId?: string): string {
    const record = this.dbService.db.spaces.create({
      name,
      ...(parentSpaceId ? { parentSpaceId } : {}),
    });
    return record.id;
  }

  updateSpace(id: string, updates: Partial<Omit<SpaceRecord, 'id'>>) {
    this.dbService.db.spaces.update(id, updates);
  }

  deleteSpace(id: string) {
    this.dbService.db.spaces.delete(id);
  }
}
