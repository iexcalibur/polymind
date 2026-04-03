import { ViewExtensionManager } from '@blocksuite/polymind/ext-loader';
import { getInternalViewExtensions } from '@blocksuite/polymind/extensions/view';
import { BlockViewIdentifier } from '@blocksuite/polymind/std';
import type { ExtensionType } from '@blocksuite/polymind/store';
import { literal } from 'lit/static-html.js';

const manager = new ViewExtensionManager([...getInternalViewExtensions()]);
const customPageEditorBlockSpecs: ExtensionType[] = [
  ...manager.get('page'),
  {
    setup: di => {
      di.override(
        BlockViewIdentifier('polymind:page'),
        () => literal`affine-page-root`
      );
    },
  },
];

export const getCustomPageEditorBlockSpecs = () => {
  return customPageEditorBlockSpecs;
};
