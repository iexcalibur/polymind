import { Menu, MenuSeparator } from '@polymind/component';
import { MenuItem as SidebarMenuItem } from '@polymind/core/modules/app-sidebar/views';
import {
  TemplateListMenuAdd,
  TemplateListMenuContentScrollable,
} from '@polymind/core/modules/template-doc/view/template-list-menu';
import { useI18n } from '@polymind/i18n';
import { TemplateIcon } from '@blocksuite/icons/rc';
import { useCallback, useState } from 'react';

export const TemplateDocEntrance = () => {
  const t = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev);
  }, []);

  const onMenuOpenChange = useCallback((open: boolean) => {
    setMenuOpen(open);
  }, []);

  return (
    <SidebarMenuItem
      data-testid="sidebar-template-doc-entrance"
      icon={<TemplateIcon />}
      onClick={toggleMenu}
    >
      <Menu
        rootOptions={{ open: menuOpen, onOpenChange: onMenuOpenChange }}
        contentOptions={{
          side: 'right',
          align: 'end',
          alignOffset: -4,
          sideOffset: 16,
          style: { width: 280 },
        }}
        items={
          <TemplateListMenuContentScrollable
            asLink
            suffixItems={
              <>
                <MenuSeparator />
                <TemplateListMenuAdd />
              </>
            }
          />
        }
      >
        <span>{t['Template']()}</span>
      </Menu>
    </SidebarMenuItem>
  );
};
