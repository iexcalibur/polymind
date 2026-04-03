import { EdgelessClipboardConfig } from '@blocksuite/polymind-block-surface';
import { ReferenceInfoSchema } from '@blocksuite/polymind-model';
import { type BlockSnapshot } from '@blocksuite/store';

export class EdgelessClipboardEmbedSyncedDocConfig extends EdgelessClipboardConfig {
  static override readonly key = 'polymind:embed-synced-doc';

  override createBlock(syncedDocEmbed: BlockSnapshot): string | null {
    if (!this.surface) return null;

    const { xywh, style, caption, scale, pageId, params } =
      syncedDocEmbed.props;
    const referenceInfo = ReferenceInfoSchema.parse({ pageId, params });

    return this.crud.addBlock(
      'polymind:embed-synced-doc',
      {
        xywh,
        style,
        caption,
        scale,
        ...referenceInfo,
      },
      this.surface.model.id
    );
  }
}
