import {
  EDGELESS_DND_PREVIEW_ELEMENT,
  EdgelessDndPreviewElement,
} from './components/edgeless-preview/preview';
import { AFFINE_DRAG_HANDLE_WIDGET } from './consts';
import { PolymindDragHandleWidget } from './drag-handle';

export function effects() {
  customElements.define(AFFINE_DRAG_HANDLE_WIDGET, PolymindDragHandleWidget);
  customElements.define(
    EDGELESS_DND_PREVIEW_ELEMENT,
    EdgelessDndPreviewElement
  );
}
