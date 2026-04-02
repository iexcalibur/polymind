import { NotificationCountService } from '@affine/core/modules/notification';
import { WorkbenchService } from '@affine/core/modules/workbench';
import {
  useLiveData,
  useService,
  useServiceOptional,
} from '@toeverything/infra';
import { useEffect } from 'react';

export const DocumentTitle = () => {
  const notificationCountService = useServiceOptional(NotificationCountService);
  const notificationCount = useLiveData(
    notificationCountService?.count$ ?? null
  );
  const workbenchService = useService(WorkbenchService);
  const workbenchView = useLiveData(workbenchService.workbench.activeView$);
  const viewTitle = useLiveData(workbenchView.title$);

  useEffect(() => {
    const prefix =
      notificationCount && notificationCount > 0
        ? `(${notificationCount}) `
        : '';
    document.title = prefix + (viewTitle ? `${viewTitle} · AFFiNE` : 'AFFiNE');

    return () => {
      document.title = 'AFFiNE';
    };
  }, [notificationCount, viewTitle]);

  return null;
};
