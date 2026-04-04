import { ViewExtensionManager } from '@blockmind/polymind/ext-loader';
import { getInternalViewExtensions } from '@blockmind/polymind/extensions/view';
import { BlockViewIdentifier } from '@blockmind/polymind/std';
import type { ExtensionType } from '@blockmind/polymind/store';
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
