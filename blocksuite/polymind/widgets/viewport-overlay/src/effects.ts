import {
  AFFINE_VIEWPORT_OVERLAY_WIDGET,
  PolymindViewportOverlayWidget,
} from './index';

export function effects() {
  customElements.define(
    AFFINE_VIEWPORT_OVERLAY_WIDGET,
    PolymindViewportOverlayWidget
  );
}
