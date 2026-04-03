import { Skeleton } from '@polymind/component';
import { NavigationPanelTreeRoot } from '@polymind/core/desktop/components/navigation-panel';
import { NavigationPanelService } from '@polymind/core/modules/navigation-panel';
import { OrganizeService } from '@polymind/core/modules/organize';
import { useI18n } from '@polymind/i18n';
import { AddOrganizeIcon } from '@blocksuite/icons/rc';
import { useLiveData, useServices } from '@toeverything/infra';
import { useCallback, useMemo, useState } from 'react';

import { AddItemPlaceholder } from '../../layouts/add-item-placeholder';
import { CollapsibleSection } from '../../layouts/collapsible-section';
import { NavigationPanelFolderNode } from '../../nodes/folder';
import { FolderCreateTip, FolderRenameDialog } from '../../nodes/folder/dialog';

export const NavigationPanelOrganize = () => {
  const { organizeService, navigationPanelService } = useServices({
    OrganizeService,
    NavigationPanelService,
  });
  const path = useMemo(() => ['organize'], []);
  const [openNewFolderDialog, setOpenNewFolderDialog] = useState(false);

  const t = useI18n();

  const folderTree = organizeService.folderTree;
  const rootFolder = folderTree.rootFolder;

  const folders = useLiveData(rootFolder.sortedChildren$);
  const isLoading = useLiveData(folderTree.isLoading$);

  const handleCreateFolder = useCallback(
    (name: string) => {
      const newFolderId = rootFolder.createFolder(
        name,
        rootFolder.indexAt('before')
      );
      navigationPanelService.setCollapsed(path, false);
      return newFolderId;
    },
    [navigationPanelService, path, rootFolder]
  );

  return (
    <CollapsibleSection
      path={path}
      title={t['com.polymind.rootAppSidebar.organize']()}
    >
      {/* TODO(@CatsJuice): Organize loading UI */}
      <NavigationPanelTreeRoot placeholder={isLoading ? <Skeleton /> : null}>
        {folders.map(child => (
          <NavigationPanelFolderNode
            key={child.id}
            nodeId={child.id as string}
            parentPath={path}
          />
        ))}
        <AddItemPlaceholder
          icon={<AddOrganizeIcon />}
          data-testid="navigation-panel-bar-add-organize-button"
          label={t['com.polymind.rootAppSidebar.organize.add-folder']()}
          onClick={() => setOpenNewFolderDialog(true)}
        />
      </NavigationPanelTreeRoot>
      <FolderRenameDialog
        open={openNewFolderDialog}
        onConfirm={handleCreateFolder}
        onOpenChange={setOpenNewFolderDialog}
        descRenderer={FolderCreateTip}
      />
    </CollapsibleSection>
  );
};
