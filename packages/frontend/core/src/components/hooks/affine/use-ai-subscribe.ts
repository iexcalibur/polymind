import { useCallback } from 'react';

/**
 * No-op stub: cloud subscriptions have been removed.
 * Returns a function that does nothing.
 */
export const useAISubscribe = () => {
  const handleAISubscribe = useCallback(async () => {
    // no-op: subscriptions are not available
  }, []);

  return handleAISubscribe;
};
