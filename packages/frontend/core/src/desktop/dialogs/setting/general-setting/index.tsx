import type { SettingTab } from '@polymind/core/modules/dialogs/constant';
import { FeatureFlagService } from '@polymind/core/modules/feature-flag';
import { MeetingSettingsService } from '@polymind/core/modules/media/services/meeting-settings';
import { useI18n } from '@polymind/i18n';
import {
  AiIcon,
  AppearanceIcon,
  ExperimentIcon,
  FolderIcon,
  InformationIcon,
  KeyboardIcon,
  MeetingIcon,
  PenIcon,
} from '@blocksuite/icons/rc';
import { useLiveData, useServices } from '@toeverything/infra';
import { useMemo } from 'react';

import type { SettingSidebarItem, SettingState } from '../types';
import { AboutAffine } from './about';
import { AISettings } from './ai';
import { AppearanceSettings } from './appearance';
import { BackupSettingPanel } from './backup';
import { EditorSettings } from './editor';
import { ExperimentalFeatures } from './experimental-features';
import { MeetingsSettings } from './meetings';
import { Shortcuts } from './shortcuts';

export type GeneralSettingList = SettingSidebarItem[];

export const useGeneralSettingList = (): GeneralSettingList => {
  const t = useI18n();
  const { featureFlagService, meetingSettingsService } = useServices({
    FeatureFlagService,
    MeetingSettingsService,
  });
  const enableEditorSettings = useLiveData(
    featureFlagService.flags.enable_editor_settings.$
  );

  const meetingSettings = useLiveData(meetingSettingsService.settings$);

  return useMemo(() => {
    const settings: GeneralSettingList = [
      {
        key: 'appearance',
        title: t['com.polymind.settings.appearance'](),
        icon: <AppearanceIcon />,
        testId: 'appearance-panel-trigger',
      },
      {
        key: 'shortcuts',
        title: t['com.polymind.keyboardShortcuts.title'](),
        icon: <KeyboardIcon />,
        testId: 'shortcuts-panel-trigger',
      },
      {
        key: 'ai',
        title: 'AI Settings',
        icon: <AiIcon />,
        testId: 'ai-panel-trigger',
      },
    ];

    if (enableEditorSettings) {
      // add editor settings to second position
      settings.splice(1, 0, {
        key: 'editor',
        title: t['com.polymind.settings.editorSettings'](),
        icon: <PenIcon />,
        testId: 'editor-panel-trigger',
      });
    }

    if (
      (environment.isMacOs || environment.isWindows) &&
      BUILD_CONFIG.isElectron
    ) {
      settings.push({
        key: 'meetings',
        title: t['com.polymind.settings.meetings'](),
        icon: <MeetingIcon />,
        testId: 'meetings-panel-trigger',
        beta: !meetingSettings?.enabled,
      });
    }

    if (BUILD_CONFIG.isElectron) {
      settings.push({
        key: 'backup',
        title: t['com.polymind.settings.workspace.backup'](),
        icon: <FolderIcon />,
        testId: 'backup-panel-trigger',
      });
    }

    settings.push(
      {
        key: 'experimental-features',
        title: t['com.polymind.settings.workspace.experimental-features'](),
        icon: <ExperimentIcon />,
        testId: 'experimental-features-trigger',
      },
      {
        key: 'about',
        title: 'About PolyMind',
        icon: <InformationIcon />,
        testId: 'about-panel-trigger',
      }
    );
    return settings;
  }, [t, enableEditorSettings, meetingSettings?.enabled]);
};

interface GeneralSettingProps {
  activeTab: SettingTab;
  onChangeSettingState: (settingState: SettingState) => void;
}

export const GeneralSetting = ({
  activeTab,
  onChangeSettingState,
}: GeneralSettingProps) => {
  switch (activeTab) {
    case 'shortcuts':
      return <Shortcuts />;
    case 'editor':
      return <EditorSettings />;
    case 'appearance':
      return <AppearanceSettings />;
    case 'meetings':
      return <MeetingsSettings />;
    case 'about':
      return <AboutAffine />;
    case 'experimental-features':
      return <ExperimentalFeatures />;
    case 'backup':
      return <BackupSettingPanel />;
    case 'ai':
      return <AISettings />;
    default:
      return null;
  }
};
