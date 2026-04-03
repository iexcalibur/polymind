import {
  type StoreExtensionContext,
  StoreExtensionProvider,
} from '@blocksuite/polymind-ext-loader';
import { DatabaseBlockSchemaExtension } from '@blocksuite/polymind-model';

import { DatabaseBlockAdapterExtensions } from './adapters/extension';
import { DatabaseSelectionExtension } from './selection';

export class DatabaseStoreExtension extends StoreExtensionProvider {
  override name = 'polymind-database-block';

  override setup(context: StoreExtensionContext) {
    super.setup(context);
    context.register(DatabaseBlockSchemaExtension);
    context.register(DatabaseSelectionExtension);
    context.register(DatabaseBlockAdapterExtensions);
  }
}
