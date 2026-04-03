import { EmbedFigmaBlockSchema } from '@blocksuite/polymind-model';
import { BlockMarkdownAdapterExtension } from '@blocksuite/polymind-shared/adapters';

import { createEmbedBlockMarkdownAdapterMatcher } from '../../common/adapters/markdown.js';

export const embedFigmaBlockMarkdownAdapterMatcher =
  createEmbedBlockMarkdownAdapterMatcher(EmbedFigmaBlockSchema.model.flavour);

export const EmbedFigmaMarkdownAdapterExtension = BlockMarkdownAdapterExtension(
  embedFigmaBlockMarkdownAdapterMatcher
);
