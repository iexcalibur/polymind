import { useI18n } from '@polymind/i18n';

import { RenameSubMenu, type RenameSubMenuProps } from '../../../rename';

export const DocRenameSubMenu = ({
  title,
  text,
  ...props
}: RenameSubMenuProps) => {
  const t = useI18n();
  return (
    <RenameSubMenu
      title={title || t['com.polymind.m.explorer.doc.rename']()}
      text={text || t['com.polymind.m.explorer.doc.rename']()}
      {...props}
    />
  );
};
