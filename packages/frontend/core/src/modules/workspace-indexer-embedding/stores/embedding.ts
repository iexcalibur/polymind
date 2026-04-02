import type { PaginationInput } from '@affine/graphql';
import { Store } from '@toeverything/infra';

export class EmbeddingStore extends Store {
  constructor() {
    super();
  }

  async getEnabled(_workspaceId: string, _signal?: AbortSignal) {
    // Cloud module removed
    return false;
  }

  async updateEnabled(
    _workspaceId: string,
    _enabled: boolean,
    _signal?: AbortSignal
  ) {
    throw new Error('No Server (cloud module removed)');
  }

  async getIgnoredDocs(_workspaceId: string, _signal?: AbortSignal) {
    return [];
  }

  async updateIgnoredDocs(
    _workspaceId: string,
    _add: string[],
    _remove: string[],
    _signal?: AbortSignal
  ) {
    throw new Error('No Server (cloud module removed)');
  }

  async addEmbeddingFile(
    _workspaceId: string,
    _blob: File,
    _signal?: AbortSignal
  ) {
    throw new Error('No Server (cloud module removed)');
  }

  async addEmbeddingFiles(
    _workspaceId: string,
    _files: File[],
    _signal?: AbortSignal
  ) {
    throw new Error('No Server (cloud module removed)');
  }

  async removeEmbeddingFile(
    _workspaceId: string,
    _fileId: string,
    _signal?: AbortSignal
  ) {
    throw new Error('No Server (cloud module removed)');
  }

  async removeEmbeddingFiles(
    _workspaceId: string,
    _fileIds: string[],
    _signal?: AbortSignal
  ) {
    throw new Error('No Server (cloud module removed)');
  }

  async getEmbeddingFiles(
    _workspaceId: string,
    _pagination: PaginationInput,
    _signal?: AbortSignal
  ) {
    throw new Error('No Server (cloud module removed)');
  }

  async getEmbeddingProgress(_workspaceId: string, _signal?: AbortSignal) {
    throw new Error('No Server (cloud module removed)');
  }
}
