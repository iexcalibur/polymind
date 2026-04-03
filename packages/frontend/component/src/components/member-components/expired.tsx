import { useI18n } from '@polymind/i18n';

import { Button } from '../../ui/button';
import { AuthPageContainer } from '../auth-components';

export const ExpiredPage = ({ onOpenAffine }: { onOpenAffine: () => void }) => {
  const t = useI18n();
  return (
    <AuthPageContainer
      title={t['com.polymind.expired.page.title']()}
      subtitle={t['com.polymind.expired.page.new-subtitle']()}
    >
      <Button variant="primary" size="large" onClick={onOpenAffine}>
        {t['com.polymind.auth.open.affine']()}
      </Button>
    </AuthPageContainer>
  );
};
