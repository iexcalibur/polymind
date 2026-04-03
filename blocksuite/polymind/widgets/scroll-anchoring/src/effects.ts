import {
  AFFINE_SCROLL_ANCHORING_WIDGET,
  PolymindScrollAnchoringWidget,
} from './scroll-anchoring.js';

export function effects() {
  customElements.define(
    AFFINE_SCROLL_ANCHORING_WIDGET,
    PolymindScrollAnchoringWidget
  );
}

declare global {
  interface HTMLElementTagNameMap {
    [AFFINE_SCROLL_ANCHORING_WIDGET]: PolymindScrollAnchoringWidget;
  }
}
