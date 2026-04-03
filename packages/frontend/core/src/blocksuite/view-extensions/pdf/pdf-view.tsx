import type { ReactToLit } from '@polymind/component';
import { AttachmentEmbedPreview } from '@polymind/core/blocksuite/attachment-viewer/attachment-embed-preview';
import { AttachmentEmbedConfigIdentifier } from '@blocksuite/polymind/blocks/attachment';
import { Bound } from '@blocksuite/polymind/global/gfx';
import {
  EMBED_CARD_HEIGHT,
  EMBED_CARD_WIDTH,
} from '@blocksuite/polymind/shared/consts';
import type { ExtensionType } from '@blocksuite/polymind/store';

export function patchForPDFEmbedView(reactToLit: ReactToLit): ExtensionType {
  return {
    setup: di => {
      di.override(AttachmentEmbedConfigIdentifier('pdf'), () => ({
        name: 'pdf',
        shouldShowStatus: true,
        check: (model, maxFileSize) =>
          model.props.type === 'application/pdf' &&
          model.props.size <= maxFileSize,
        action: model => {
          const bound = Bound.deserialize(model.props.xywh);
          bound.w = EMBED_CARD_WIDTH.pdf;
          bound.h = EMBED_CARD_HEIGHT.pdf;
          model.store.updateBlock(model, {
            embed: true,
            style: 'pdf',
            xywh: bound.serialize(),
          });
        },
        render: (model, _) =>
          reactToLit(<AttachmentEmbedPreview model={model} />, true),
      }));
    },
  };
}
