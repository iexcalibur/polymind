import { AFFINE_TOOLBAR_WIDGET, PolymindToolbarWidget } from './toolbar';

export function effects() {
  customElements.define(AFFINE_TOOLBAR_WIDGET, PolymindToolbarWidget);
}

declare global {
  interface HTMLElementTagNameMap {
    [AFFINE_TOOLBAR_WIDGET]: PolymindToolbarWidget;
  }
}
