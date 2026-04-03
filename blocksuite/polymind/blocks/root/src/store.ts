import {
  type StoreExtensionContext,
  StoreExtensionProvider,
} from '@blocksuite/polymind-ext-loader';
import { RootBlockSchemaExtension } from '@blocksuite/polymind-model';

import { RootBlockAdapterExtensions } from './adapters/extension';

export class RootStoreExtension extends StoreExtensionProvider {
  override name = 'polymind-root-block';

  override setup(context: StoreExtensionContext) {
    super.setup(context);
    context.register(RootBlockSchemaExtension);
    context.register(RootBlockAdapterExtensions);
  }
}
