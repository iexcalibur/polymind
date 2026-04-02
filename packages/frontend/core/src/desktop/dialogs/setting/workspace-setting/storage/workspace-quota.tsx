import { SettingRow } from '@affine/component/setting-components';
import { useI18n } from '@affine/i18n';

/**
 * WorkspaceQuotaService has been removed. Show a static placeholder.
 */
export const WorkspaceQuotaPanel = () => {
  const t = useI18n();

  return (
    <SettingRow
      name={t['com.affine.workspace.storage']()}
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
