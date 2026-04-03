import { DesktopApiService } from '@polymind/core/modules/desktop-api';
import { NativeClipboardExtension } from '@blocksuite/polymind/shared/services';
import type { FrameworkProvider } from '@toeverything/infra';

export function patchForClipboardInElectron(framework: FrameworkProvider) {
  const desktopApi = framework.get(DesktopApiService);
  return NativeClipboardExtension({
    copyAsPNG: desktopApi.handler.clipboard.copyAsPNG,
  });
}
