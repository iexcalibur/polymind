import type { Permission, WorkspaceInviteLinkExpireTime } from '@affine/graphql';
import { Store } from '@toeverything/infra';

export class WorkspaceMembersStore extends Store {
  constructor() {
    super();
  }

  async fetchMembers(
    _workspaceId: string,
    _skip: number,
    _take: number,
    _signal?: AbortSignal
  ) {
    throw new Error('No Server (cloud module removed)');
  }

  async inviteBatch(_workspaceId: string, _emails: string[]) {
    throw new Error('No Server (cloud module removed)');
  }

  async generateInviteLink(
    _workspaceId: string,
    _expireTime: WorkspaceInviteLinkExpireTime
  ) {
    throw new Error('No Server (cloud module removed)');
  }

  async revokeInviteLink(_workspaceId: string, _signal?: AbortSignal) {
    throw new Error('No Server (cloud module removed)');
  }

  async revokeMemberPermission(
    _workspaceId: string,
    _userId: string,
    _signal?: AbortSignal
  ) {
    throw new Error('No Server (cloud module removed)');
  }

  async approveMember(_workspaceId: string, _userId: string) {
    throw new Error('No Server (cloud module removed)');
  }

  async adjustMemberPermission(
    _workspaceId: string,
    _userId: string,
    _permission: Permission
  ) {
    throw new Error('No Server (cloud module removed)');
  }
}
