import type {
  DialogComponentProps,
  WORKSPACE_DIALOG_SCHEMA,
} from '@polymind/core/modules/dialogs';
import { useI18n } from '@polymind/i18n';

import { AppearanceGroup } from './appearance';
import { ExperimentalFeatureSetting } from './experimental';
import { OthersGroup } from './others';
import * as styles from './style.css';
import { SwipeDialog } from './swipe-dialog';

const MobileSetting = () => {
  return (
    <div className={styles.root}>
      <AppearanceGroup />
      <ExperimentalFeatureSetting />
      <OthersGroup />
    </div>
  );
};

export const SettingDialog = ({
  close,
}: DialogComponentProps<WORKSPACE_DIALOG_SCHEMA['setting']>) => {
  const t = useI18n();

  return (
    <SwipeDialog
      title={t['com.polymind.mobile.setting.header-title']()}
      open
      onOpenChange={() => close()}
    >
      <MobileSetting />
    </SwipeDialog>
  );
};
