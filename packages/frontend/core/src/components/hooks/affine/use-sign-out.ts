import { useCallback } from 'react';

/**
 * No-op stub: cloud auth has been removed.
 * Returns a function that does nothing.
 */
export const useSignOut = (_props?: Record<string, unknown>) => {
  const confirmSignOut = useCallback(() => {
    // no-op: sign-out is not needed without cloud auth
  }, []);

  return confirmSignOut;
};
