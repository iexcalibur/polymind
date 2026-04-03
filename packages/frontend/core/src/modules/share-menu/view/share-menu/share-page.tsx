import { Divider } from '@affine/component';
import { Button } from '@affine/component/ui/button';
import { useGuard } from '@affine/core/components/guard';
import { DocService } from '@affine/core/modules/doc';
import { useI18n } from '@affine/i18n';
import { useService } from '@toeverything/infra';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { CloudSvg } from '../cloud-svg';
import { CopyLinkButton } from './copy-link-button';
import { MembersPermission, PublicDoc } from './general-access';
import * as styles from './index.css';
import { InviteInput } from './invite-member-editor';
import { MembersRow } from './member-management';
import type { ShareMenuProps } from './share-menu';

export const LocalSharePage = (props: ShareMenuProps) => {
  const t = useI18n();
  const {
    workspaceMetadata: { id: workspaceId },
  } = props;
  return (
    <>
      <div className={styles.localSharePage}>
        <div className={styles.columnContainerStyle} style={{ gap: '12px' }}>
          <div
            className={styles.descriptionStyle}
            style={{ maxWidth: '230px' }}
          >
            {t['com.affine.share-menu.EnableCloudDescription']()}
          </div>
          <div>
            <Button
              onClick={props.onEnableAffineCloud}
              variant="primary"
              data-testid="share-menu-enable-affine-cloud-button"
            >
              {t['Enable Cloud']?.() ?? 'Enable Cloud'}
            </Button>
          </div>
        </div>
        <div className={styles.cloudSvgContainer}>
          <CloudSvg />
        </div>
      </div>
      <CopyLinkButton workspaceId={workspaceId} secondary />
    </>
  );
};

export const AFFiNESharePage = (
  props: ShareMenuProps & {
    onClickInvite: () => void;
    onClickMembers: () => void;
  }
) => {
  const t = useI18n();
  const {
    workspaceMetadata: { id: workspaceId },
  } = props;
  const docService = useService(DocService);

  const canManageUsers = useGuard('Doc_Users_Manage', docService.doc.id);

  const canPublish = useGuard('Doc_Publish', docService.doc.id);

  return (
    <div className={styles.content}>
      <div className={styles.columnContainerStyle}>
        <div className={styles.memberRowsStyle}>
          {canManageUsers && <InviteInput onFocus={props.onClickInvite} />}
          <MembersRow onClick={props.onClickMembers} />
        </div>

        <div className={styles.generalAccessStyle}>
          {t['com.affine.share-menu.generalAccess']()}
        </div>
        <MembersPermission
          openPaywallModal={props.openPaywallModal}
          hittingPaywall={!!props.hittingPaywall}
          disabled={!canManageUsers}
        />
        <PublicDoc disabled={!canPublish} />
      </div>
      <Divider className={styles.divider} />
      <CopyLinkButton workspaceId={workspaceId} />
    </div>
  );
};

export const SharePage = (
  props: ShareMenuProps & {
    onClickInvite: () => void;
    onClickMembers: () => void;
  }
) => {
  if (props.workspaceMetadata.flavour === 'local') {
    return <LocalSharePage {...props} />;
  } else {
    return (
      // TODO(@eyhn): refactor this part
      <ErrorBoundary fallback={null}>
        <Suspense>
          <AFFiNESharePage {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  }
};
