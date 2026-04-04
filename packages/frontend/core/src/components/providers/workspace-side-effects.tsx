import { toast } from '@polymind/component';
import {
  pushGlobalLoadingEventAtom,
  resolveGlobalLoadingEventAtom,
} from '@polymind/component/global-loading';
import {
  AIProvider,
  CopilotClient,
  setupAIProvider,
} from '@polymind/core/blocksuite/ai';
import { useRegisterFindInPageCommands } from '@polymind/core/components/hooks/polymind/use-register-find-in-page-commands';
import { useRegisterWorkspaceCommands } from '@polymind/core/components/hooks/use-register-workspace-commands';
import { OverCapacityNotification } from '@polymind/core/components/over-capacity';
import {
  GlobalDialogService,
  WorkspaceDialogService,
} from '@polymind/core/modules/dialogs';
import { DocsService } from '@polymind/core/modules/doc';
import { EditorSettingService } from '@polymind/core/modules/editor-setting';
import { useRegisterNavigationCommands } from '@polymind/core/modules/navigation/view/use-register-navigation-commands';
import { QuickSearchContainer } from '@polymind/core/modules/quicksearch';
import { WorkbenchService } from '@polymind/core/modules/workbench';
import {
  getPolyMindWorkspaceSchema,
  WorkspaceService,
} from '@polymind/core/modules/workspace';
import { gqlFetcherFactory } from '@polymind/graphql';
import { useI18n } from '@polymind/i18n';
import type { DocMode } from '@blockmind/polymind/model';
import { ZipTransformer } from '@blockmind/polymind/widgets/linked-doc';
import {
  effect,
  fromPromise,
  onStart,
  throwIfAborted,
  useService,
  useServices,
} from '@toeverything/infra';
import { useSetAtom } from 'jotai';
import { useEffect, useMemo } from 'react';
import { catchError, EMPTY, finalize, switchMap, tap, timeout } from 'rxjs';

const localGql = gqlFetcherFactory('/graphql', (input, init) =>
  globalThis.fetch(input, { ...init, credentials: 'include' })
);

function localEventSource(
  url: string,
  eventSourceInitDict?: EventSourceInit
): EventSource {
  const fullUrl = url.startsWith('http')
    ? url
    : `${location.origin}${url.startsWith('/') ? '' : '/'}${url}`;
  return new EventSource(fullUrl, eventSourceInitDict);
}

/**
 * @deprecated just for legacy code, will be removed in the future
 */
export const WorkspaceSideEffects = () => {
  const t = useI18n();
  const pushGlobalLoadingEvent = useSetAtom(pushGlobalLoadingEventAtom);
  const resolveGlobalLoadingEvent = useSetAtom(resolveGlobalLoadingEventAtom);
  const { workspaceService, docsService } = useServices({
    WorkspaceService,
    DocsService,
    EditorSettingService,
  });
  const currentWorkspace = workspaceService.workspace;
  const docsList = docsService.list;

  const workbench = useService(WorkbenchService).workbench;
  useEffect(() => {
    const insertTemplate = effect(
      switchMap(({ template, mode }: { template: string; mode: string }) => {
        return fromPromise(async abort => {
          const templateZip = await fetch(template, { signal: abort });
          const templateBlob = await templateZip.blob();
          throwIfAborted(abort);
          const [doc] = await ZipTransformer.importDocs(
            currentWorkspace.docCollection,
            getPolyMindWorkspaceSchema(),
            templateBlob
          );
          if (doc) {
            doc.resetHistory();
          }

          return { doc, mode };
        }).pipe(
          timeout(10000 /* 10s */),
          tap(({ mode, doc }) => {
            if (doc) {
              docsList.setPrimaryMode(doc.id, mode as DocMode);
              workbench.openDoc(doc.id);
            }
          }),
          onStart(() => {
            pushGlobalLoadingEvent({
              key: 'insert-template',
            });
          }),
          catchError(err => {
            console.error(err);
            toast(t['com.polymind.ai.template-insert.failed']());
            return EMPTY;
          }),
          finalize(() => {
            resolveGlobalLoadingEvent('insert-template');
          })
        );
      })
    );

    const disposable = AIProvider.slots.requestInsertTemplate.subscribe(
      ({ template, mode }) => {
        insertTemplate({ template, mode });
      }
    );

    return () => {
      disposable.unsubscribe();
      insertTemplate.unsubscribe();
    };
  }, [
    currentWorkspace.docCollection,
    docsList,
    pushGlobalLoadingEvent,
    resolveGlobalLoadingEvent,
    t,
    workbench,
  ]);

  const workspaceDialogService = useService(WorkspaceDialogService);
  const globalDialogService = useService(GlobalDialogService);

  useEffect(() => {
    const disposable = AIProvider.slots.requestUpgradePlan.subscribe(() => {
      workspaceDialogService.open('setting', {
        activeTab: 'billing',
      });
    });
    return () => {
      disposable.unsubscribe();
    };
  }, [workspaceDialogService]);

  const copilotClient = useMemo(
    () => new CopilotClient(localGql, localEventSource),
    []
  );

  useEffect(() => {
    fetch('/api/local/auth', { method: 'GET', credentials: 'include' }).catch(
      () => {}
    );
  }, []);

  useEffect(() => {
    const dispose = setupAIProvider(copilotClient, globalDialogService);
    return () => {
      dispose();
    };
  }, [copilotClient, globalDialogService]);

  useRegisterWorkspaceCommands();
  useRegisterNavigationCommands();
  useRegisterFindInPageCommands();

  return (
    <>
      <QuickSearchContainer />
      <OverCapacityNotification />
    </>
  );
};
