import type * as Effect from '@blocksuite/polymind/effects';
import type { EditorHost } from '@blocksuite/polymind/std';
import type { Store, Transformer, Workspace } from '@blocksuite/polymind/store';
import type { TestPolymindEditorContainer } from '@blocksuite/integration-test';

declare type _GLOBAL_ = typeof Effect;

declare global {
  interface Window {
    /** Available on playground window
     * the following instance are initialized in `packages/playground/apps/starter/main.ts`
     */
    $blocksuite: {
      store: typeof import('@blocksuite/polymind/store');
      blocks: {
        database: typeof import('@blocksuite/polymind/blocks/database');
        note: typeof import('@blocksuite/polymind/blocks/note');
      };
      global: {
        utils: typeof import('@blocksuite/polymind/global/utils');
      };
      services: typeof import('@blocksuite/polymind/shared/services');
      editor: typeof import('@blocksuite/integration-test');
      blockStd: typeof import('@blocksuite/polymind/std');
      affineModel: typeof import('@blocksuite/polymind-model');
    };
    collection: Workspace;
    doc: Store;
    editor: TestPolymindEditorContainer;
    host: EditorHost;
    job: Transformer;
  }
}
