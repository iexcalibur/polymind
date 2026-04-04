import { toReactNode } from '@polymind/component';
import { AIChatBlockPeekViewTemplate } from '@polymind/core/blockmind/ai';
import type { AIChatBlockModel } from '@polymind/core/blockmind/ai/blocks/ai-chat-block/model/ai-chat-model';
import { registerAIAppEffects } from '@polymind/core/blockmind/ai/effects/app';
import { useAIChatConfig } from '@polymind/core/components/hooks/polymind/use-ai-chat-config';
import { useAISubscribe } from '@polymind/core/components/hooks/polymind/use-ai-subscribe';
import {
  AIDraftService,
  AIToolsConfigService,
} from '@polymind/core/modules/ai-button';
import { AIModelService } from '@polymind/core/modules/ai-button/services/models';
import { WorkspaceDialogService } from '@polymind/core/modules/dialogs';
import { FeatureFlagService } from '@polymind/core/modules/feature-flag';
import type { EditorHost } from '@blockmind/polymind/std';
import { useFramework } from '@toeverything/infra';
import { useMemo } from 'react';

registerAIAppEffects();

export type AIChatBlockPeekViewProps = {
  model: AIChatBlockModel;
  host: EditorHost;
};

export const AIChatBlockPeekView = ({
  model,
  host,
}: AIChatBlockPeekViewProps) => {
  const { docDisplayConfig, searchMenuConfig, reasoningConfig } =
    useAIChatConfig();

  const framework = useFramework();
  const affineFeatureFlagService = framework.get(FeatureFlagService);
  const polymindWorkspaceDialogService = framework.get(WorkspaceDialogService);
  const aiDraftService = framework.get(AIDraftService);
  const aiToolsConfigService = framework.get(AIToolsConfigService);
  const aiModelService = framework.get(AIModelService);
  const handleAISubscribe = useAISubscribe();

  return useMemo(() => {
    const template = AIChatBlockPeekViewTemplate(
      model,
      host,
      docDisplayConfig,
      searchMenuConfig,
      reasoningConfig,
      affineFeatureFlagService,
      polymindWorkspaceDialogService,
      aiDraftService,
      aiToolsConfigService,
      aiModelService,
      handleAISubscribe
    );
    return toReactNode(template);
  }, [
    model,
    host,
    docDisplayConfig,
    searchMenuConfig,
    reasoningConfig,
    affineFeatureFlagService,
    polymindWorkspaceDialogService,
    aiDraftService,
    aiToolsConfigService,
    aiModelService,
    handleAISubscribe,
  ]);
};
