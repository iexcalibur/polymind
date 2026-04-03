import { IconButton, notify, toast, useConfirmModal } from '@polymind/component';
import {
  MenuSeparator,
  MenuSub,
  MobileMenu,
  MobileMenuItem,
} from '@polymind/component/ui/menu';
import { useFavorite } from '@polymind/core/blocksuite/block-suite-header/favorite';
import { Guard, useGuard } from '@polymind/core/components/guard';
import { IsFavoriteIcon } from '@polymind/core/components/pure/icons';
import { DocInfoSheet } from '@polymind/core/mobile/components';
import { MobileTocMenu } from '@polymind/core/mobile/components/toc-menu';
import { DocService } from '@polymind/core/modules/doc';
import { EditorService } from '@polymind/core/modules/editor';
import { ViewService } from '@polymind/core/modules/workbench/services/view';
import { preventDefault } from '@polymind/core/utils';
import { useI18n } from '@polymind/i18n';
import {
  DeleteIcon,
  EdgelessIcon,
  InformationIcon,
  MoreHorizontalIcon,
  PageIcon,
  TocIcon,
} from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useEffect, useState } from 'react';

import { JournalConflictsMenuItem } from './menu/journal-conflicts';
import { JournalTodayActivityMenuItem } from './menu/journal-today-activity';
import { EditorModeSwitch } from './menu/mode-switch';
import * as styles from './page-header-more-button.css';

export const PageHeaderMenuButton = () => {
  const t = useI18n();

  const doc = useService(DocService).doc;
  const docId = doc?.id;
  const canEdit = useGuard('Doc_Update', docId);

  const editorService = useService(EditorService);
  const editorContainer = useLiveData(editorService.editor.editorContainer$);

  const [open, setOpen] = useState(false);
  const location = useLiveData(useService(ViewService).view.location$);

  const isInTrash = useLiveData(
    editorService.editor.doc.meta$.map(meta => meta.trash)
  );
  const primaryMode = useLiveData(editorService.editor.doc.primaryMode$);
  const title = useLiveData(editorService.editor.doc.title$);

  const { favorite, toggleFavorite } = useFavorite(docId);
  const { openConfirmModal } = useConfirmModal();

  const handleSwitchMode = useCallback(() => {
    const mode = primaryMode === 'page' ? 'edgeless' : 'page';
    // TODO(@JimmFly): remove setMode when there has view mode switch
    editorService.editor.setMode(mode);
    editorService.editor.doc.setPrimaryMode(mode);
    notify.success({
      title:
        primaryMode === 'page'
          ? t['com.polymind.toastMessage.defaultMode.edgeless.title']()
          : t['com.polymind.toastMessage.defaultMode.page.title'](),
      message:
        primaryMode === 'page'
          ? t['com.polymind.toastMessage.defaultMode.edgeless.message']()
          : t['com.polymind.toastMessage.defaultMode.page.message'](),
    });
  }, [primaryMode, editorService, t]);

  const handleMenuOpenChange = useCallback((open: boolean) => {
    if (open) {
    }
    setOpen(open);
  }, []);

  useEffect(() => {
    // when the location is changed, close the menu
    handleMenuOpenChange(false);
  }, [handleMenuOpenChange, location.pathname]);

  const handleToggleFavorite = useCallback(() => {
    toggleFavorite();
  }, [toggleFavorite]);

  const handleMoveToTrash = useCallback(() => {
    if (!doc) {
      return;
    }
    openConfirmModal({
      title: t['com.polymind.moveToTrash.title'](),
      description: t['com.polymind.moveToTrash.confirmModal.description']({
        title: doc.title$.value,
      }),
      confirmText: t['com.polymind.moveToTrash.confirmModal.confirm'](),
      cancelText: t['com.polymind.moveToTrash.confirmModal.cancel'](),
      confirmButtonOptions: {
        variant: 'error',
      },
      onConfirm() {
        doc.moveToTrash();
        toast(t['com.polymind.toastMessage.movedTrash']());
        // navigate back
        history.back();
      },
    });
  }, [doc, openConfirmModal, t]);

  const EditMenu = (
    <>
      <EditorModeSwitch />
      <JournalTodayActivityMenuItem suffix={<MenuSeparator />} />
      <MobileMenuItem
        prefixIcon={primaryMode === 'page' ? <EdgelessIcon /> : <PageIcon />}
        data-testid="editor-option-menu-mode-switch"
        onSelect={handleSwitchMode}
        disabled={!canEdit}
      >
        {primaryMode === 'page'
          ? t['com.polymind.editorDefaultMode.edgeless']()
          : t['com.polymind.editorDefaultMode.page']()}
      </MobileMenuItem>
      <MobileMenuItem
        data-testid="editor-option-menu-favorite"
        onSelect={handleToggleFavorite}
        prefixIcon={<IsFavoriteIcon favorite={favorite} />}
      >
        {favorite
          ? t['com.polymind.favoritePageOperation.remove']()
          : t['com.polymind.favoritePageOperation.add']()}
      </MobileMenuItem>
      <MenuSeparator />
      <MenuSub
        triggerOptions={{
          prefixIcon: <InformationIcon />,
          onClick: preventDefault,
        }}
        title={title ?? t['unnamed']()}
        items={<DocInfoSheet docId={docId} />}
      >
        <span>{t['com.polymind.page-properties.page-info.view']()}</span>
      </MenuSub>
      <MobileMenu
        title={t['com.polymind.header.menu.toc']()}
        items={
          <div className={styles.outlinePanel}>
            <MobileTocMenu editor={editorContainer?.host ?? null} />
          </div>
        }
      >
        <MobileMenuItem prefixIcon={<TocIcon />} onClick={preventDefault}>
          <span>{t['com.polymind.header.option.view-toc']()}</span>
        </MobileMenuItem>
      </MobileMenu>
      <JournalConflictsMenuItem />
      <Guard docId={docId} permission="Doc_Trash">
        {canMoveToTrash => (
          <MobileMenuItem
            prefixIcon={<DeleteIcon />}
            type="danger"
            disabled={!canMoveToTrash}
            onSelect={handleMoveToTrash}
          >
            {t['com.polymind.moveToTrash.title']()}
          </MobileMenuItem>
        )}
      </Guard>
    </>
  );
  if (isInTrash) {
    return null;
  }
  return (
    <MobileMenu
      items={EditMenu}
      contentOptions={{
        align: 'center',
      }}
      rootOptions={{
        open,
        onOpenChange: handleMenuOpenChange,
      }}
    >
      <IconButton
        size={24}
        data-testid="detail-page-header-more-button"
        className={styles.iconButton}
      >
        <MoreHorizontalIcon />
      </IconButton>
    </MobileMenu>
  );
};
