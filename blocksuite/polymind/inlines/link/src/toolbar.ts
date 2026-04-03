import { ToolbarModuleExtension } from '@blocksuite/polymind-shared/services';
import { BlockFlavourIdentifier } from '@blocksuite/std';

import { builtinInlineLinkToolbarConfig } from './link-node/configs/toolbar.js';

export const linkToolbar = ToolbarModuleExtension({
  id: BlockFlavourIdentifier('polymind:link'),
  config: builtinInlineLinkToolbarConfig,
});
