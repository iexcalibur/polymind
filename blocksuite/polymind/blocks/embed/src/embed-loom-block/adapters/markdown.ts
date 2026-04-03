import { EmbedLoomBlockSchema } from '@blocksuite/polymind-model';
import { BlockMarkdownAdapterExtension } from '@blocksuite/polymind-shared/adapters';

import { createEmbedBlockMarkdownAdapterMatcher } from '../../common/adapters/markdown.js';

export const embedLoomBlockMarkdownAdapterMatcher =
  createEmbedBlockMarkdownAdapterMatcher(EmbedLoomBlockSchema.model.flavour);

export const EmbedLoomMarkdownAdapterExtension = BlockMarkdownAdapterExtension(
  embedLoomBlockMarkdownAdapterMatcher
);
