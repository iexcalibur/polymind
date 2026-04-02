export { UserspaceService as UserDBService } from './services/userspace';

import type { Framework } from '@toeverything/infra';

export function configureUserspaceModule(_framework: Framework) {
  // Cloud module removed - userspace module is a no-op
}
