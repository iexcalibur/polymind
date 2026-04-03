import { useI18n } from '@polymind/i18n';
import { useMemo } from 'react';

export const useNavConfig = () => {
  const t = useI18n();
  return useMemo(
    () => [
      {
        title: t['com.polymind.other-page.nav.official-website'](),
        path: 'https://affine.pro',
      },
      {
        title: t['com.polymind.other-page.nav.blog'](),
        path: 'https://affine.pro/blog',
      },
      {
        title: t['com.polymind.other-page.nav.contact-us'](),
        path: 'https://affine.pro/about-us',
      },
    ],
    [t]
  );
};
