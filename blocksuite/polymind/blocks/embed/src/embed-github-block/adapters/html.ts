import { EmbedGithubBlockSchema } from '@blocksuite/polymind-model';
import { BlockHtmlAdapterExtension } from '@blocksuite/polymind-shared/adapters';

import { createEmbedBlockHtmlAdapterMatcher } from '../../common/adapters/html.js';

export const embedGithubBlockHtmlAdapterMatcher =
  createEmbedBlockHtmlAdapterMatcher(EmbedGithubBlockSchema.model.flavour);

export const EmbedGithubBlockHtmlAdapterExtension = BlockHtmlAdapterExtension(
  embedGithubBlockHtmlAdapterMatcher
);
