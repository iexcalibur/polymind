import {
  type StoreExtensionContext,
  StoreExtensionProvider,
} from '@blocksuite/polymind-ext-loader';
import { SurfaceRefBlockSchemaExtension } from '@blocksuite/polymind-model';

export class SurfaceRefStoreExtension extends StoreExtensionProvider {
  override name = 'polymind-surface-ref-block';

  override setup(context: StoreExtensionContext) {
    super.setup(context);
    context.register(SurfaceRefBlockSchemaExtension);
  }
}
