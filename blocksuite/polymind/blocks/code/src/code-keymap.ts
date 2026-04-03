import { textKeymap } from '@blocksuite/polymind-inline-preset';
import { CodeBlockSchema } from '@blocksuite/polymind-model';
import { KeymapExtension } from '@blocksuite/std';

export const CodeKeymapExtension = KeymapExtension(textKeymap, {
  flavour: CodeBlockSchema.model.flavour,
});
