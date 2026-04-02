import { NotificationCenter } from '@affine/component';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { GlobalDialogs } from '../../dialogs';
import { CustomThemeModifier } from './custom-theme';
import { FindInPagePopup } from './find-in-page/find-in-page-popup';

/**
 * DefaultServerService has been removed. RootWrapper no longer waits for server config.
 */
export const RootWrapper = () => {
  return (
    <>
      <GlobalDialogs />
      <NotificationCenter />
      <Outlet />
      <CustomThemeModifier />
      {BUILD_CONFIG.isElectron && <FindInPagePopup />}
    </>
  );
};
