import {
  type StoreExtensionContext,
  StoreExtensionProvider,
} from '@blocksuite/polymind-ext-loader';
import { AttachmentBlockSchemaExtension } from '@blocksuite/polymind-model';

import { AttachmentBlockAdapterExtensions } from './adapters/extension';

export class AttachmentStoreExtension extends StoreExtensionProvider {
  override name = 'polymind-attachment-block';

  override setup(context: StoreExtensionContext) {
    super.setup(context);
    context.register(AttachmentBlockSchemaExtension);
    context.register(AttachmentBlockAdapterExtensions);
  }
}
