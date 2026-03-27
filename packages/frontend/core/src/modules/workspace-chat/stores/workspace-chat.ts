import { Store } from '@toeverything/infra';
import { map } from 'rxjs';

import type { WorkspaceDBService } from '../../db';

export interface WorkspaceChatMessageRecord {
  id: string;
  role: string;
  content: string;
  createdAt?: number;
}

export class WorkspaceChatStore extends Store {
  constructor(private readonly dbService: WorkspaceDBService) {
    super();
  }

  watchMessages$() {
    return this.dbService.db.workspaceChatMessage
      .find$({})
      .pipe(
        map(msgs =>
          [...msgs].sort((a, b) => (a.createdAt ?? 0) - (b.createdAt ?? 0))
        )
      );
  }

  addMessage(role: string, content: string): string {
    const record = this.dbService.db.workspaceChatMessage.create({
      role,
      content,
      createdAt: Date.now(),
    });
    return record.id;
  }

  deleteMessage(id: string) {
    this.dbService.db.workspaceChatMessage.delete(id);
  }
}
