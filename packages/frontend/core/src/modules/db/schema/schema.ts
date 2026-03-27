import type { IconData } from '@affine/component';
import {
  type DBSchemaBuilder,
  f,
  type FieldSchemaBuilder,
  type ORMEntity,
  t,
} from '@toeverything/infra';
import { nanoid } from 'nanoid';

import type { WorkspacePropertyType } from '../../workspace-property';

const integrationType = f.enum('readwise');

export const AFFiNE_WORKSPACE_DB_SCHEMA = {
  folders: {
    id: f.string().primaryKey().optional().default(nanoid),
    parentId: f.string().optional(),
    data: f.string(),
    type: f.string(),
    index: f.string(),
  },
  docProperties: t.document({
    // { [`custom:{customPropertyId}`]: any }
    id: f.string().primaryKey(),
    primaryMode: f.string().optional(),
    edgelessColorTheme: f.string().optional(),
    journal: f.string().optional(),
    pageWidth: f.string().optional(),
    isTemplate: f.boolean().optional(),
    integrationType: integrationType.optional(),
    createdBy: f.string().optional(),
    updatedBy: f.string().optional(),
    /**
     * The Space this document belongs to.
     * '__system__' is a reserved value for system-generated docs (e.g. canvas docs).
     */
    spaceId: f.string().optional(),
  }),
  docCustomPropertyInfo: {
    id: f.string().primaryKey().optional().default(nanoid),
    name: f.string().optional(),
    type: f.string() as FieldSchemaBuilder<WorkspacePropertyType, false, false>,
    show: f.enum('always-show', 'always-hide', 'hide-when-empty').optional(),
    index: f.string().optional(),
    icon: f.string().optional(),
    additionalData: f.json().optional(),
    isDeleted: f.boolean().optional(),
    // we will keep deleted properties in the database, for override legacy data
  },
  pinnedCollections: {
    collectionId: f.string().primaryKey(),
    index: f.string(),
  },
  explorerIcon: {
    /**
     * ${doc|collection|folder|tag}:${id}
     */
    id: f.string().primaryKey(),
    icon: f.json<IconData>(),
  },
  /**
   * Spaces — first-class knowledge containers (the "second brain" concept).
   * Each Space has its own list view and canvas view.
   */
  spaces: {
    id: f.string().primaryKey().optional().default(nanoid),
    name: f.string(),
    index: f.string().optional(),
    parentSpaceId: f.string().optional(),
  },
  /**
   * Maps a Space to its hidden canvas document (edgeless mode doc).
   */
  spaceCanvasDoc: {
    spaceId: f.string().primaryKey(),
    canvasDocId: f.string(),
  },
  /**
   * Space Memory — pinned facts/context per Space.
   * These are injected as system context when chatting in a Space.
   */
  spaceMemory: {
    id: f.string().primaryKey().optional().default(nanoid),
    spaceId: f.string(),
    content: f.string(),
    createdAt: f.number().optional(),
  },
  /**
   * Space Chat History — persisted messages per Space.
   */
  spaceChatMessage: {
    id: f.string().primaryKey().optional().default(nanoid),
    spaceId: f.string(),
    role: f.string(), // 'user' | 'assistant'
    content: f.string(),
    createdAt: f.number().optional(),
  },
  /**
   * Dump Zone — quick-capture inbox items.
   * Captures text snippets, screenshot OCR results, and URLs
   * before they are assigned to a Space and converted to docs.
   */
  dumpItems: {
    id: f.string().primaryKey().optional().default(nanoid),
    type: f.string(), // 'text' | 'image' | 'url'
    content: f.string(), // extracted/raw text (OCR result for images)
    sourceUrl: f.string().optional(), // for URL captures
    suggestedSpaceId: f.string().optional(), // AI-suggested Space
    isProcessed: f.boolean().optional(), // AI has finished processing
    movedToSpaceId: f.string().optional(), // set once moved to a Space
    movedToDocId: f.string().optional(), // the resulting doc id
    createdAt: f.number().optional(),
  },
  /**
   * Workspace Chat — global AI chat messages (not scoped to a Space).
   */
  workspaceChatMessage: {
    id: f.string().primaryKey().optional().default(nanoid),
    role: f.string(), // 'user' | 'assistant'
    content: f.string(),
    createdAt: f.number().optional(),
  },
  /**
   * Cross-Space Connections — AI-discovered links between Spaces.
   */
  crossSpaceConnections: {
    id: f.string().primaryKey().optional().default(nanoid),
    sourceSpaceId: f.string(),
    targetSpaceId: f.string(),
    label: f.string().optional(),
    strength: f.number().optional(),
    createdAt: f.number().optional(),
  },
} as const satisfies DBSchemaBuilder;
export type AFFiNEWorkspaceDbSchema = typeof AFFiNE_WORKSPACE_DB_SCHEMA;

export type DocProperties = ORMEntity<AFFiNEWorkspaceDbSchema['docProperties']>;
export type DocCustomPropertyInfo = ORMEntity<
  AFFiNEWorkspaceDbSchema['docCustomPropertyInfo']
>;

export const AFFiNE_WORKSPACE_USERDATA_DB_SCHEMA = {
  favorite: {
    key: f.string().primaryKey(),
    index: f.string(),
  },
  settings: {
    key: f.string().primaryKey(),
    value: f.json(),
  },
  docIntegrationRef: {
    // docId as primary key
    id: f.string().primaryKey(),
    type: integrationType,
    /**
     * Identify **affine user** and **integration type** and **integration account**
     * Used to quickly find user's all integrations
     */
    integrationId: f.string(),
    refMeta: f.json(),
  },
} as const satisfies DBSchemaBuilder;
export type AFFiNEWorkspaceUserdataDbSchema =
  typeof AFFiNE_WORKSPACE_USERDATA_DB_SCHEMA;
export type DocIntegrationRef = ORMEntity<
  AFFiNEWorkspaceUserdataDbSchema['docIntegrationRef']
>;
