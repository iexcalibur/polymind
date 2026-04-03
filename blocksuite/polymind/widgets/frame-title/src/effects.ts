import {
  AFFINE_FRAME_TITLE_WIDGET,
  PolymindFrameTitleWidget,
} from './affine-frame-title-widget.js';
import { EdgelessFrameTitleEditor } from './edgeless-frame-title-editor.js';
import { AFFINE_FRAME_TITLE, PolymindFrameTitle } from './frame-title.js';

export function effects() {
  customElements.define(AFFINE_FRAME_TITLE_WIDGET, PolymindFrameTitleWidget);
  customElements.define(AFFINE_FRAME_TITLE, PolymindFrameTitle);
  customElements.define(
    'edgeless-frame-title-editor',
    EdgelessFrameTitleEditor
  );
}
