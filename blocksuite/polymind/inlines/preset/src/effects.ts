import { PolymindText } from './nodes/affine-text';

export function effects() {
  customElements.define('affine-text', PolymindText);
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-text': PolymindText;
  }
}
