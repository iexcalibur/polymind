import {
  AddPageButton,
  AppSidebar,
  MenuItem,
  MenuLinkItem,
  QuickSearchInput,
  SidebarContainer,
  SidebarScrollableContainer,
} from '@affine/core/modules/app-sidebar/views';
import { WorkspaceDialogService } from '@affine/core/modules/dialogs';
import { DumpService } from '@affine/core/modules/dump';
import { CMDKQuickSearchService } from '@affine/core/modules/quicksearch/services/cmdk';
import { useI18n } from '@affine/i18n';
import { track } from '@affine/track';
import {
  AllDocsIcon,
  ImportIcon,
  JournalIcon,
  SearchIcon,
  SettingsIcon,
} from '@blocksuite/icons/rc';
import { useLiveData, useService, useServices } from '@toeverything/infra';
import type { ReactElement } from 'react';
import { memo, useCallback } from 'react';

import {
  CollapsibleSection,
  NavigationPanelCollections,
  NavigationPanelFavorites,
  NavigationPanelOrganize,
  NavigationPanelSpaces,
  NavigationPanelTags,
} from '../../desktop/components/navigation-panel';
import { sidebarBadge } from '../../desktop/pages/workspace/dump/index.css';
import { WorkbenchService } from '../../modules/workbench';
import { WorkspaceNavigator } from '../workspace-selector';
import {
  quickSearch,
  quickSearchAndNewPage,
  workspaceAndUserWrapper,
  workspaceWrapper,
} from './index.css';
import { AppSidebarJournalButton } from './journal-button';
import { TemplateDocEntrance } from './template-doc-entrance';
import { TrashButton } from './trash-button';

const InboxButton = () => {
  const { workbenchService, dumpService } = useServices({
    WorkbenchService,
    DumpService,
  });
  const workbench = workbenchService.workbench;
  const isActive = useLiveData(
    workbench.location$.selector(loc => loc.pathname === '/dump')
  );
  const count = useLiveData(dumpService.pendingCount$());

  return (
    <MenuLinkItem icon={<ImportIcon />} active={isActive} to={'/dump'}>
      <span>Inbox</span>
      {count > 0 && <span className={sidebarBadge}>{count}</span>}
    </MenuLinkItem>
  );
};

const AllDocsButton = () => {
  const t = useI18n();
  const { workbenchService } = useServices({
    WorkbenchService,
  });
  const workbench = workbenchService.workbench;
  const allPageActive = useLiveData(
    workbench.location$.selector(location => location.pathname === '/all')
  );

  return (
    <MenuLinkItem icon={<AllDocsIcon />} active={allPageActive} to={'/all'}>
      <span data-testid="all-pages">
        {t['com.affine.workspaceSubPath.all']()}
      </span>
    </MenuLinkItem>
  );
};

const AISearchButton = () => {
  const { workbenchService } = useServices({ WorkbenchService });
  const workbench = workbenchService.workbench;
  const isActive = useLiveData(
    workbench.location$.selector(loc => loc.pathname === '/ai-search')
  );

  return (
    <MenuLinkItem icon={<SearchIcon />} active={isActive} to={'/ai-search'}>
      <span>AI Search</span>
    </MenuLinkItem>
  );
};

const IntelligenceButton = () => {
  const { workbenchService } = useServices({
    WorkbenchService,
  });
  const workbench = workbenchService.workbench;
  const isActive = useLiveData(
    workbench.location$.selector(location => location.pathname === '/chat')
  );

  return (
    <MenuLinkItem icon={<JournalIcon />} active={isActive} to={'/chat'}>
      <span>Intelligence</span>
    </MenuLinkItem>
  );
};

/**
 * Ploy-Note sidebar — clean, focused, no auth.
 */
export const RootAppSidebar = memo((): ReactElement => {
  const { workbenchService, cMDKQuickSearchService } = useServices({
    WorkbenchService,
    CMDKQuickSearchService,
  });

  const t = useI18n();
  const workspaceDialogService = useService(WorkspaceDialogService);
  const workbench = workbenchService.workbench;
  const workspaceSelectorOpen = useLiveData(workbench.workspaceSelectorOpen$);

  const onOpenQuickSearchModal = useCallback(() => {
    cMDKQuickSearchService.toggle();
  }, [cMDKQuickSearchService]);

  const onWorkspaceSelectorOpenChange = useCallback(
    (open: boolean) => {
      workbench.setWorkspaceSelectorOpen(open);
    },
    [workbench]
  );

  const onOpenSettingModal = useCallback(() => {
    workspaceDialogService.open('setting', {
      activeTab: 'appearance',
    });
    track.$.navigationPanel.$.openSettings();
  }, [workspaceDialogService]);

  const handleOpenDocs = useCallback(
    (result: {
      docIds: string[];
      entryId?: string;
      isWorkspaceFile?: boolean;
    }) => {
      const { docIds, entryId, isWorkspaceFile } = result;
      if (isWorkspaceFile && entryId) {
        workbench.openDoc(entryId);
      } else if (!docIds.length) {
        return;
      }
      if (docIds.length > 1) {
        workbench.openAll();
      } else {
        workbench.openDoc(docIds[0]);
      }
    },
    [workbench]
  );

  const onOpenImportModal = useCallback(() => {
    track.$.navigationPanel.importModal.open();
    workspaceDialogService.open('import', undefined, payload => {
      if (!payload) {
        return;
      }
      handleOpenDocs(payload);
    });
  }, [workspaceDialogService, handleOpenDocs]);

  return (
    <AppSidebar>
      <SidebarContainer>
        <div className={workspaceAndUserWrapper}>
          <div className={workspaceWrapper}>
            <WorkspaceNavigator
              showSyncStatus
              open={workspaceSelectorOpen}
              onOpenChange={onWorkspaceSelectorOpenChange}
              dense
            />
          </div>
        </div>
        <div className={quickSearchAndNewPage}>
          <QuickSearchInput
            className={quickSearch}
            data-testid="slider-bar-quick-search-button"
            data-event-props="$.navigationPanel.$.quickSearch"
            onClick={onOpenQuickSearchModal}
          />
          <AddPageButton />
        </div>
        <AllDocsButton />
        <InboxButton />
        <AISearchButton />
        <AppSidebarJournalButton />
        <IntelligenceButton />
        <MenuItem
          data-testid="slider-bar-workspace-setting-button"
          icon={<SettingsIcon />}
          onClick={onOpenSettingModal}
        >
          <span data-testid="settings-modal-trigger">
            {t['com.affine.settingSidebar.title']()}
          </span>
        </MenuItem>
      </SidebarContainer>
      <SidebarScrollableContainer>
        <NavigationPanelFavorites />
        <NavigationPanelSpaces />
        <NavigationPanelOrganize />
        <NavigationPanelTags />
        <NavigationPanelCollections />
        <CollapsibleSection
          path={['others']}
          title={t['com.affine.rootAppSidebar.others']()}
          contentStyle={{ padding: '6px 8px 0 8px' }}
        >
          <TrashButton />
          <MenuItem
            data-testid="slider-bar-import-button"
            icon={<ImportIcon />}
            onClick={onOpenImportModal}
          >
            <span data-testid="import-modal-trigger">{t['Import']()}</span>
          </MenuItem>
          <TemplateDocEntrance />
        </CollapsibleSection>
      </SidebarScrollableContainer>
    </AppSidebar>
  );
});

RootAppSidebar.displayName = 'memo(RootAppSidebar)';
