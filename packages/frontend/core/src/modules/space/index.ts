export { Space } from './entities/space';
export { SpaceService } from './services/space';
export { SPACE_SYSTEM_ID, SpaceCanvasService } from './services/space-canvas';
export type { SpaceRecord } from './stores/space';

import type { Framework } from '@toeverything/infra';

import { WorkspaceDBService } from '../db';
import { DocsService } from '../doc';
import { DocPropertiesStore } from '../doc/stores/doc-properties';
import { WorkspaceScope } from '../workspace';
import { Space } from './entities/space';
import { SpaceService } from './services/space';
import { SpaceCanvasService } from './services/space-canvas';
import { SpaceStore } from './stores/space';
import { SpaceCanvasStore } from './stores/space-canvas';

export function configureSpaceModule(framework: Framework) {
  framework
    .scope(WorkspaceScope)
    .store(SpaceStore, [WorkspaceDBService])
    .store(SpaceCanvasStore, [WorkspaceDBService])
    .entity(Space, [SpaceStore])
    .service(SpaceService, [SpaceStore, DocPropertiesStore])
    .service(SpaceCanvasService, [
      SpaceCanvasStore,
      DocsService,
      DocPropertiesStore,
    ]);
}
