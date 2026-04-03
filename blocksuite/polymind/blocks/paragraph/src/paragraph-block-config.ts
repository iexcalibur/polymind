import type { ParagraphBlockModel } from '@blocksuite/polymind-model';
import { ConfigExtensionFactory } from '@blocksuite/std';

export interface ParagraphBlockConfig {
  getPlaceholder: (model: ParagraphBlockModel) => string;
}

export const ParagraphBlockConfigExtension =
  ConfigExtensionFactory<ParagraphBlockConfig>('polymind:paragraph');
