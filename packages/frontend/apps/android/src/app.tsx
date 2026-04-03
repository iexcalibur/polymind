import { getStoreManager } from '@polymind/core/blocksuite/manager/store';
import { AffineContext } from '@polymind/core/components/context';
import { AppFallback } from '@polymind/core/mobile/components/app-fallback';
import { configureMobileModules } from '@polymind/core/mobile/modules';
import { VirtualKeyboardProvider } from '@polymind/core/mobile/modules/virtual-keyboard';
import { router } from '@polymind/core/mobile/router';
import { configureCommonModules } from '@polymind/core/modules';
import { AIButtonProvider } from '@polymind/core/modules/ai-button';
import { registerNativePreviewHandlers } from '@polymind/core/modules/code-block-preview-renderer';
import { DocsService } from '@polymind/core/modules/doc';
import { GlobalContextService } from '@polymind/core/modules/global-context';
import { I18nProvider } from '@polymind/core/modules/i18n';
import { LifecycleService } from '@polymind/core/modules/lifecycle';
import {
  configureLocalStorageStateStorageImpls,
  NbstoreProvider,
} from '@polymind/core/modules/storage';
import { PopupWindowProvider } from '@polymind/core/modules/url';
import { ClientSchemeProvider } from '@polymind/core/modules/url/providers/client-schema';
import { configureBrowserWorkbenchModule } from '@polymind/core/modules/workbench';
import { WorkspacesService } from '@polymind/core/modules/workspace';
import { configureBrowserWorkspaceFlavours } from '@polymind/core/modules/workspace-engine';
import { getWorkerUrl } from '@polymind/env/worker';
import { I18n } from '@polymind/i18n';
import { StoreManagerClient } from '@polymind/nbstore/worker/client';
import { Container } from '@blocksuite/affine/global/di';
import {
  docLinkBaseURLMiddleware,
  MarkdownAdapter,
  titleMiddleware,
} from '@blocksuite/affine/shared/adapters';
import { App as CapacitorApp } from '@capacitor/app';
import { Keyboard } from '@capacitor/keyboard';
import { StatusBar, Style } from '@capacitor/status-bar';
import { InAppBrowser } from '@capgo/inappbrowser';
import { Framework, FrameworkRoot, getCurrentStore } from '@toeverything/infra';
import { OpClient } from '@toeverything/infra/op';
import { AsyncCall } from 'async-call-rpc';
import { useTheme } from 'next-themes';
import { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { AffineTheme } from './plugins/affine-theme';
import { AIButton } from './plugins/ai-button';
import { NbStoreNativeDBApis } from './plugins/nbstore';
import { Preview } from './plugins/preview';

const storeManagerClient = createStoreManagerClient();
window.addEventListener('beforeunload', () => {
  storeManagerClient.dispose();
});

const future = {
  v7_startTransition: true,
} as const;

const framework = new Framework();
configureCommonModules(framework);
configureBrowserWorkbenchModule(framework);
configureLocalStorageStateStorageImpls(framework);
configureBrowserWorkspaceFlavours(framework);
configureMobileModules(framework);
framework.impl(NbstoreProvider, {
  openStore(key, options) {
    const { store, dispose } = storeManagerClient.open(key, options);
    return {
      store,
      dispose: () => {
        dispose();
      },
    };
  },
});
const frameworkProvider = framework.provider();

registerNativePreviewHandlers({
  renderMermaidSvg: request => Preview.renderMermaidSvg(request),
  renderTypstSvg: request => Preview.renderTypstSvg(request),
});

framework.impl(PopupWindowProvider, {
  open: (url: string) => {
    InAppBrowser.open({
      url: url,
    }).catch(console.error);
  },
});

framework.impl(ClientSchemeProvider, {
  getClientScheme() {
    return 'affine';
  },
});

framework.impl(VirtualKeyboardProvider, {
  show: () => {
    Keyboard.show().catch(console.error);
  },
  hide: () => {
    // In some cases, the keyboard will show again. for example, it will show again
    // when this function is called in click event of button. It may be a bug of
    // android webview or capacitor.
    setTimeout(() => {
      Keyboard.hide().catch(console.error);
    });
  },
  onChange: callback => {
    let disposeRef = {
      dispose: () => {},
    };

    Promise.all([
      Keyboard.addListener('keyboardWillShow', info => {
        (async () => {
          const navBarHeight = (await AffineTheme.getSystemNavBarHeight())
            .height;
          callback({
            // When an physical keyboard is connected, the virtual keyboard height is 0,
            // even though the `keyboardWillShow` event is still triggered.
            visible: info.keyboardHeight !== 0,
            height: info.keyboardHeight - navBarHeight,
          });
        })().catch(console.error);
      }),
      Keyboard.addListener('keyboardWillHide', () => {
        callback({
          visible: false,
          height: 0,
        });
      }),
    ])
      .then(handlers => {
        disposeRef.dispose = () => {
          Promise.all(handlers.map(handler => handler.remove())).catch(
            console.error
          );
        };
      })
      .catch(console.error);

    return () => {
      disposeRef.dispose();
    };
  },
});

framework.impl(AIButtonProvider, {
  presentAIButton: () => {
    return AIButton.present();
  },
  dismissAIButton: () => {
    return AIButton.dismiss();
  },
});

// ------ some apis for native ------
(window as any).getCurrentServerBaseUrl = () => {
  return window.location.origin;
};
(window as any).getCurrentI18nLocale = () => {
  return I18n.language;
};
(window as any).getCurrentWorkspaceId = () => {
  const globalContextService = frameworkProvider.get(GlobalContextService);
  return globalContextService.globalContext.workspaceId.get();
};
(window as any).getCurrentDocId = () => {
  const globalContextService = frameworkProvider.get(GlobalContextService);
  return globalContextService.globalContext.docId.get();
};
(window as any).getCurrentDocContentInMarkdown = async () => {
  const globalContextService = frameworkProvider.get(GlobalContextService);
  const currentWorkspaceId =
    globalContextService.globalContext.workspaceId.get();
  const currentDocId = globalContextService.globalContext.docId.get();
  const workspacesService = frameworkProvider.get(WorkspacesService);
  const workspaceRef = currentWorkspaceId
    ? workspacesService.openByWorkspaceId(currentWorkspaceId)
    : null;
  if (!workspaceRef) {
    return;
  }
  const { workspace, dispose: disposeWorkspace } = workspaceRef;

  const docsService = workspace.scope.get(DocsService);
  const docRef = currentDocId ? docsService.open(currentDocId) : null;
  if (!docRef) {
    return;
  }
  const { doc, release: disposeDoc } = docRef;

  try {
    const blockSuiteDoc = doc.blockSuiteDoc;

    const transformer = blockSuiteDoc.getTransformer([
      docLinkBaseURLMiddleware(blockSuiteDoc.workspace.id),
      titleMiddleware(blockSuiteDoc.workspace.meta.docMetas),
    ]);
    const snapshot = transformer.docToSnapshot(blockSuiteDoc);

    const container = new Container();
    getStoreManager()
      .config.init()
      .value.get('store')
      .forEach(ext => {
        ext.setup(container);
      });
    const provider = container.provider();

    const adapter = new MarkdownAdapter(transformer, provider);
    if (!snapshot) {
      return;
    }

    const markdownResult = await adapter.fromDocSnapshot({
      snapshot,
      assets: transformer.assetsManager,
    });
    return markdownResult.file;
  } finally {
    disposeDoc();
    disposeWorkspace();
  }
};

// setup application lifecycle events, and emit application start event
window.addEventListener('focus', () => {
  frameworkProvider.get(LifecycleService).applicationFocus();
});
frameworkProvider.get(LifecycleService).applicationStart();

CapacitorApp.addListener('appUrlOpen', ({ url }) => {
  // try to close browser if it's open
  InAppBrowser.close().catch(e => console.error('Failed to close browser', e));
  console.log('App URL opened (auth disabled):', url);
}).catch(e => {
  console.error(e);
});

const ThemeProvider = () => {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    StatusBar.setStyle({
      style:
        resolvedTheme === 'dark'
          ? Style.Dark
          : resolvedTheme === 'light'
            ? Style.Light
            : Style.Default,
    }).catch(console.error);
    AffineTheme.onThemeChanged({
      darkMode: resolvedTheme === 'dark',
    }).catch(console.error);
  }, [resolvedTheme]);
  return null;
};

export function App() {
  return (
    <Suspense>
      <FrameworkRoot framework={frameworkProvider}>
        <I18nProvider>
          <AffineContext store={getCurrentStore()}>
            <ThemeProvider />
            <RouterProvider
              fallbackElement={<AppFallback />}
              router={router}
              future={future}
            />
          </AffineContext>
        </I18nProvider>
      </FrameworkRoot>
    </Suspense>
  );
}

function createStoreManagerClient() {
  const worker = new Worker(getWorkerUrl('nbstore'));
  const { port1: nativeDBApiChannelServer, port2: nativeDBApiChannelClient } =
    new MessageChannel();
  AsyncCall<typeof NbStoreNativeDBApis>(NbStoreNativeDBApis, {
    channel: {
      on(listener) {
        const f = (e: MessageEvent<any>) => {
          listener(e.data);
        };
        nativeDBApiChannelServer.addEventListener('message', f);
        return () => {
          nativeDBApiChannelServer.removeEventListener('message', f);
        };
      },
      send(data) {
        nativeDBApiChannelServer.postMessage(data);
      },
    },
    log: false,
  });
  nativeDBApiChannelServer.start();
  worker.postMessage(
    {
      type: 'native-db-api-channel',
      port: nativeDBApiChannelClient,
    },
    [nativeDBApiChannelClient]
  );
  return new StoreManagerClient(new OpClient(worker));
}
