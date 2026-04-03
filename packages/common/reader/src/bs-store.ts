import { StoreExtensionManager } from '@blocksuite/polymind/ext-loader';
import { getInternalStoreExtensions } from '@blocksuite/polymind/extensions/store';

const manager = new StoreExtensionManager(getInternalStoreExtensions());

export function getStoreManager() {
  return manager;
}
