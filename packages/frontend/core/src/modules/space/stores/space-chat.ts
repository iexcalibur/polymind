import { Store } from '@toeverything/infra';
import { map } from 'rxjs';

import type { WorkspaceDBService } from '../../db';

export interface SpaceChatMessageRecord {
  id: string;
  spaceId: string;
  role: string;
  content: string;
  createdAt: number;
}

export class SpaceChatStore extends Store {
  constructor(private readonly dbService: WorkspaceDBService) {
    super();
  }

  watchMessages$(spaceId: string) {
    return this.dbService.db.spaceChatMessage
      .find$()
      .pipe(
        map(records =>
          [...records]
            .filter(r => r.spaceId === spaceId)
            .sort((a, b) => (a.createdAt ?? 0) - (b.createdAt ?? 0))
        )
      );
  }

  addMessage(spaceId: string, role: string, content: string): string {
    const record = this.dbService.db.spaceChatMessage.create({
      spaceId,
      role,
      content,
      createdAt: Date.now(),
    });
    return record.id;
  }

  deleteMessage(id: string) {
    this.dbService.db.spaceChatMessage.delete(id);
  }
}
