import { useI18n } from '@polymind/i18n';
import type { FC } from 'react';

import { Button } from '../../ui/button';
import { AuthPageContainer } from './auth-page-container';

export const SignInSuccessPage: FC<{
  onOpenPolymind: () => void;
}> = ({ onOpenPolymind }) => {
  const t = useI18n();
  return (
    <AuthPageContainer
      title={t['com.polymind.auth.signed.success.title']()}
      subtitle={t['com.polymind.auth.signed.success.subtitle']()}
    >
      <Button variant="primary" size="large" onClick={onOpenPolymind}>
        {t['com.polymind.auth.open.affine']()}
      </Button>
    </AuthPageContainer>
  );
};
