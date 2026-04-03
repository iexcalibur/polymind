import { PolymindText } from './nodes/affine-text';

export function effects() {
  customElements.define('polymind-text', PolymindText);
}

declare global {
  interface HTMLElementTagNameMap {
    'polymind-text': PolymindText;
  }
}
