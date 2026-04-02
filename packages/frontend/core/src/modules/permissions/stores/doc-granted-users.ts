import type {
  DocRole,
  GrantDocUserRolesInput,
  PaginationInput,
  UpdateDocDefaultRoleInput,
} from '@affine/graphql';
import { Store } from '@toeverything/infra';

export class DocGrantedUsersStore extends Store {
  constructor() {
    super();
  }

  async fetchDocGrantedUsersList(
    _workspaceId: string,
    _docId: string,
    _pagination: PaginationInput,
    _signal?: AbortSignal
  ) {
    throw new Error('No Server (cloud module removed)');
  }

  async grantDocUserRoles(_input: GrantDocUserRolesInput) {
    throw new Error('No Server (cloud module removed)');
  }

  async revokeDocUserRoles(
    _workspaceId: string,
    _docId: string,
    _userId: string
  ) {
    throw new Error('No Server (cloud module removed)');
  }

  async updateDocUserRole(
    _workspaceId: string,
    _docId: string,
    _userId: string,
    _role: DocRole
  ) {
    throw new Error('No Server (cloud module removed)');
  }

  async updateDocDefaultRole(_input: UpdateDocDefaultRoleInput) {
    throw new Error('No Server (cloud module removed)');
  }
}
