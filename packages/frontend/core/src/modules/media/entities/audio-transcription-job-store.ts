import {
  claimAudioTranscriptionMutation,
  getAudioTranscriptionQuery,
  gqlFetcherFactory,
  retryAudioTranscriptionMutation,
  submitAudioTranscriptionMutation,
} from '@polymind/graphql';
import { Entity } from '@toeverything/infra';

import type { WorkspaceService } from '../../workspace';

const gql = gqlFetcherFactory('/graphql', (input, init) =>
  globalThis.fetch(input, { ...init, credentials: 'include' })
);

export class AudioTranscriptionJobStore extends Entity<{
  readonly blobId: string;
  readonly getAudioFiles: () => Promise<File[]>;
}> {
  constructor(private readonly workspaceService: WorkspaceService) {
    super();
  }

  private get currentWorkspaceId() {
    return this.workspaceService.workspace.id;
  }

  submitAudioTranscription = async () => {
    const files = await this.props.getAudioFiles();
    const response = await gql({
      timeout: 0, // default 15s is too short for audio transcription
      query: submitAudioTranscriptionMutation,
      variables: {
        workspaceId: this.currentWorkspaceId,
        blobId: this.props.blobId,
        blobs: files,
      },
    });
    if (!response.submitAudioTranscription?.id) {
      throw new Error('Failed to submit audio transcription');
    }
    return response.submitAudioTranscription;
  };

  retryAudioTranscription = async (jobId: string) => {
    const response = await gql({
      query: retryAudioTranscriptionMutation,
      variables: {
        jobId,
        workspaceId: this.currentWorkspaceId,
      },
    });
    if (!response.retryAudioTranscription) {
      throw new Error('Failed to retry audio transcription');
    }
    return response.retryAudioTranscription;
  };

  getAudioTranscription = async (blobId: string, jobId?: string) => {
    const currentWorkspaceId = this.currentWorkspaceId;
    if (!currentWorkspaceId) {
      throw new Error('No current workspace id');
    }
    const response = await gql({
      query: getAudioTranscriptionQuery,
      variables: {
        workspaceId: currentWorkspaceId,
        jobId,
        blobId,
      },
    });
    if (!response.currentUser?.copilot?.audioTranscription) {
      return null;
    }
    return response.currentUser.copilot.audioTranscription;
  };
  claimAudioTranscription = async (jobId: string) => {
    const response = await gql({
      query: claimAudioTranscriptionMutation,
      variables: {
        jobId,
      },
    });
    if (!response.claimAudioTranscription) {
      throw new Error('Failed to claim transcription result');
    }
    return response.claimAudioTranscription;
  };
}
