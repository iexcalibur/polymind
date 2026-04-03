import { createEmbedBlockPlainTextAdapterMatcher } from '@blocksuite/polymind-block-embed';
import { BookmarkBlockSchema } from '@blocksuite/polymind-model';
import { BlockPlainTextAdapterExtension } from '@blocksuite/polymind-shared/adapters';

export const bookmarkBlockPlainTextAdapterMatcher =
  createEmbedBlockPlainTextAdapterMatcher(BookmarkBlockSchema.model.flavour);

export const BookmarkBlockPlainTextAdapterExtension =
  BlockPlainTextAdapterExtension(bookmarkBlockPlainTextAdapterMatcher);
