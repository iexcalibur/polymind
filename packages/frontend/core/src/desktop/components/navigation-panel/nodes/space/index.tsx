import {
  MenuItem,
  MenuSeparator,
  toast,
  usePromptModal,
} from '@affine/component';
import { GlobalContextService } from '@affine/core/modules/global-context';
import { NavigationPanelService } from '@affine/core/modules/navigation-panel';
import { SpaceService } from '@affine/core/modules/space';
import { WorkbenchService } from '@affine/core/modules/workbench';
import { DeleteIcon, FolderIcon, PlusIcon } from '@blocksuite/icons/rc';
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
  const childSpaces = useLiveData(spaceService.childSpaces$(spaceId));

  const { openPromptModal } = usePromptModal();

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

  const handleCreateSubSpace = useCallback(() => {
    openPromptModal({
      title: 'Create Sub-Space',
      label: 'Sub-Space name',
      inputOptions: {
        placeholder: 'e.g. Standups, Client Meetings...',
      },
      confirmText: 'Create',
      cancelText: 'Cancel',
      confirmButtonOptions: {
        variant: 'primary',
      },
      onConfirm(subName) {
        if (!subName.trim()) return;
        const id = spaceService.createSpace(subName.trim(), spaceId);
        workbenchService.workbench.openSpace(id);
        setCollapsed(false);
      },
    });
  }, [spaceService, workbenchService, spaceId, openPromptModal, setCollapsed]);

  const operations = useMemo(
    () => [
      {
        index: 50,
        view: (
          <MenuItem prefixIcon={<PlusIcon />} onClick={handleCreateSubSpace}>
            Create Sub-Space
          </MenuItem>
        ),
      },
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
    [handleDelete, handleCreateSubSpace]
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
    >
      {childSpaces.map(child => (
        <NavigationPanelSpaceNode
          key={child.id}
          spaceId={child.id}
          reorderable={false}
          parentPath={path}
        />
      ))}
    </NavigationPanelTreeNode>
  );
};
