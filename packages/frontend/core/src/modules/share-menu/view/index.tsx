import { useEnableCloud } from '@affine/core/components/hooks/affine/use-enable-cloud';
import type { Workspace } from '@affine/core/modules/workspace';
import type { Store } from '@blocksuite/affine/store';
import { useCallback } from 'react';

import { ShareMenu } from './share-menu';
export { CloudSvg } from './cloud-svg';
export { ShareMenuContent } from './share-menu';

type SharePageModalProps = {
  workspace: Workspace;
  page: Store;
};

export const SharePageButton = ({ workspace, page }: SharePageModalProps) => {
  const confirmEnableCloud = useEnableCloud();
  const handleOpenShareModal = useCallback((_open: boolean) => {
  }, []);

  return (
    <ShareMenu
      workspaceMetadata={workspace.meta}
      currentPage={page}
      onEnableAffineCloud={() =>
        confirmEnableCloud(workspace, {
          openPageId: page.id,
        })
      }
      onOpenShareModal={handleOpenShareModal}
    />
  );
};
