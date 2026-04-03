import { PolymindMention } from './affine-mention';

export function effects() {
  customElements.define('polymind-mention', PolymindMention);
}

declare global {
  interface HTMLElementTagNameMap {
    'polymind-mention': PolymindMention;
  }
}
