import { FeatureFlagService } from '@affine/core/modules/feature-flag';
import { useLiveData, useService } from '@toeverything/infra';

export const useEnableAI = () => {
  const featureFlagService = useService(FeatureFlagService);
  const aiFeature = useLiveData(featureFlagService.flags.enable_ai.$);

  // Local-only mode: AI is always available when the feature flag is on.
  // No server config check needed.
  return aiFeature;
};
