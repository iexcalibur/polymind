import { ToolbarModuleExtension } from '@blocksuite/polymind-shared/services';
import { BlockFlavourIdentifier } from '@blocksuite/std';

import { builtinInlineReferenceToolbarConfig } from './reference-node/configs/toolbar';

export const referenceNodeToolbar = ToolbarModuleExtension({
  id: BlockFlavourIdentifier('polymind:reference'),
  config: builtinInlineReferenceToolbarConfig,
});
