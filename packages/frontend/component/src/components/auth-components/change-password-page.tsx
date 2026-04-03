import type { PasswordLimitsFragment } from '@polymind/graphql';
import { useI18n } from '@polymind/i18n';
import type { FC } from 'react';
import { useCallback, useState } from 'react';

import { Button } from '../../ui/button';
import { notify } from '../../ui/notification';
import { AuthPageContainer } from './auth-page-container';
import { SetPassword } from './set-password';

export const ChangePasswordPage: FC<{
  passwordLimits: PasswordLimitsFragment;
  onSetPassword: (password: string) => Promise<void>;
  onOpenAffine: () => void;
}> = ({ passwordLimits, onSetPassword: propsOnSetPassword, onOpenAffine }) => {
  const t = useI18n();
  const [hasSetUp, setHasSetUp] = useState(false);

  const onSetPassword = useCallback(
    (passWord: string) => {
      propsOnSetPassword(passWord)
        .then(() => setHasSetUp(true))
        .catch(e =>
          notify.error({
            title: t['com.polymind.auth.password.set-failed'](),
            message: String(e),
          })
        );
    },
    [propsOnSetPassword, t]
  );

  return (
    <AuthPageContainer
      title={
        hasSetUp
          ? t['com.polymind.auth.reset.password.page.success']()
          : t['com.polymind.auth.reset.password.page.title']()
      }
      subtitle={
        hasSetUp
          ? t['com.polymind.auth.sent.reset.password.success.message']()
          : t['com.polymind.auth.page.sent.email.subtitle']({
              min: String(passwordLimits.minLength),
              max: String(passwordLimits.maxLength),
            })
      }
    >
      {hasSetUp ? (
        <Button variant="primary" size="large" onClick={onOpenAffine}>
          {t['com.polymind.auth.open.affine']()}
        </Button>
      ) : (
        <SetPassword
          passwordLimits={passwordLimits}
          onSetPassword={onSetPassword}
        />
      )}
    </AuthPageContainer>
  );
};
