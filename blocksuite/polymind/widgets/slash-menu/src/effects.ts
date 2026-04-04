import { AFFINE_SLASH_MENU_WIDGET } from './consts';
import { InnerSlashMenu, SlashMenu } from './slash-menu-popover';
import { PolymindSlashMenuWidget } from './widget';

export function effects() {
  customElements.define(AFFINE_SLASH_MENU_WIDGET, PolymindSlashMenuWidget);
  customElements.define('affine-slash-menu', SlashMenu);
  customElements.define('inner-slash-menu', InnerSlashMenu);
}

declare global {
  interface HTMLElementTagNameMap {
    [AFFINE_SLASH_MENU_WIDGET]: PolymindSlashMenuWidget;
  }
}
