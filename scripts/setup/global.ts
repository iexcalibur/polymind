import { setupGlobal } from '@polymind/env/global';
import { getBuildConfig } from '@polymind-tools/utils/build-config';
import { Package } from '@polymind-tools/utils/workspace';

globalThis.BUILD_CONFIG = getBuildConfig(new Package('@polymind/web'), {
  mode: 'development',
  channel: 'canary',
});

if (typeof window !== 'undefined') {
  window.location.search = '?prefixUrl=http://127.0.0.1:3010/';
}

setupGlobal();
