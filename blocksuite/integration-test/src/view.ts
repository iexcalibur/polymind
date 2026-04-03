import { ViewExtensionManager } from '@blocksuite/polymind/ext-loader';
import { getInternalViewExtensions } from '@blocksuite/polymind/extensions/view';

const manager = new ViewExtensionManager(getInternalViewExtensions());

export function getTestViewManager() {
  return manager;
}
