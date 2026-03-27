export { WorkspaceChatService } from './services/workspace-chat';
export type { WorkspaceChatMessageRecord } from './stores/workspace-chat';

import type { Framework } from '@toeverything/infra';

import { WorkspaceDBService } from '../db';
import { SpaceService } from '../space/services/space';
import { SpaceMemoryStore } from '../space/stores/space-memory';
import { WorkspaceScope } from '../workspace';
import { WorkspaceChatService } from './services/workspace-chat';
import { WorkspaceChatStore } from './stores/workspace-chat';

export function configureWorkspaceChatModule(framework: Framework) {
  framework
    .scope(WorkspaceScope)
    .store(WorkspaceChatStore, [WorkspaceDBService])
    .service(WorkspaceChatService, [
      WorkspaceChatStore,
      SpaceService,
      SpaceMemoryStore,
    ]);
}
