import { IconButton, usePromptModal } from '@affine/component';
import { NavigationPanelService } from '@affine/core/modules/navigation-panel';
import { SpaceService } from '@affine/core/modules/space';
import { WorkbenchService } from '@affine/core/modules/workbench';
import { PlusIcon } from '@blocksuite/icons/rc';
import { useLiveData, useServices } from '@toeverything/infra';
import { useCallback, useMemo } from 'react';

import { CollapsibleSection } from '../../layouts/collapsible-section';
import { NavigationPanelSpaceNode } from '../../nodes/space';
import { NavigationPanelTreeRoot } from '../../tree';

const SpacesSectionEmpty = ({
  onClickCreate,
}: {
  onClickCreate: () => void;
}) => (
  <div
    style={{
      padding: '8px 12px',
      fontSize: 12,
      color: 'var(--affine-text-secondary-color)',
      cursor: 'pointer',
    }}
    onClick={onClickCreate}
  >
    + Create your first Space
  </div>
);

export const NavigationPanelSpaces = () => {
  const { spaceService, workbenchService, navigationPanelService } =
    useServices({
      SpaceService,
      WorkbenchService,
      NavigationPanelService,
    });

  const spaces = useLiveData(spaceService.rootSpaces$);
  const { openPromptModal } = usePromptModal();
  const path = useMemo(() => ['spaces'], []);

  const handleCreateSpace = useCallback(() => {
    openPromptModal({
      title: 'Create Space',
      label: 'Space name',
      inputOptions: {
        placeholder: 'e.g. Work, Personal, Side Projects...',
      },
      confirmText: 'Create',
      cancelText: 'Cancel',
      confirmButtonOptions: {
        variant: 'primary',
      },
      onConfirm(name) {
        if (!name.trim()) return;
        const id = spaceService.createSpace(name.trim());
        workbenchService.workbench.openSpace(id);
        navigationPanelService.setCollapsed(path, false);
      },
    });
  }, [
    spaceService,
    workbenchService,
    navigationPanelService,
    openPromptModal,
    path,
  ]);

  return (
    <CollapsibleSection
      path={path}
      testId="navigation-panel-spaces"
      title="Spaces"
      actions={
        <IconButton
          data-testid="navigation-panel-add-space-button"
          onClick={handleCreateSpace}
          size="16"
          tooltip="Create Space"
        >
          <PlusIcon />
        </IconButton>
      }
    >
      <NavigationPanelTreeRoot
        placeholder={<SpacesSectionEmpty onClickCreate={handleCreateSpace} />}
      >
        {spaces.map(space => (
          <NavigationPanelSpaceNode
            key={space.id}
            spaceId={space.id}
            reorderable={false}
            parentPath={path}
          />
        ))}
      </NavigationPanelTreeRoot>
    </CollapsibleSection>
  );
};
