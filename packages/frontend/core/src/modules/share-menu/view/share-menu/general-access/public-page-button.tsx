import { Menu, MenuItem, MenuTrigger } from '@affine/component';
import { useI18n } from '@affine/i18n';
import { LockIcon, ViewIcon } from '@blocksuite/icons/rc';
import clsx from 'clsx';
import { useCallback } from 'react';

import * as styles from './styles.css';

export const PublicDoc = ({ disabled }: { disabled?: boolean }) => {
  const t = useI18n();
  const isSharedPage = false;
  const isRevalidating = false;

  const onDisablePublic = useCallback(() => {
  }, []);

  const onClickAnyoneReadOnlyShare = useCallback(() => {
  }, []);

  return (
    <div className={styles.rowContainerStyle}>
      <div className={styles.labelStyle}>
        {t['com.affine.share-menu.option.link.label']()}
      </div>
      {disabled ? (
        <div className={clsx(styles.menuTriggerStyle, 'disable')}>
          <div className={styles.menuTriggerText}>
            {isSharedPage
              ? t['com.affine.share-menu.option.link.readonly']()
              : t['com.affine.share-menu.option.link.no-access']()}
          </div>
        </div>
      ) : (
        <Menu
          contentOptions={{
            align: 'end',
          }}
          items={
            <>
              <MenuItem
                prefixIcon={<LockIcon />}
                onSelect={onDisablePublic}
                selected={!isSharedPage}
              >
                <div className={styles.publicItemRowStyle}>
                  <div>
                    {t['com.affine.share-menu.option.link.no-access']()}
                  </div>
                </div>
              </MenuItem>
              <MenuItem
                prefixIcon={<ViewIcon />}
                onSelect={onClickAnyoneReadOnlyShare}
                data-testid="share-link-menu-enable-share"
                selected={!!isSharedPage}
              >
                <div className={styles.publicItemRowStyle}>
                  <div>{t['com.affine.share-menu.option.link.readonly']()}</div>
                </div>
              </MenuItem>
            </>
          }
        >
          <MenuTrigger
            className={styles.menuTriggerStyle}
            data-testid="share-link-menu-trigger"
            variant="plain"
            suffixClassName={styles.suffixClassName}
            contentStyle={{
              width: '100%',
            }}
            loading={isRevalidating}
            disabled={isRevalidating}
          >
            {isSharedPage
              ? t['com.affine.share-menu.option.link.readonly']()
              : t['com.affine.share-menu.option.link.no-access']()}
          </MenuTrigger>
        </Menu>
      )}
    </div>
  );
};
