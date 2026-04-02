import { DesktopApiService } from '@affine/core/modules/desktop-api';
import { WorkspacesService } from '@affine/core/modules/workspace';
import { buildShowcaseWorkspace } from '@affine/core/utils/first-app-data';
import { DEFAULT_WORKSPACE_NAME } from '@affine/env/constant';
import {
  useLiveData,
  useService,
  useServiceOptional,
} from '@toeverything/infra';
import {
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import {
  RouteLogic,
  useNavigateHelper,
} from '../../../components/hooks/use-navigate-helper';
import { AppContainer } from '../../components/app-container';

/**
 * index page — always start fresh with a local workspace, no cloud.
 */
export const Component = ({
  defaultIndexRoute = 'all',
  fallback,
}: {
  defaultIndexRoute?: string;
  children?: ReactNode;
  fallback?: ReactNode;
}) => {
  const workspacesService = useService(WorkspacesService);
  const list = useLiveData(workspacesService.list.workspaces$);
  const listIsLoading = useLiveData(workspacesService.list.isRevalidating$);

  const { openPage, jumpToPage } = useNavigateHelper();

  // Always clear last workspace id — we always start fresh with local only
  useLayoutEffect(() => {
    localStorage.removeItem('last_workspace_id');
  }, []);

  const creatingRef = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (listIsLoading) {
      return;
    }

    // Filter to local workspaces only
    const localList = list.filter((w: any) => w.flavour === 'local');

    if (localList.length > 0) {
      // Open the first local workspace
      openPage(localList[0].id, defaultIndexRoute, RouteLogic.REPLACE);
      return;
    }

    // No local workspaces — create one (always, regardless of is-first-open flag)
    if (creatingRef.current) return;
    creatingRef.current = true;

    buildShowcaseWorkspace(workspacesService, 'local', DEFAULT_WORKSPACE_NAME)
      .then(({ meta, defaultDocId }) => {
        if (defaultDocId) {
          jumpToPage(meta.id, defaultDocId);
        } else {
          openPage(meta.id, 'all');
        }
      })
      .catch(err => {
        console.error('Failed to create local workspace', err);
        setReady(true); // show fallback UI on error
      });
  }, [
    list,
    openPage,
    jumpToPage,
    listIsLoading,
    defaultIndexRoute,
    workspacesService,
  ]);

  const desktopApi = useServiceOptional(DesktopApiService);

  useEffect(() => {
    desktopApi?.handler.ui.pingAppLayoutReady().catch(console.error);
  }, [desktopApi]);

  if (!ready) {
    return fallback ?? <AppContainer fallback />;
  }

  return fallback ?? <AppContainer fallback />;
};
