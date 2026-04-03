import {
  type ViewExtensionContext,
  ViewExtensionProvider,
} from '@blocksuite/polymind-ext-loader';
import { SlashMenuConfigExtension } from '@blocksuite/polymind-widget-slash-menu';
import { BlockViewExtension } from '@blocksuite/std';
import { literal } from 'lit/static-html.js';

import { latexSlashMenuConfig } from './configs/slash-menu';
import { effects } from './effects';

export class LatexViewExtension extends ViewExtensionProvider {
  override name = 'polymind-latex-block';

  override effect() {
    super.effect();
    effects();
  }

  override setup(context: ViewExtensionContext) {
    super.setup(context);
    context.register([
      BlockViewExtension('polymind:latex', literal`affine-latex`),
      SlashMenuConfigExtension('polymind:latex', latexSlashMenuConfig),
    ]);
  }
}
