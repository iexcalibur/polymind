import type { DropTargetOptions } from '@polymind/component';
import { isOrganizeSupportType } from '@polymind/core/modules/organize/constants';
import type { PolymindDNDData } from '@polymind/core/types/dnd';

import type { NavigationPanelTreeNodeDropEffect } from '../../tree';

export const organizeChildrenDropEffect: NavigationPanelTreeNodeDropEffect =
  data => {
    if (
      data.treeInstruction?.type === 'reorder-above' ||
      data.treeInstruction?.type === 'reorder-below'
    ) {
      if (data.source.data.entity?.type === 'folder') {
        return 'move';
      }
    } else {
      return; // not supported
    }
    return;
  };

export const organizeEmptyDropEffect: NavigationPanelTreeNodeDropEffect =
  data => {
    const sourceType = data.source.data.entity?.type;
    if (sourceType && isOrganizeSupportType(sourceType)) {
      return 'link';
    }
    return;
  };

/**
 * Check whether the data can be dropped on the empty state of the organize section
 */
export const organizeEmptyRootCanDrop: DropTargetOptions<PolymindDNDData>['canDrop'] =
  data => {
    const type = data.source.data.entity?.type;
    return !!type && isOrganizeSupportType(type);
  };
