import '@blocksuite/polymind/effects';

import { TestPolymindEditorContainer } from './editors/index.js';

export function effects() {
  customElements.define('affine-editor-container', TestPolymindEditorContainer);
}
