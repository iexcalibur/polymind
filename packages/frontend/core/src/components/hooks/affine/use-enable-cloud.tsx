import type { Workspace } from '@affine/core/modules/workspace';
import { useCallback } from 'react';

interface ConfirmEnableCloudOptions {
  onSuccess?: () => void;
  onFinished?: () => void;
  openPageId?: string;
  serverId?: string;
}

/**
 * No-op stub: cloud enablement has been removed.
 * Returns a function that does nothing.
 */
export const useEnableCloud = () => {
  const confirmEnableCloud = useCallback(
    (_ws: Workspace, _options?: ConfirmEnableCloudOptions) => {
      // no-op: cloud is not available
    },
    []
  );

  return confirmEnableCloud;
};
