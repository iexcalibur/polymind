import { MenuItem, MenuSeparator, toast } from '@affine/component';
import { GlobalContextService } from '@affine/core/modules/global-context';
import { NavigationPanelService } from '@affine/core/modules/navigation-panel';
import { SpaceService } from '@affine/core/modules/space';
import { WorkbenchService } from '@affine/core/modules/workbench';
import { DeleteIcon, FolderIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService, useServices } from '@toeverything/infra';
import { useCallback, useMemo } from 'react';

import { NavigationPanelTreeNode } from '../../tree';
import type { NavigationPanelTreeNodeIcon } from '../../tree/node';
import type { GenericNavigationPanelNode } from '../types';

const SpaceIcon: NavigationPanelTreeNodeIcon = ({ className }) => (
  <FolderIcon className={className} />
);

export const NavigationPanelSpaceNode = ({
  spaceId,
  parentPath,
  reorderable,
}: {
  spaceId: string;
} & Pick<GenericNavigationPanelNode, 'parentPath' | 'reorderable'>) => {
  const { globalContextService, workbenchService } = useServices({
    GlobalContextService,
    WorkbenchService,
  });
  const navigationPanelService = useService(NavigationPanelService);
  const spaceService = useService(SpaceService);

  const space = useLiveData(spaceService.space$(spaceId));
  const name = useLiveData(space?.name$);

  const active =
    useLiveData(globalContextService.globalContext.spaceId.$) === spaceId;

  const path = useMemo(
    () => [...(parentPath ?? []), `space-${spaceId}`],
    [parentPath, spaceId]
  );

  const collapsed = useLiveData(navigationPanelService.collapsed$(path));
  const setCollapsed = useCallback(
    (value: boolean) => {
      navigationPanelService.setCollapsed(path, value);
    },
    [navigationPanelService, path]
  );

  const handleClick = useCallback(() => {
    workbenchService.workbench.openSpace(spaceId);
  }, [workbenchService, spaceId]);

  const handleRename = useCallback(
    (newName: string) => {
      if (space && space.name$.value !== newName) {
        space.rename(newName);
      }
    },
    [space]
  );

  const handleDelete = useCallback(() => {
    if (!space) return;
    const spaceName = space.name$.value;
    space.delete();
    toast(`Space "${spaceName}" deleted`);
  }, [space]);

  const operations = useMemo(
    () => [
      {
        index: 9999,
        view: <MenuSeparator key="menu-separator" />,
      },
      {
        index: 10000,
        view: (
          <MenuItem
            type="danger"
            prefixIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Delete Space
          </MenuItem>
        ),
      },
    ],
    [handleDelete]
  );

  if (!space) return null;

  return (
    <NavigationPanelTreeNode
      icon={SpaceIcon}
      name={name ?? 'Space'}
      active={active}
      renameable
      onClick={handleClick}
      onRename={handleRename}
      operations={operations}
      reorderable={reorderable}
      collapsed={collapsed}
      setCollapsed={setCollapsed}
      data-testid={`navigation-panel-space-${spaceId}`}
    />
  );
};
