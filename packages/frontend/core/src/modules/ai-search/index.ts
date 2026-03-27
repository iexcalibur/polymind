export { AISearchService } from './services/ai-search';

import type { Framework } from '@toeverything/infra';

import { DocsService } from '../doc';
import { DocPropertiesStore } from '../doc/stores/doc-properties';
import { SpaceService } from '../space/services/space';
import { WorkspaceScope } from '../workspace';
import { AISearchService } from './services/ai-search';

export function configureAISearchModule(framework: Framework) {
  framework
    .scope(WorkspaceScope)
    .service(AISearchService, [SpaceService, DocsService, DocPropertiesStore]);
}
