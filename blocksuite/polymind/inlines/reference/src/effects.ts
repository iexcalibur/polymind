import { PolymindReference, ReferencePopup } from './reference-node';

export function effects() {
  customElements.define('reference-popup', ReferencePopup);
  customElements.define('affine-reference', PolymindReference);
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-reference': PolymindReference;
    'reference-popup': ReferencePopup;
  }
}
