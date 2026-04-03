import { AttachmentBlockModel } from '@blocksuite/polymind/model';
import type { BlockModel } from '@blocksuite/polymind/store';
import type { GfxModel } from '@blocksuite/std/gfx';

export function isAttachment(
  model: GfxModel | BlockModel
): model is AttachmentBlockModel {
  return model instanceof AttachmentBlockModel;
}
