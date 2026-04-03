import { CodeLayoutPainterExtension } from '@blocksuite/polymind/blocks/code';
import { ImageLayoutPainterExtension } from '@blocksuite/polymind/blocks/image';
import { ListLayoutPainterExtension } from '@blocksuite/polymind/blocks/list';
import { NoteLayoutPainterExtension } from '@blocksuite/polymind/blocks/note';
import { ParagraphLayoutPainterExtension } from '@blocksuite/polymind/blocks/paragraph';
import { ViewportLayoutPainter } from '@blocksuite/polymind/gfx/turbo-renderer';

new ViewportLayoutPainter([
  ParagraphLayoutPainterExtension,
  ListLayoutPainterExtension,
  NoteLayoutPainterExtension,
  CodeLayoutPainterExtension,
  ImageLayoutPainterExtension,
]);
