import { FlexWrapper } from '@affine/component';
import {
  createDocExplorerContext,
  DocExplorerContext,
} from '@affine/core/components/explorer/context';
import { DocsExplorer } from '@affine/core/components/explorer/docs-view/docs-list';
import type { ExplorerDisplayPreference } from '@affine/core/components/explorer/types';
import { CollectionRulesService } from '@affine/core/modules/collection-rules';
import { WorkspacePermissionService } from '@affine/core/modules/permissions';
import type { Space } from '@affine/core/modules/space';
import { SpaceService } from '@affine/core/modules/space';
import { useLiveData, useServices } from '@toeverything/infra';
import { useCallback, useEffect, useState } from 'react';

import { SpaceCanvasView } from './canvas-view';
import { SpaceDetailHeader, type SpaceViewMode } from './header';
import * as styles from './index.css';
import { SpaceListHeader } from './list-header';

export const SpaceDetail = ({ space }: { space: Space }) => {
  const [explorerContextValue] = useState(createDocExplorerContext);
  const [viewMode, setViewMode] = useState<SpaceViewMode>('list');

  const { collectionRulesService, spaceService, permissionService } =
    useServices({
      CollectionRulesService,
      SpaceService,
      WorkspacePermissionService,
    });

  const isAdmin = useLiveData(permissionService.permission.isAdmin$);
  const isOwner = useLiveData(permissionService.permission.isOwner$);

  const displayPreference = useLiveData(
    explorerContextValue.displayPreference$
  );
  const groupBy = useLiveData(explorerContextValue.groupBy$);
  const orderBy = useLiveData(explorerContextValue.orderBy$);

  // Get all doc IDs that belong to this Space
  const spaceDocIds = useLiveData(spaceService.getSpaceDocIds$(space.id));

  const handleDisplayPreferenceChange = useCallback(
    (pref: ExplorerDisplayPreference) => {
      explorerContextValue.displayPreference$.next(pref);
    },
    [explorerContextValue]
  );

  // Feed Space docs into DocsExplorer via CollectionRulesService
  useEffect(() => {
    if (viewMode !== 'list') return;

    const subscription = collectionRulesService
      .watch({
        filters: [],
        groupBy,
        orderBy,
        extraAllowList: spaceDocIds,
        extraFilters: [
          {
            type: 'system',
            key: 'empty-journal',
            method: 'is',
            value: 'false',
          },
          { type: 'system', key: 'trash', method: 'is', value: 'false' },
        ],
      })
      .subscribe({
        next: result => {
          explorerContextValue.groups$.next(result.groups);
        },
        error: err => console.error(err),
      });

    return () => subscription.unsubscribe();
  }, [
    collectionRulesService,
    explorerContextValue,
    groupBy,
    orderBy,
    spaceDocIds,
    viewMode,
  ]);

  return (
    <DocExplorerContext.Provider value={explorerContextValue}>
      {/* Header with mode toggle */}
      <SpaceDetailHeader
        displayPreference={displayPreference}
        onDisplayPreferenceChange={handleDisplayPreferenceChange}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {viewMode === 'list' ? (
        <FlexWrapper flexDirection="column" alignItems="stretch" width="100%">
          <SpaceListHeader space={space} />
          <div className={styles.scrollArea}>
            <DocsExplorer disableMultiDelete={!isAdmin && !isOwner} />
          </div>
        </FlexWrapper>
      ) : (
        <SpaceCanvasView spaceId={space.id} spaceDocIds={spaceDocIds} />
      )}
    </DocExplorerContext.Provider>
  );
};
