import {
  NoPermissionOrNotFound,
  NotFoundPage,
} from '@affine/component/not-found-page';
import { DesktopApiService } from '@affine/core/modules/desktop-api';
import { useServiceOptional } from '@toeverything/infra';
import type { ReactElement } from 'react';
import { useCallback, useEffect } from 'react';

import {
  RouteLogic,
  useNavigateHelper,
} from '../../../components/hooks/use-navigate-helper';

/**
 * only for web, should not be used in electron
 * ServersService and SignIn have been removed.
 */
export const PageNotFound = ({
  noPermission,
}: {
  noPermission?: boolean;
}): ReactElement => {
  const desktopApi = useServiceOptional(DesktopApiService);

  const { jumpToIndex } = useNavigateHelper();

  const handleBackButtonClick = useCallback(
    () => jumpToIndex(RouteLogic.REPLACE),
    [jumpToIndex]
  );

  useEffect(() => {
    desktopApi?.handler.ui.pingAppLayoutReady().catch(console.error);
  }, [desktopApi]);

  return noPermission ? (
    <NoPermissionOrNotFound
      user={null}
      onBack={handleBackButtonClick}
      onSignOut={() => {}}
      signInComponent={null}
    />
  ) : (
    <NotFoundPage
      user={null}
      onBack={handleBackButtonClick}
      onSignOut={() => {}}
    />
  );
};

export const Component = () => {
  return <PageNotFound />;
};
