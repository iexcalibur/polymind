import { AttachmentBlockModel } from '@blockmind/polymind/model';
import type { BlockModel } from '@blockmind/polymind/store';
import type { GfxModel } from '@blockmind/std/gfx';

export function isAttachment(
  model: GfxModel | BlockModel
): model is AttachmentBlockModel {
  return model instanceof AttachmentBlockModel;
}
