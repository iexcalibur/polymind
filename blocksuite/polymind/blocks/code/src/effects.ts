import { CodeBlockComponent } from './code-block';
import {
  AFFINE_CODE_TOOLBAR_WIDGET,
  PolymindCodeToolbarWidget,
} from './code-toolbar';
import { PolymindCodeToolbar } from './code-toolbar/components/code-toolbar';
import { LanguageListButton } from './code-toolbar/components/lang-button';
import { PreviewButton } from './code-toolbar/components/preview-button';
import { PolymindCodeUnit } from './highlight/affine-code-unit';

export function effects() {
  customElements.define('language-list-button', LanguageListButton);
  customElements.define('affine-code-toolbar', PolymindCodeToolbar);
  customElements.define(AFFINE_CODE_TOOLBAR_WIDGET, PolymindCodeToolbarWidget);
  customElements.define('affine-code-unit', PolymindCodeUnit);
  customElements.define('affine-code', CodeBlockComponent);
  customElements.define('preview-button', PreviewButton);
}

declare global {
  interface HTMLElementTagNameMap {
    'language-list-button': LanguageListButton;
    'affine-code-toolbar': PolymindCodeToolbar;
    'preview-button': PreviewButton;
    [AFFINE_CODE_TOOLBAR_WIDGET]: PolymindCodeToolbarWidget;
  }
}
