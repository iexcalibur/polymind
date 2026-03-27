export { DumpService } from './services/dump';
export type { DumpItemRecord } from './stores/dump';

import type { Framework } from '@toeverything/infra';

import { WorkspaceDBService } from '../db';
import { DocsService } from '../doc';
import { DocPropertiesStore } from '../doc/stores/doc-properties';
import { SpaceService } from '../space/services/space';
import { WorkspaceScope } from '../workspace';
import { DumpService } from './services/dump';
import { DumpStore } from './stores/dump';

export function configureDumpModule(framework: Framework) {
  framework
    .scope(WorkspaceScope)
    .store(DumpStore, [WorkspaceDBService])
    .service(DumpService, [
      DumpStore,
      SpaceService,
      DocsService,
      DocPropertiesStore,
    ]);
}
