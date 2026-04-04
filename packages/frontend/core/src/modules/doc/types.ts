import type { DocProps } from '@polymind/core/blockmind/initialization';
import type { DocMode } from '@blockmind/polymind/model';

export interface DocCreateOptions {
  id?: string;
  title?: string;
  primaryMode?: DocMode;
  skipInit?: boolean;
  docProps?: DocProps;
  isTemplate?: boolean;
}
