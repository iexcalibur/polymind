import { getBuildConfig } from '@polymind-tools/utils/build-config';
import { Package } from '@polymind-tools/utils/workspace';

import { createApp } from './create-app';

globalThis.BUILD_CONFIG = getBuildConfig(new Package('@polymind/web'), {
  mode: 'development',
  channel: 'canary',
});
// @ts-expect-error testing
globalThis.app = await createApp();
