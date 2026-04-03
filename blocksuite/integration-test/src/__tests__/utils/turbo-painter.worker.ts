import { ImageLayoutPainterExtension } from '@blocksuite/polymind-block-image/turbo-painter';
import { ListLayoutPainterExtension } from '@blocksuite/polymind-block-list/turbo-painter';
import { NoteLayoutPainterExtension } from '@blocksuite/polymind-block-note/turbo-painter';
import { ParagraphLayoutPainterExtension } from '@blocksuite/polymind-block-paragraph/turbo-painter';
import { ViewportLayoutPainter } from '@blocksuite/polymind-gfx-turbo-renderer/painter';

new ViewportLayoutPainter([
  ParagraphLayoutPainterExtension,
  ListLayoutPainterExtension,
  NoteLayoutPainterExtension,
  ImageLayoutPainterExtension,
]);
