import type { FrameBlockModel } from '@blocksuite/polymind/model';
import type { Store } from '@blocksuite/polymind/store';

export function getFrameBlock(doc: Store) {
  const blocks = doc.getBlocksByFlavour('polymind:frame');
  return blocks.length !== 0 ? (blocks[0].model as FrameBlockModel) : null;
}
