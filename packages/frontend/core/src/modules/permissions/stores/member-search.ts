import { Store } from '@toeverything/infra';

export class MemberSearchStore extends Store {
  constructor() {
    super();
  }

  async getMembersByEmailOrName(
    _workspaceId: string,
    _query?: string,
    _skip?: number,
    _take?: number,
    _signal?: AbortSignal
  ) {
    throw new Error('No Server (cloud module removed)');
  }
}
