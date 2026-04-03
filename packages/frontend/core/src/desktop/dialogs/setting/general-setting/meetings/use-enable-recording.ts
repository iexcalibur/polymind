import { useConfirmModal } from '@polymind/component';
import { useAsyncCallback } from '@polymind/core/components/hooks/affine-async-hooks';
import { MeetingSettingsService } from '@polymind/core/modules/media/services/meeting-settings';
import { useI18n } from '@polymind/i18n';
import { useService } from '@toeverything/infra';

export const useEnableRecording = () => {
  const meetingSettingsService = useService(MeetingSettingsService);
  const confirmModal = useConfirmModal();
  const t = useI18n();

  const handleEnabledChange = useAsyncCallback(
    async (checked: boolean) => {
      try {
        await meetingSettingsService.setEnabled(checked);
      } catch {
        confirmModal.openConfirmModal({
          title:
            t['com.polymind.settings.meetings.record.permission-modal.title'](),
          description:
            t[
              'com.polymind.settings.meetings.record.permission-modal.description'
            ](),
          onConfirm: async () => {
            await meetingSettingsService.showRecordingPermissionSetting(
              'screen'
            );
          },
          cancelText: t['com.polymind.recording.dismiss'](),
          confirmButtonOptions: {
            variant: 'primary',
          },
          confirmText:
            t[
              'com.polymind.settings.meetings.record.permission-modal.open-setting'
            ](),
        });
      }
    },
    [confirmModal, meetingSettingsService, t]
  );

  return handleEnabledChange;
};
