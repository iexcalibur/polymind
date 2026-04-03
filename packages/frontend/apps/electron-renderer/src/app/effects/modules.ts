import { configureElectronStateStorageImpls } from '@polymind/core/desktop/storage';
import { configureCommonModules } from '@polymind/core/modules';
import { configureAppTabsHeaderModule } from '@polymind/core/modules/app-tabs-header';
import { configureDesktopBackupModule } from '@polymind/core/modules/backup';
import {
  configureDesktopApiModule,
  DesktopApiService,
} from '@polymind/core/modules/desktop-api';
import {
  configureSpellCheckSettingModule,
  configureTraySettingModule,
} from '@polymind/core/modules/editor-setting';
import { configureFindInPageModule } from '@polymind/core/modules/find-in-page';
import {
  ClientSchemeProvider,
  PopupWindowProvider,
} from '@polymind/core/modules/url';
import { configureDesktopWorkbenchModule } from '@polymind/core/modules/workbench';
import { configureBrowserWorkspaceFlavours } from '@polymind/core/modules/workspace-engine';
import { Framework } from '@toeverything/infra';

export function setupModules() {
  const framework = new Framework();
  configureCommonModules(framework);
  configureElectronStateStorageImpls(framework);
  configureBrowserWorkspaceFlavours(framework);
  configureDesktopWorkbenchModule(framework);
  configureAppTabsHeaderModule(framework);
  configureFindInPageModule(framework);
  configureDesktopApiModule(framework);
  configureSpellCheckSettingModule(framework);
  configureTraySettingModule(framework);
  configureDesktopBackupModule(framework);

  framework.impl(PopupWindowProvider, p => {
    const apis = p.get(DesktopApiService).api;
    return {
      open: (url: string) => {
        apis.handler.ui.openExternal(url).catch(e => {
          console.error('Failed to open external URL', e);
        });
      },
    };
  });
  framework.impl(ClientSchemeProvider, p => {
    const appInfo = p.get(DesktopApiService).appInfo;
    return {
      getClientScheme() {
        return appInfo?.scheme;
      },
    };
  });
  const frameworkProvider = framework.provider();

  return { framework, frameworkProvider };
}
