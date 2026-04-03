import { getWorkerUrl } from '@polymind/env/worker';
import { CodeLayoutHandlerExtension } from '@blocksuite/polymind/blocks/code';
import { ImageLayoutHandlerExtension } from '@blocksuite/polymind/blocks/image';
import { ListLayoutHandlerExtension } from '@blocksuite/polymind/blocks/list';
import { NoteLayoutHandlerExtension } from '@blocksuite/polymind/blocks/note';
import { ParagraphLayoutHandlerExtension } from '@blocksuite/polymind/blocks/paragraph';
import {
  TurboRendererConfigFactory,
  ViewportTurboRendererExtension,
} from '@blocksuite/polymind/gfx/turbo-renderer';

function createPainterWorker() {
  const worker = new Worker(getWorkerUrl('turbo-painter'));
  return worker;
}

export const turboRendererExtension = [
  ParagraphLayoutHandlerExtension,
  ListLayoutHandlerExtension,
  NoteLayoutHandlerExtension,
  CodeLayoutHandlerExtension,
  ImageLayoutHandlerExtension,
  TurboRendererConfigFactory({
    options: {
      zoomThreshold: 1,
      debounceTime: 1000,
    },
    painterWorkerEntry: createPainterWorker,
  }),
  ViewportTurboRendererExtension,
];
