import {
  DomElementRendererExtension,
  type DomRenderer,
} from '@blocksuite/polymind-block-surface';
import type { HighlighterElementModel } from '@blocksuite/polymind-model';
import { DefaultTheme } from '@blocksuite/polymind-model';

import { renderBrushLikeDom } from './shared';

export const HighlighterDomRendererExtension = DomElementRendererExtension(
  'highlighter',
  (
    model: HighlighterElementModel,
    domElement: HTMLElement,
    renderer: DomRenderer
  ) => {
    renderBrushLikeDom({
      model,
      domElement,
      renderer,
      color: renderer.getColorValue(
        model.color,
        DefaultTheme.hightlighterColor,
        true
      ),
    });
  }
);
