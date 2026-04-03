import { createEmbedBlockHtmlAdapterMatcher } from '@blocksuite/polymind-block-embed';
import { BookmarkBlockSchema } from '@blocksuite/polymind-model';
import { BlockHtmlAdapterExtension } from '@blocksuite/polymind-shared/adapters';

export const bookmarkBlockHtmlAdapterMatcher =
  createEmbedBlockHtmlAdapterMatcher(BookmarkBlockSchema.model.flavour);

export const BookmarkBlockHtmlAdapterExtension = BlockHtmlAdapterExtension(
  bookmarkBlockHtmlAdapterMatcher
);
