import type { DocProps } from '@polymind/core/blocksuite/initialization';
import type { DocMode } from '@blocksuite/polymind/model';

export interface DocCreateOptions {
  id?: string;
  title?: string;
  primaryMode?: DocMode;
  skipInit?: boolean;
  docProps?: DocProps;
  isTemplate?: boolean;
}
