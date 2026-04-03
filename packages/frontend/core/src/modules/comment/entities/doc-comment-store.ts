import {
  createCommentMutation,
  createReplyMutation,
  deleteCommentMutation,
  deleteReplyMutation,
  type DocMode,
  gqlFetcherFactory,
  listCommentChangesQuery,
  type ListCommentsQuery,
  listCommentsQuery,
  resolveCommentMutation,
  updateCommentMutation,
  updateReplyMutation,
  uploadCommentAttachmentMutation,
} from '@affine/graphql';
import { Entity } from '@toeverything/infra';

import type { WorkspaceService } from '../../workspace';
import type {
  DocComment,
  DocCommentChangeListResult,
  DocCommentContent,
  DocCommentListResult,
  DocCommentReply,
} from '../types';
import { findMentions } from './utils';

type GQLCommentType =
  ListCommentsQuery['workspace']['comments']['edges'][number]['node'];
type GQLReplyType = GQLCommentType['replies'][number];
type GQLUserType = GQLCommentType['user'];

// Helper functions for normalizing backend responses
const normalizeUser = (user: GQLUserType) => ({
  id: user.id,
  name: user.name,
  avatarUrl: user.avatarUrl,
});

const normalizeReply = (reply: GQLReplyType): DocCommentReply => ({
  id: reply.id,
  commentId: reply.commentId,
  content: reply.content as DocCommentContent,
  createdAt: new Date(reply.createdAt).getTime(),
  updatedAt: new Date(reply.updatedAt).getTime(),
  user: normalizeUser(reply.user),
  mentions: findMentions(reply.content.snapshot.blocks),
});

const normalizeComment = (comment: GQLCommentType): DocComment => ({
  id: comment.id,
  content: comment.content ? (comment.content as DocCommentContent) : undefined,
  resolved: comment.resolved,
  createdAt: new Date(comment.createdAt).getTime(),
  updatedAt: new Date(comment.updatedAt).getTime(),
  user: comment.user
    ? normalizeUser(comment.user)
    : {
        id: '',
        name: '',
        avatarUrl: '',
      },
  mentions: comment.content
    ? findMentions(comment.content.snapshot.blocks)
    : [],
  replies: comment.replies?.map(normalizeReply) ?? [],
});

const gql = gqlFetcherFactory('/graphql', (input, init) =>
  globalThis.fetch(input, { ...init, credentials: 'include' })
);

export class DocCommentStore extends Entity<{
  docId: string;
  getDocMode: () => DocMode;
  getDocTitle: () => string;
}> {
  constructor(private readonly workspaceService: WorkspaceService) {
    super();
  }

  private get currentWorkspaceId() {
    return this.workspaceService.workspace.id;
  }

  async listComments({
    after,
  }: {
    after?: string;
  }): Promise<DocCommentListResult> {
    const response = await gql({
      query: listCommentsQuery,
      variables: {
        pagination: {
          after,
        },
        workspaceId: this.currentWorkspaceId,
        docId: this.props.docId,
      },
    });

    const comments = response.workspace?.comments;
    if (!comments) {
      return {
        comments: [],
        hasNextPage: false,
        startCursor: '',
        endCursor: '',
      };
    }

    return {
      comments: comments.edges.map(edge => normalizeComment(edge.node)),
      hasNextPage: comments.pageInfo.hasNextPage,
      startCursor: comments.pageInfo.startCursor || '',
      endCursor: comments.pageInfo.endCursor || '',
    };
  }

  async listCommentChanges({
    after,
  }: {
    after?: string;
  }): Promise<DocCommentChangeListResult> {
    const response = await gql({
      query: listCommentChangesQuery,
      variables: {
        pagination: {
          after,
        },
        workspaceId: this.currentWorkspaceId,
        docId: this.props.docId,
      },
    });

    const commentChanges = response.workspace?.commentChanges;
    if (!commentChanges) {
      return {
        changes: [],
        startCursor: '',
        endCursor: after ?? '',
        hasNextPage: false,
      };
    }

    return {
      changes: commentChanges.edges.map(edge => ({
        id: edge.node.id,
        action: edge.node.action,
        comment: normalizeComment(edge.node.item),
        commentId: edge.node.commentId || undefined,
      })),
      startCursor: commentChanges.pageInfo.startCursor || '',
      endCursor: commentChanges.pageInfo.endCursor || '',
      hasNextPage: commentChanges.pageInfo.hasNextPage,
    };
  }

  async createComment(commentInput: {
    content: DocCommentContent;
    mentions?: string[];
  }): Promise<DocComment> {
    const mentions = commentInput.mentions;

    const response = await gql({
      query: createCommentMutation,
      variables: {
        input: {
          workspaceId: this.currentWorkspaceId,
          docId: this.props.docId,
          docMode: this.props.getDocMode(),
          docTitle: this.props.getDocTitle(),
          content: commentInput.content,
          mentions,
        },
      },
    });

    const comment = response.createComment;
    return normalizeComment(comment);
  }

  async updateComment(
    commentId: string,
    commentInput: {
      content: DocCommentContent;
    }
  ): Promise<void> {
    await gql({
      query: updateCommentMutation,
      variables: {
        input: {
          id: commentId,
          content: commentInput.content,
        },
      },
    });
  }

  async resolveComment(commentId: string, resolved = true): Promise<boolean> {
    const response = await gql({
      query: resolveCommentMutation,
      variables: {
        input: {
          id: commentId,
          resolved,
        },
      },
    });

    return response.resolveComment;
  }

  async deleteComment(commentId: string): Promise<boolean> {
    const response = await gql({
      query: deleteCommentMutation,
      variables: {
        id: commentId,
      },
    });
    return response.deleteComment;
  }

  async createReply(
    commentId: string,
    replyInput: {
      content: DocCommentContent;
      mentions?: string[];
    }
  ): Promise<DocCommentReply> {
    const response = await gql({
      query: createReplyMutation,
      variables: {
        input: {
          commentId,
          content: replyInput.content,
          docMode: this.props.getDocMode(),
          docTitle: this.props.getDocTitle(),
          mentions: replyInput.mentions,
        },
      },
    });
    return normalizeReply(response.createReply);
  }

  async updateReply(
    replyId: string,
    replyInput: {
      content: DocCommentContent;
    }
  ): Promise<void> {
    await gql({
      query: updateReplyMutation,
      variables: {
        input: {
          id: replyId,
          content: replyInput.content,
        },
      },
    });
  }

  async deleteReply(replyId: string): Promise<void> {
    await gql({
      query: deleteReplyMutation,
      variables: {
        id: replyId,
      },
    });
  }

  /**
   * Upload a comment attachment blob and obtain the remote URL.
   * @param file File (image/blob) selected by user
   * @returns url string returned by server
   */
  uploadCommentAttachment = async (file: File): Promise<string> => {
    const res = await gql({
      timeout: 180_000,
      query: uploadCommentAttachmentMutation,
      variables: {
        workspaceId: this.currentWorkspaceId,
        docId: this.props.docId,
        attachment: file,
      },
    });
    return res.uploadCommentAttachment;
  };
}
