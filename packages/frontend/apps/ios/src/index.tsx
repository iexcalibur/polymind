import './setup';
import '@polymind/component/theme';
import '@polymind/core/mobile/styles/mobile.css';

import { bindNativeDBApis } from '@polymind/nbstore/sqlite';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';
import { NbStoreNativeDBApis } from './plugins/nbstore';

bindNativeDBApis(NbStoreNativeDBApis);

function mountApp() {
  // oxlint-disable-next-line @typescript-eslint/no-non-null-assertion
  const root = document.getElementById('app')!;
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

try {
  mountApp();
} catch (err) {
  console.error('Failed to bootstrap app', err);
}
