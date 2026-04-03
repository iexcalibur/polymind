import { uniReactRoot } from '@polymind/component';
import { useResponsiveSidebar } from '@polymind/core/components/hooks/use-responsive-siedebar';
import { SWRConfigProvider } from '@polymind/core/components/providers/swr-config-provider';
import { WorkspaceSideEffects } from '@polymind/core/components/providers/workspace-side-effects';
import { AIIsland } from '@polymind/core/desktop/components/ai-island';
import { AppContainer } from '@polymind/core/desktop/components/app-container';
import { DocumentTitle } from '@polymind/core/desktop/components/document-title';
import { WorkspaceDialogs } from '@polymind/core/desktop/dialogs';
import { PeekViewManagerModal } from '@polymind/core/modules/peek-view';
import { WorkbenchService } from '@polymind/core/modules/workbench';
import { WorkspaceService } from '@polymind/core/modules/workspace';
import { LiveData, useLiveData, useService } from '@toeverything/infra';
import type { PropsWithChildren } from 'react';

export const WorkspaceLayout = function WorkspaceLayout({
  children,
}: PropsWithChildren) {
  return (
    <SWRConfigProvider>
      <WorkspaceDialogs />

      {/* ---- some side-effect components ---- */}
      <WorkspaceSideEffects />
      <PeekViewManagerModal />
      <DocumentTitle />

      <WorkspaceLayoutInner>{children}</WorkspaceLayoutInner>
      {/* should show after workspace loaded */}
      <AIIsland />
      <uniReactRoot.Root />
    </SWRConfigProvider>
  );
};

/**
 * Wraps the workspace layout main router view
 */
const WorkspaceLayoutUIContainer = ({ children }: PropsWithChildren) => {
  const workbench = useService(WorkbenchService).workbench;
  const currentPath = useLiveData(
    LiveData.computed(get => {
      return get(workbench.basename$) + get(workbench.location$).pathname;
    })
  );
  useResponsiveSidebar();

  return (
    <AppContainer data-current-path={currentPath}>{children}</AppContainer>
  );
};
const WorkspaceLayoutInner = ({ children }: PropsWithChildren) => {
  return <WorkspaceLayoutUIContainer>{children}</WorkspaceLayoutUIContainer>;
};
