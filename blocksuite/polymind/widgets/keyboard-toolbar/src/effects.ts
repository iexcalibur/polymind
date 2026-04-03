import {
  AFFINE_KEYBOARD_TOOLBAR_WIDGET,
  PolymindKeyboardToolbarWidget,
} from './index.js';
import {
  AFFINE_KEYBOARD_TOOL_PANEL,
  PolymindKeyboardToolPanel,
} from './keyboard-tool-panel.js';
import {
  AFFINE_KEYBOARD_TOOLBAR,
  PolymindKeyboardToolbar,
} from './keyboard-toolbar.js';

export function effects() {
  customElements.define(
    AFFINE_KEYBOARD_TOOLBAR_WIDGET,
    PolymindKeyboardToolbarWidget
  );
  customElements.define(AFFINE_KEYBOARD_TOOLBAR, PolymindKeyboardToolbar);
  customElements.define(AFFINE_KEYBOARD_TOOL_PANEL, PolymindKeyboardToolPanel);
}

declare global {
  interface HTMLElementTagNameMap {
    [AFFINE_KEYBOARD_TOOLBAR]: PolymindKeyboardToolbar;
    [AFFINE_KEYBOARD_TOOL_PANEL]: PolymindKeyboardToolPanel;
  }
}
