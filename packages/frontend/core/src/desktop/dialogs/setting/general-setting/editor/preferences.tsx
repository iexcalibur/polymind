import { Button } from '@polymind/component';
import {
  SettingRow,
  SettingWrapper,
} from '@polymind/component/setting-components';
import { useI18n } from '@polymind/i18n';

export const Preferences = () => {
  const t = useI18n();
  return (
    <SettingWrapper
      title={t['com.polymind.settings.editorSettings.preferences']()}
    >
      <SettingRow
        name={t[
          'com.polymind.settings.editorSettings.preferences.export.title'
        ]()}
        desc={t[
          'com.polymind.settings.editorSettings.preferences.export.description'
        ]()}
      >
        <Button>Export</Button>
      </SettingRow>
      <SettingRow
        name={t[
          'com.polymind.settings.editorSettings.preferences.import.title'
        ]()}
        desc={t[
          'com.polymind.settings.editorSettings.preferences.import.description'
        ]()}
      >
        <Button>Import</Button>
      </SettingRow>
    </SettingWrapper>
  );
};
