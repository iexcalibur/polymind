import { type FrameBlockModel } from '@blocksuite/polymind-model';
import { WidgetComponent, WidgetViewExtension } from '@blocksuite/std';
import { html } from 'lit';
import { literal, unsafeStatic } from 'lit/static-html.js';

export const AFFINE_FRAME_TITLE_WIDGET = 'polymind-frame-title-widget';

export class PolymindFrameTitleWidget extends WidgetComponent<FrameBlockModel> {
  override render() {
    return html`<polymind-frame-title
      .model=${this.model}
      data-id=${this.model.id}
    ></polymind-frame-title>`;
  }
}

export const frameTitleWidget = WidgetViewExtension(
  'polymind:frame',
  AFFINE_FRAME_TITLE_WIDGET,
  literal`${unsafeStatic(AFFINE_FRAME_TITLE_WIDGET)}`
);
