import { ToolbarModuleExtension } from '@blocksuite/polymind-shared/services';
import { BlockFlavourIdentifier } from '@blocksuite/std';
import type { ExtensionType } from '@blocksuite/store';

import { builtinLockedToolbarConfig, builtinMiscToolbarConfig } from './misc';

export const EdgelessElementToolbarExtension: ExtensionType[] = [
  ToolbarModuleExtension({
    id: BlockFlavourIdentifier('polymind:surface:*'),
    config: builtinMiscToolbarConfig,
  }),

  // Special Scenarios
  // Only display the `unlock` button when the selection includes a locked element.
  ToolbarModuleExtension({
    id: BlockFlavourIdentifier('polymind:surface:locked'),
    config: builtinLockedToolbarConfig,
  }),
];
