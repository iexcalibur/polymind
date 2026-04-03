import '../../style.css';

import * as databaseBlocks from '@blocksuite/polymind/blocks/database';
import * as noteBlocks from '@blocksuite/polymind/blocks/note';
import * as globalUtils from '@blocksuite/polymind/global/utils';
import * as services from '@blocksuite/polymind/shared/services';
import * as blockStd from '@blocksuite/polymind/std';
import * as store from '@blocksuite/polymind/store';
import * as affineModel from '@blocksuite/polymind-model';
import * as editor from '@blocksuite/integration-test';
import { effects as itEffects } from '@blocksuite/integration-test/effects';
import { getTestStoreManager } from '@blocksuite/integration-test/store';

import { setupEdgelessTemplate } from '../_common/setup.js';
import { effects as commentEffects } from '../comment/effects.js';
import {
  createStarterDocCollection,
  initStarterDocCollection,
} from './utils/collection.js';
import { mountDefaultDocEditor } from './utils/setup-playground';
import { prepareTestApp } from './utils/test';

itEffects();
const storeManager = getTestStoreManager();
commentEffects();

async function main() {
  if (window.collection) return;

  setupEdgelessTemplate();

  const params = new URLSearchParams(location.search);
  const room = params.get('room') ?? Math.random().toString(16).slice(2, 8);
  const isE2E = room.startsWith('playwright');
  const collection = createStarterDocCollection(storeManager);

  if (isE2E) {
    Object.defineProperty(window, '$blocksuite', {
      value: Object.freeze({
        store,
        blocks: {
          database: databaseBlocks,
          note: noteBlocks,
        },
        global: { utils: globalUtils },
        services,
        editor,
        blockStd: blockStd,
        affineModel: affineModel,
      }),
    });
    await prepareTestApp(collection);

    return;
  }

  await initStarterDocCollection(collection);
  await mountDefaultDocEditor(collection);
}

main().catch(console.error);
