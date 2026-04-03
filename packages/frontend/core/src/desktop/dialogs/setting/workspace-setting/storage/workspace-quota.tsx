import { SettingRow } from '@polymind/component/setting-components';
import { useI18n } from '@polymind/i18n';

export const WorkspaceQuotaPanel = () => {
  const t = useI18n();

  return (
    <SettingRow
      name={t['com.polymind.workspace.storage']()}
      desc=""
      spreadCol={false}
    >
      <StorageProgress />
    </SettingRow>
  );
};

export const StorageProgress = () => {
  return (
    <div>
      <span>Local storage</span>
    </div>
  );
};
