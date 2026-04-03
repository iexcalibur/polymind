import { EmbedGithubBlockSchema } from '@blocksuite/polymind-model';
import { BlockMarkdownAdapterExtension } from '@blocksuite/polymind-shared/adapters';

import { createEmbedBlockMarkdownAdapterMatcher } from '../../common/adapters/markdown.js';

export const embedGithubBlockMarkdownAdapterMatcher =
  createEmbedBlockMarkdownAdapterMatcher(EmbedGithubBlockSchema.model.flavour);

export const EmbedGithubMarkdownAdapterExtension =
  BlockMarkdownAdapterExtension(embedGithubBlockMarkdownAdapterMatcher);
