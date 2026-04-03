import { IconButton } from '@affine/component';
import { useNavigateHelper } from '@affine/core/components/hooks/use-navigate-helper';
import { useWorkspaceInfo } from '@affine/core/components/hooks/use-workspace-info';
import { WorkspaceAvatar } from '@affine/core/components/workspace-avatar';
import {
  type WorkspaceMetadata,
  WorkspacesService,
} from '@affine/core/modules/workspace';
import { useI18n } from '@affine/i18n';
import { CloseIcon, CollaborationIcon } from '@blocksuite/icons/rc';
import { useLiveData, useService } from '@toeverything/infra';
import clsx from 'clsx';
import { type HTMLAttributes, useCallback, useMemo } from 'react';

import * as styles from './menu.css';

const WorkspaceItem = ({
  workspace,
  className,
  ...attrs
}: { workspace: WorkspaceMetadata } & HTMLAttributes<HTMLButtonElement>) => {
  const info = useWorkspaceInfo(workspace);
  const name = info?.name;
  const isOwner = info?.isOwner;

  return (
    <li className={styles.wsItem}>
      <button className={clsx(styles.wsCard, className)} {...attrs}>
        <WorkspaceAvatar
          key={workspace.id}
          meta={workspace}
          rounded={6}
          data-testid="workspace-avatar"
          size={32}
          name={name}
          colorfulFallback
        />
        <div className={styles.wsName}>{name}</div>
        {!isOwner ? <CollaborationIcon fontSize={24} /> : null}
      </button>
    </li>
  );
};

interface WorkspaceListProps {
  items: WorkspaceMetadata[];
  onClick: (workspace: WorkspaceMetadata) => void;
}
export const WorkspaceList = (props: WorkspaceListProps) => {
  const workspaceList = props.items;

  return workspaceList.map(item => (
    <WorkspaceItem
      key={item.id}
      workspace={item}
      onClick={() => props.onClick(item)}
    />
  ));
};

export const SelectorMenu = ({ onClose }: { onClose?: () => void }) => {
  const workspacesService = useService(WorkspacesService);
  const workspaces = useLiveData(workspacesService.list.workspaces$);
  const { jumpToPage } = useNavigateHelper();
  const t = useI18n();

  const localWorkspaces = useMemo(
    () => workspaces.filter(({ flavour }) => flavour === 'local'),
    [workspaces]
  );

  const handleClickWorkspace = useCallback(
    (workspaceMetadata: WorkspaceMetadata) => {
      jumpToPage(workspaceMetadata.id, 'home');
      onClose?.();
    },
    [onClose, jumpToPage]
  );

  return (
    <div className={styles.root}>
      <header className={styles.head}>
        Workspace
        <div className={styles.headActions}>
          <IconButton onClick={onClose} size="24" icon={<CloseIcon />} />
        </div>
      </header>
      <div className={styles.divider} />
      <main className={styles.body}>
        <div className={styles.serverInfo}>
          <div className={styles.serverName}>
            {t['com.affine.workspaceList.workspaceListType.local']()}
          </div>
        </div>
        <WorkspaceList
          items={localWorkspaces}
          onClick={handleClickWorkspace}
        />
      </main>
    </div>
  );
};
