import { EdgelessClipboardConfig } from '@blocksuite/polymind-block-surface';
import { ReferenceInfoSchema } from '@blocksuite/polymind-model';
import { type BlockSnapshot } from '@blocksuite/store';

export class EdgelessClipboardEmbedLinkedDocConfig extends EdgelessClipboardConfig {
  static override readonly key = 'polymind:embed-linked-doc';

  override createBlock(linkedDocEmbed: BlockSnapshot): string | null {
    if (!this.surface) return null;

    const { xywh, style, caption, pageId, params, title, description } =
      linkedDocEmbed.props;
    const referenceInfo = ReferenceInfoSchema.parse({
      pageId,
      params,
      title,
      description,
    });

    return this.crud.addBlock(
      'polymind:embed-linked-doc',
      {
        xywh,
        style,
        caption,
        ...referenceInfo,
      },
      this.surface.model.id
    );
  }
}
