export { CrossSpaceService } from './services/cross-space';
export type { CrossSpaceConnectionRecord } from './stores/cross-space';

import type { Framework } from '@toeverything/infra';

import { WorkspaceDBService } from '../db';
import { SpaceService } from '../space/services/space';
import { SpaceMemoryStore } from '../space/stores/space-memory';
import { WorkspaceScope } from '../workspace';
import { CrossSpaceService } from './services/cross-space';
import { CrossSpaceStore } from './stores/cross-space';

export function configureCrossSpaceModule(framework: Framework) {
  framework
    .scope(WorkspaceScope)
    .store(CrossSpaceStore, [WorkspaceDBService])
    .service(CrossSpaceService, [
      CrossSpaceStore,
      SpaceService,
      SpaceMemoryStore,
    ]);
}
