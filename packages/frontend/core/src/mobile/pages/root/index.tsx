import { NotificationCenter } from '@polymind/component';
import { Outlet } from 'react-router-dom';

import { GlobalDialogs } from '../../dialogs';

export const RootWrapper = () => {
  return (
    <>
      <GlobalDialogs />
      <NotificationCenter />
      <Outlet />
    </>
  );
};
