import {
  type ViewExtensionContext,
  ViewExtensionProvider,
} from '@blocksuite/polymind-ext-loader';
import { SlashMenuConfigExtension } from '@blocksuite/polymind-widget-slash-menu';
import { BlockViewExtension, FlavourExtension } from '@blocksuite/std';
import { literal } from 'lit/static-html.js';

import { CalloutKeymapExtension } from './callout-keymap';
import { calloutSlashMenuConfig } from './configs/slash-menu';
import { createBuiltinToolbarConfigExtension } from './configs/toolbar';
import { effects } from './effects';

export class CalloutViewExtension extends ViewExtensionProvider {
  override name = 'affine-callout-block';

  override effect() {
    super.effect();
    effects();
  }

  override setup(context: ViewExtensionContext) {
    super.setup(context);
    context.register([
      FlavourExtension('polymind:callout'),
      BlockViewExtension('polymind:callout', literal`affine-callout`),
      CalloutKeymapExtension,
      SlashMenuConfigExtension('polymind:callout', calloutSlashMenuConfig),
      ...createBuiltinToolbarConfigExtension('polymind:callout'),
    ]);
  }
}
