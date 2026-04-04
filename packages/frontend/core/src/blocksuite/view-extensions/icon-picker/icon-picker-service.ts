import { IconPickerServiceIdentifier } from '@blockmind/polymind/shared/services';
import { type ExtensionType } from '@blockmind/polymind/store';
import type { Container } from '@blockmind/global/di';
import type { FrameworkProvider } from '@toeverything/infra';

import { IconPickerService } from '../../../modules/icon-picker/services/icon-picker';

/**
 * Patch the icon picker service to make it available in BlockSuite
 * @param framework
 * @returns
 */
export function patchIconPickerService(
  framework: FrameworkProvider
): ExtensionType {
  return {
    setup: (di: Container) => {
      di.override(IconPickerServiceIdentifier, () => {
        return framework.get(IconPickerService);
      });
    },
  };
}
