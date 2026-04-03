import {
  IconButton,
  MenuItem,
  MenuSeparator,
  toast,
  useConfirmModal,
} from '@polymind/component';
import { usePageHelper } from '@polymind/core/blocksuite/block-suite-page-list/utils';
import { IsFavoriteIcon } from '@polymind/core/components/pure/icons';
import type { NodeOperation } from '@polymind/core/desktop/components/navigation-panel';
import { WorkspaceDialogService } from '@polymind/core/modules/dialogs';
import { DocsService } from '@polymind/core/modules/doc';
import { FavoriteService } from '@polymind/core/modules/favorite';
import { GlobalCacheService } from '@polymind/core/modules/storage';
import { TagService } from '@polymind/core/modules/tag';
import { WorkbenchService } from '@polymind/core/modules/workbench';
import { WorkspaceService } from '@polymind/core/modules/workspace';
import { useI18n } from '@polymind/i18n';
import {
  DeleteIcon,
  FolderIcon,
  PlusIcon,
  SplitViewIcon,
} from '@blocksuite/icons/rc';
import { useLiveData, useServices } from '@toeverything/infra';
import { useCallback, useMemo } from 'react';

import { TagRenameSubMenu } from './dialog';

export const useNavigationPanelTagNodeOperations = (
  tagId: string,
  {
    openNodeCollapsed,
  }: {
    openNodeCollapsed: () => void;
  }
) => {
  const t = useI18n();
  const {
    workbenchService,
    workspaceService,
    tagService,
    favoriteService,
    workspaceDialogService,
    globalCacheService,
  } = useServices({
    WorkbenchService,
    WorkspaceService,
    TagService,
    DocsService,
    FavoriteService,
    WorkspaceDialogService,
    GlobalCacheService,
  });
  const { openConfirmModal } = useConfirmModal();

  const favorite = useLiveData(
    favoriteService.favoriteList.favorite$('tag', tagId)
  );
  const tagRecord = useLiveData(tagService.tagList.tagByTagId$(tagId));

  const { createPage } = usePageHelper(
    workspaceService.workspace.docCollection
  );

  const handleNewDoc = useCallback(() => {
    if (tagRecord) {
      const newDoc = createPage();
      tagRecord?.tag(newDoc.id);
      openNodeCollapsed();
    }
  }, [createPage, openNodeCollapsed, tagRecord]);

  const handleMoveToTrash = useCallback(() => {
    tagService.tagList.deleteTag(tagId);
    toast(t['com.polymind.tags.delete-tags.toast']());
  }, [t, tagId, tagService.tagList]);

  const handleOpenInSplitView = useCallback(() => {
    workbenchService.workbench.openTag(tagId, {
      at: 'beside',
    });
  }, [tagId, workbenchService]);

  const handleToggleFavoriteTag = useCallback(() => {
    favoriteService.favoriteList.toggle('tag', tagId);
  }, [favoriteService, tagId]);

  const handleOpenInNewTab = useCallback(() => {
    workbenchService.workbench.openTag(tagId, {
      at: 'new-tab',
    });
  }, [tagId, workbenchService]);

  const handleRename = useCallback(
    (newName: string) => {
      if (tagRecord && tagRecord.value$.value !== newName) {
        tagRecord.rename(newName);
      }
    },
    [tagRecord]
  );
  const handleChangeColor = useCallback(
    (color: string) => {
      if (tagRecord && tagRecord.color$.value !== color) {
        tagRecord.changeColor(color);
      }
    },
    [tagRecord]
  );
  const handleChangeNameOrColor = useCallback(
    (name?: string, color?: string) => {
      if (name !== undefined) {
        handleRename(name);
      }
      if (color !== undefined) {
        handleChangeColor(color);
      }
    },
    [handleChangeColor, handleRename]
  );
  const handleOpenDocSelector = useCallback(() => {
    const initialIds = tagRecord?.pageIds$.value;
    workspaceDialogService.open(
      'doc-selector',
      {
        init: initialIds ?? [],
        onBeforeConfirm(ids, cb) {
          const hasRemoved = initialIds?.some(id => !ids?.includes(id));
          if (
            hasRemoved &&
            globalCacheService.globalCache.get(
              'mobile:tags:will-be-removed-warning-read'
            ) !== true
          ) {
            openConfirmModal({
              title: t['com.polymind.m.selector.remove-warning.title'](),
              description: t['com.polymind.m.selector.remove-warning.message']({
                type: t['com.polymind.m.selector.type-doc'](),
                where: t['com.polymind.m.selector.where-tag'](),
              }),
              cancelText: t['com.polymind.m.selector.remove-warning.cancel'](),
              confirmText: t['com.polymind.m.selector.remove-warning.confirm'](),
              reverseFooter: true,
              onConfirm: () => {
                globalCacheService.globalCache.set(
                  'mobile:tags:will-be-removed-warning-read',
                  true
                );
                cb();
              },
            });
          } else {
            cb();
          }
        },
      },
      selectedIds => {
        if (selectedIds === undefined) {
          return;
        }
        const newIds = selectedIds.filter(id => !initialIds?.includes(id));
        const removedIds = initialIds?.filter(id => !selectedIds.includes(id));
        newIds.forEach(id => tagRecord?.tag(id));
        removedIds?.forEach(id => tagRecord?.untag(id));
      }
    );
  }, [
    tagRecord,
    workspaceDialogService,
    globalCacheService.globalCache,
    openConfirmModal,
    t,
  ]);

  return useMemo(
    () => ({
      favorite,
      handleNewDoc,
      handleMoveToTrash,
      handleOpenInSplitView,
      handleToggleFavoriteTag,
      handleOpenInNewTab,
      handleRename,
      handleChangeColor,
      handleChangeNameOrColor,
      handleOpenDocSelector,
    }),
    [
      favorite,
      handleChangeColor,
      handleChangeNameOrColor,
      handleMoveToTrash,
      handleNewDoc,
      handleOpenInNewTab,
      handleOpenInSplitView,
      handleRename,
      handleToggleFavoriteTag,
      handleOpenDocSelector,
    ]
  );
};
export const useNavigationPanelTagNodeOperationsMenu = (
  tagId: string,
  option: {
    openNodeCollapsed: () => void;
  }
): NodeOperation[] => {
  const t = useI18n();
  const {
    favorite,
    handleNewDoc,
    handleMoveToTrash,
    handleOpenInSplitView,
    handleToggleFavoriteTag,
    handleChangeNameOrColor,
    handleOpenDocSelector,
  } = useNavigationPanelTagNodeOperations(tagId, option);

  return useMemo(
    () => [
      {
        index: 0,
        inline: true,
        view: (
          <IconButton size="16" onClick={handleNewDoc}>
            <PlusIcon />
          </IconButton>
        ),
      },
      {
        index: 10,
        view: (
          <TagRenameSubMenu
            onConfirm={handleChangeNameOrColor}
            tagId={tagId}
            menuProps={{ triggerOptions: { 'data-testid': 'rename-tag' } }}
          />
        ),
      },
      {
        index: 11,
        view: <MenuSeparator />,
      },
      {
        index: 12,
        view: (
          <MenuItem prefixIcon={<FolderIcon />} onClick={handleOpenDocSelector}>
            {t['com.polymind.m.explorer.tag.manage-docs']()}
          </MenuItem>
        ),
      },
      ...(BUILD_CONFIG.isElectron
        ? [
            {
              index: 100,
              view: (
                <MenuItem
                  prefixIcon={<SplitViewIcon />}
                  onClick={handleOpenInSplitView}
                >
                  {t['com.polymind.workbench.split-view.page-menu-open']()}
                </MenuItem>
              ),
            },
          ]
        : []),
      {
        index: 199,
        view: (
          <MenuItem
            prefixIcon={<IsFavoriteIcon favorite={!!favorite} />}
            onClick={handleToggleFavoriteTag}
          >
            {favorite
              ? t['com.polymind.favoritePageOperation.remove']()
              : t['com.polymind.favoritePageOperation.add']()}
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
            type={'danger'}
            prefixIcon={<DeleteIcon />}
            onClick={handleMoveToTrash}
          >
            {t['Delete']()}
          </MenuItem>
        ),
      },
    ],
    [
      favorite,
      handleChangeNameOrColor,
      handleMoveToTrash,
      handleNewDoc,
      handleOpenDocSelector,
      handleOpenInSplitView,
      handleToggleFavoriteTag,
      t,
      tagId,
    ]
  );
};
