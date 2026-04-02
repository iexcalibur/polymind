import { WorkspaceService } from '@affine/core/modules/workspace';
import { useService } from '@toeverything/infra';

/**
 * WorkspaceShareSettingService has been removed.
 * SharingPanel renders nothing for local workspaces and nothing for cloud
 * (since cloud is removed).
 */
export const SharingPanel = () => {
  const workspace = useService(WorkspaceService).workspace;
  if (workspace.flavour === 'local') {
    return null;
  }
  return null;
};
