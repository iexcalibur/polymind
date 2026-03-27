export { Space } from './entities/space';
export { SpaceService } from './services/space';
export { SPACE_SYSTEM_ID, SpaceCanvasService } from './services/space-canvas';
export { SpaceChatService } from './services/space-chat';
export { SpaceMemoryService } from './services/space-memory';
export type { SpaceRecord } from './stores/space';
export type { SpaceChatMessageRecord } from './stores/space-chat';
export type { SpaceMemoryRecord } from './stores/space-memory';

import type { Framework } from '@toeverything/infra';

import { WorkspaceDBService } from '../db';
import { DocsService } from '../doc';
import { DocPropertiesStore } from '../doc/stores/doc-properties';
import { WorkspaceScope } from '../workspace';
import { Space } from './entities/space';
import { SpaceService } from './services/space';
import { SpaceCanvasService } from './services/space-canvas';
import { SpaceChatService } from './services/space-chat';
import { SpaceMemoryService } from './services/space-memory';
import { SpaceStore } from './stores/space';
import { SpaceCanvasStore } from './stores/space-canvas';
import { SpaceChatStore } from './stores/space-chat';
import { SpaceMemoryStore } from './stores/space-memory';

export function configureSpaceModule(framework: Framework) {
  framework
    .scope(WorkspaceScope)
    .store(SpaceStore, [WorkspaceDBService])
    .store(SpaceCanvasStore, [WorkspaceDBService])
    .store(SpaceMemoryStore, [WorkspaceDBService])
    .store(SpaceChatStore, [WorkspaceDBService])
    .entity(Space, [SpaceStore])
    .service(SpaceService, [SpaceStore, DocPropertiesStore])
    .service(SpaceCanvasService, [
      SpaceCanvasStore,
      DocsService,
      DocPropertiesStore,
    ])
    .service(SpaceMemoryService, [SpaceMemoryStore])
    .service(SpaceChatService, [
      SpaceChatStore,
      SpaceMemoryStore,
      DocsService,
      DocPropertiesStore,
    ]);
}
