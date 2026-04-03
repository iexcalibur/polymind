import { BlockViewExtension } from '@blocksuite/polymind/std';
import type { ExtensionType } from '@blocksuite/polymind/store';
import { literal } from 'lit/static-html.js';

export const AIChatBlockSpec: ExtensionType[] = [
  BlockViewExtension('polymind:embed-ai-chat', model => {
    const parent = model.store.getParent(model.id);

    if (parent?.flavour === 'polymind:surface') {
      return literal`affine-edgeless-ai-chat`;
    }

    return literal`affine-ai-chat`;
  }),
];
