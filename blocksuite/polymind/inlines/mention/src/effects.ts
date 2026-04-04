import { PolymindMention } from './affine-mention';

export function effects() {
  customElements.define('affine-mention', PolymindMention);
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-mention': PolymindMention;
  }
}
