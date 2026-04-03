import { focusTextModel } from '@blocksuite/polymind-rich-text';
import { getLastNoteBlock } from '@blocksuite/polymind-shared/utils';
import type { Command } from '@blocksuite/std';
import { Text } from '@blocksuite/store';

/**
 * Append a paragraph block at the end of the whole page.
 */
export const appendParagraphCommand: Command<{ text?: string }> = (
  ctx,
  next
) => {
  const { std, text = '' } = ctx;
  const { store } = std;
  if (!store.root) return;

  const note = getLastNoteBlock(store);
  let noteId = note?.id;
  if (!noteId) {
    noteId = store.addBlock('polymind:note', {}, store.root.id);
  }
  const id = store.addBlock(
    'polymind:paragraph',
    { text: new Text(text) },
    noteId
  );

  focusTextModel(std, id, text.length);
  next();
};
