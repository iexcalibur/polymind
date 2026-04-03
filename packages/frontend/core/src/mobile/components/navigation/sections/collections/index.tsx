import { usePromptModal } from '@polymind/component';
import { NavigationPanelTreeRoot } from '@polymind/core/desktop/components/navigation-panel';
import { CollectionService } from '@polymind/core/modules/collection';
import { NavigationPanelService } from '@polymind/core/modules/navigation-panel';
import { WorkbenchService } from '@polymind/core/modules/workbench';
import { useI18n } from '@polymind/i18n';
import { AddCollectionIcon } from '@blocksuite/icons/rc';
import { useLiveData, useServices } from '@toeverything/infra';
import { useCallback, useMemo } from 'react';

import { AddItemPlaceholder } from '../../layouts/add-item-placeholder';
import { CollapsibleSection } from '../../layouts/collapsible-section';
import { NavigationPanelCollectionNode } from '../../nodes/collection';
import * as styles from './index.css';

export const NavigationPanelCollections = () => {
  const t = useI18n();
  const { collectionService, workbenchService, navigationPanelService } =
    useServices({
      CollectionService,
      WorkbenchService,
      NavigationPanelService,
    });
  const path = useMemo(() => ['collections'], []);
  const collectionMetas = useLiveData(collectionService.collectionMetas$);
  const { openPromptModal } = usePromptModal();

  const handleCreateCollection = useCallback(() => {
    openPromptModal({
      title: t['com.polymind.editCollection.saveCollection'](),
      label: t['com.polymind.editCollectionName.name'](),
      inputOptions: {
        placeholder: t['com.polymind.editCollectionName.name.placeholder'](),
      },
      children: (
        <div className={styles.createTips}>
          {t['com.polymind.editCollectionName.createTips']()}
        </div>
      ),
      confirmText: t['com.polymind.editCollection.save'](),
      cancelText: t['com.polymind.editCollection.button.cancel'](),
      confirmButtonOptions: {
        variant: 'primary',
      },
      onConfirm(name) {
        const id = collectionService.createCollection({ name });
        workbenchService.workbench.openCollection(id);
        navigationPanelService.setCollapsed(path, false);
      },
    });
  }, [
    collectionService,
    navigationPanelService,
    path,
    openPromptModal,
    t,
    workbenchService.workbench,
  ]);

  return (
    <CollapsibleSection
      path={path}
      testId="navigation-panel-collections"
      title={t['com.polymind.rootAppSidebar.collections']()}
    >
      <NavigationPanelTreeRoot>
        {collectionMetas.map(collection => (
          <NavigationPanelCollectionNode
            key={collection.id}
            collectionId={collection.id}
            parentPath={path}
          />
        ))}
        <AddItemPlaceholder
          icon={<AddCollectionIcon />}
          data-testid="navigation-panel-bar-add-collection-button"
          label={t['com.polymind.rootAppSidebar.collection.new']()}
          onClick={() => handleCreateCollection()}
        />
      </NavigationPanelTreeRoot>
    </CollapsibleSection>
  );
};
