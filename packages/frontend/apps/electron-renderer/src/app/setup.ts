import '@polymind/core/bootstrap/electron';
import '@polymind/core/bootstrap/cleanup';
import '@polymind/component/theme';
import './global.css';

import { apis } from '@polymind/electron-api';
import { bindNativeDBApis } from '@polymind/nbstore/sqlite';
import { bindNativeDBV1Apis } from '@polymind/nbstore/sqlite/v1';

// oxlint-disable-next-line no-non-null-assertion
bindNativeDBApis(apis!.nbstore);
// oxlint-disable-next-line no-non-null-assertion
bindNativeDBV1Apis(apis!.db);
