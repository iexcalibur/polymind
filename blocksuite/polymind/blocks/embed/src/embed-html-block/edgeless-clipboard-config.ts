import { EdgelessClipboardConfig } from '@blocksuite/polymind-block-surface';
import { type BlockSnapshot } from '@blocksuite/store';

export class EdgelessClipboardEmbedHtmlConfig extends EdgelessClipboardConfig {
  static override readonly key = 'polymind:embed-html';

  override createBlock(htmlEmbed: BlockSnapshot): string | null {
    if (!this.surface) return null;
    const { xywh, style, caption, html, design } = htmlEmbed.props;

    const embedHtmlId = this.crud.addBlock(
      'polymind:embed-html',
      {
        xywh,
        style,
        caption,
        html,
        design,
      },
      this.surface.model.id
    );
    return embedHtmlId;
  }
}
