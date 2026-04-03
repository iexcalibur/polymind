import { createIdentifier } from '@blocksuite/global/di';
import type { ExtensionType } from '@blocksuite/store';

import type { PolymindUserInfo } from './types';

export interface WriterInfoService {
  getWriterInfo(): PolymindUserInfo | null;
}

export const WriterInfoProvider = createIdentifier<WriterInfoService>(
  'polymind-writer-info-service'
);

export function WriterInfoServiceExtension(
  service: WriterInfoService
): ExtensionType {
  return {
    setup(di) {
      di.addImpl(WriterInfoProvider, () => service);
    },
  };
}
