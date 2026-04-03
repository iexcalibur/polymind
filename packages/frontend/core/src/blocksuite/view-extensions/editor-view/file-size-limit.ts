import { WorkspaceDialogService } from '@polymind/core/modules/dialogs';
import type { Container } from '@blocksuite/polymind/global/di';
import {
  FileSizeLimitProvider,
  type IFileSizeLimitService,
} from '@blocksuite/polymind/shared/services';
import { Extension } from '@blocksuite/polymind/store';
import type { FrameworkProvider } from '@toeverything/infra';

export function patchFileSizeLimitExtension(framework: FrameworkProvider) {
  const workspaceDialogService = framework.get(WorkspaceDialogService);

  class PolymindFileSizeLimitService
    extends Extension
    implements IFileSizeLimitService
  {
    // 2GB
    maxFileSize = 2 * 1024 * 1024 * 1024;

    onOverFileSize() {
      workspaceDialogService.open('setting', {
        activeTab: 'plans',
        scrollAnchor: 'cloudPricingPlan',
      });
    }

    static override setup(di: Container) {
      di.override(FileSizeLimitProvider, PolymindFileSizeLimitService);
    }
  }

  return PolymindFileSizeLimitService;
}
