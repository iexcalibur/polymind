import { WorkspacesService } from '@affine/core/modules/workspace';
import { createFirstAppData } from '@affine/core/utils/first-app-data';
import { useLiveData, useService } from '@toeverything/infra';
import { type ReactNode, useEffect, useLayoutEffect, useRef } from 'react';

import {
  RouteLogic,
  useNavigateHelper,
} from '../../../components/hooks/use-navigate-helper';
import { AppContainer } from '../../components/app-container';

/**
 * Index page — skips auth, goes straight to workspace.
 * Creates a local workspace if none exists.
 */
export const Component = ({
  defaultIndexRoute = 'all',
  children,
}: {
  defaultIndexRoute?: string;
  children?: ReactNode;
  fallback?: ReactNode;
}) => {
  const workspacesService = useService(WorkspacesService);
  const list = useLiveData(workspacesService.list.workspaces$);
  const listIsLoading = useLiveData(workspacesService.list.isRevalidating$);

  const { openPage, jumpToPage } = useNavigateHelper();
  const createOnceRef = useRef(false);

  // If workspaces exist, open the last used one
  useLayoutEffect(() => {
    if (listIsLoading) return;
    if (list.length === 0) return;

    const lastId = localStorage.getItem('last_workspace_id');
    const openWorkspace = list.find(w => w.id === lastId) ?? list[0];
    openPage(openWorkspace.id, defaultIndexRoute, RouteLogic.REPLACE);
  }, [list, openPage, listIsLoading, defaultIndexRoute]);

  // If no workspaces, create one automatically
  useEffect(() => {
    if (listIsLoading || list.length > 0) return;
    if (createOnceRef.current) return;
    createOnceRef.current = true;

    createFirstAppData(workspacesService)
      .then(createdWorkspace => {
        if (createdWorkspace) {
          if (createdWorkspace.defaultPageId) {
            jumpToPage(
              createdWorkspace.meta.id,
              createdWorkspace.defaultPageId
            );
          } else {
            openPage(createdWorkspace.meta.id, 'all');
          }
        }
      })
      .catch(err => {
        console.error('Failed to create workspace', err);
      });
  }, [jumpToPage, openPage, workspacesService, listIsLoading, list]);

  return children ?? <AppContainer fallback />;
};
