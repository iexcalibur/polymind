import {
  type StoreExtensionContext,
  StoreExtensionProvider,
} from '@blocksuite/polymind-ext-loader';
import { EdgelessTextBlockSchemaExtension } from '@blocksuite/polymind-model';

export class EdgelessTextStoreExtension extends StoreExtensionProvider {
  override name = 'affine-edgeless-text-block';

  override setup(context: StoreExtensionContext) {
    super.setup(context);
    context.register(EdgelessTextBlockSchemaExtension);
  }
}
