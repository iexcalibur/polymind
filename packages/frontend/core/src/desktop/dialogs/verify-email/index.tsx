import type {
  DialogComponentProps,
  GLOBAL_DIALOG_SCHEMA,
} from '@affine/core/modules/dialogs';

/**
 * Cloud auth has been removed. This dialog is a no-op.
 */
export const VerifyEmailDialog = ({
  close: _close,
}: DialogComponentProps<GLOBAL_DIALOG_SCHEMA['verify-email']>) => {
  return null;
};
