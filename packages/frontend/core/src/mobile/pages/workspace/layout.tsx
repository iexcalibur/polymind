import { uniReactRoot } from '@polymind/component';
import { AffineErrorBoundary } from '@polymind/core/components/affine/affine-error-boundary';
import { SWRConfigProvider } from '@polymind/core/components/providers/swr-config-provider';
import { WorkspaceSideEffects } from '@polymind/core/components/providers/workspace-side-effects';
import { GlobalContextService } from '@polymind/core/modules/global-context';
import { PeekViewManagerModal } from '@polymind/core/modules/peek-view';
import type {
  Workspace,
  WorkspaceMetadata,
} from '@polymind/core/modules/workspace';
import { WorkspacesService } from '@polymind/core/modules/workspace';
import {
  FrameworkScope,
  LiveData,
  useLiveData,
  useServices,
} from '@toeverything/infra';
import {
  type PropsWithChildren,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { map } from 'rxjs';

import { AppFallback } from '../../components/app-fallback';
import { WorkspaceDialogs } from '../../dialogs';

// TODO(@forehalo): reuse the global context with [core/electron]
declare global {
  /**
   * @internal debug only
   */
  // oxlint-disable-next-line no-var
  var currentWorkspace: Workspace | undefined;
  // oxlint-disable-next-line no-var
  var exportWorkspaceSnapshot: (docs?: string[]) => Promise<void>;
  // oxlint-disable-next-line no-var
  var importWorkspaceSnapshot: () => Promise<void>;
  interface WindowEventMap {
    'affine:workspace:change': CustomEvent<{ id: string }>;
  }
}

export const WorkspaceLayout = ({
  meta,
  children,
}: PropsWithChildren<{ meta: WorkspaceMetadata }>) => {
  const { workspacesService, globalContextService } =
    useServices({
      WorkspacesService,
      GlobalContextService,
    });

  const [workspace, setWorkspace] = useState<Workspace | null>(null);

  useLayoutEffect(() => {
    const ref = workspacesService.open({ metadata: meta });
    setWorkspace(ref.workspace);
    return () => {
      ref.dispose();
    };
  }, [meta, workspacesService]);

  useEffect(() => {
    if (workspace) {
      // for debug purpose
      window.currentWorkspace = workspace ?? undefined;
      window.dispatchEvent(
        new CustomEvent('affine:workspace:change', {
          detail: {
            id: workspace.id,
          },
        })
      );
      globalContextService.globalContext.workspaceId.set(workspace.id);
      globalContextService.globalContext.workspaceFlavour.set(
        workspace.flavour
      );
      return () => {
        window.currentWorkspace = undefined;
        globalContextService.globalContext.workspaceId.set(null);
        globalContextService.globalContext.workspaceFlavour.set(null);
      };
    }
    return;
  }, [
    globalContextService,
    workspace,
  ]);

  const rootDocReady$ = useMemo(
    () =>
      workspace
        ? LiveData.from(
            workspace.engine.doc
              .docState$(workspace.id)
              .pipe(map(v => v.ready)),
            false
          )
        : null,
    [workspace]
  );
  const isRootDocReady = useLiveData(rootDocReady$) ?? false;

  if (!workspace) {
    return null; // skip this, workspace will be set in layout effect
  }

  if (!isRootDocReady) {
    return <AppFallback />;
  }

  return (
    <FrameworkScope scope={workspace.scope}>
      <AffineErrorBoundary height="100dvh">
        <SWRConfigProvider>
          <WorkspaceDialogs />

          {/* ---- some side-effect components ---- */}
          <PeekViewManagerModal />
          <uniReactRoot.Root />
          <WorkspaceSideEffects />
          {children}
        </SWRConfigProvider>
      </AffineErrorBoundary>
    </FrameworkScope>
  );
};
