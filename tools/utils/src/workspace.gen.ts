// Auto generated content
// DO NOT MODIFY THIS FILE MANUALLY
export const PackageList = [
  {
    location: 'blocksuite/docs',
    name: '@blocksuite/bs-docs',
    workspaceDependencies: ['blocksuite/polymind/all'],
  },
  {
    location: 'blocksuite/framework/global',
    name: '@blocksuite/global',
    workspaceDependencies: [],
  },
  {
    location: 'blocksuite/framework/std',
    name: '@blocksuite/std',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/framework/store',
    name: '@blocksuite/store',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/framework/sync',
    ],
  },
  {
    location: 'blocksuite/framework/sync',
    name: '@blocksuite/sync',
    workspaceDependencies: ['blocksuite/framework/global'],
  },
  {
    location: 'blocksuite/integration-test',
    name: '@blocksuite/integration-test',
    workspaceDependencies: ['blocksuite/polymind/all'],
  },
  {
    location: 'blocksuite/playground',
    name: '@blocksuite/playground',
    workspaceDependencies: [
      'blocksuite/polymind/data-view',
      'blocksuite/integration-test',
      'blocksuite/polymind/all',
      'blocksuite/polymind/components',
      'blocksuite/polymind/model',
      'blocksuite/polymind/shared',
    ],
  },
  {
    location: 'blocksuite/polymind/all',
    name: '@blocksuite/polymind',
    workspaceDependencies: [
      'blocksuite/polymind/data-view',
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/attachment',
      'blocksuite/polymind/blocks/bookmark',
      'blocksuite/polymind/blocks/callout',
      'blocksuite/polymind/blocks/code',
      'blocksuite/polymind/blocks/data-view',
      'blocksuite/polymind/blocks/database',
      'blocksuite/polymind/blocks/divider',
      'blocksuite/polymind/blocks/edgeless-text',
      'blocksuite/polymind/blocks/embed',
      'blocksuite/polymind/blocks/embed-doc',
      'blocksuite/polymind/blocks/frame',
      'blocksuite/polymind/blocks/image',
      'blocksuite/polymind/blocks/latex',
      'blocksuite/polymind/blocks/list',
      'blocksuite/polymind/blocks/note',
      'blocksuite/polymind/blocks/paragraph',
      'blocksuite/polymind/blocks/root',
      'blocksuite/polymind/blocks/surface',
      'blocksuite/polymind/blocks/surface-ref',
      'blocksuite/polymind/blocks/table',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/foundation',
      'blocksuite/polymind/fragments/adapter-panel',
      'blocksuite/polymind/fragments/doc-title',
      'blocksuite/polymind/fragments/frame-panel',
      'blocksuite/polymind/fragments/outline',
      'blocksuite/polymind/gfx/brush',
      'blocksuite/polymind/gfx/connector',
      'blocksuite/polymind/gfx/group',
      'blocksuite/polymind/gfx/link',
      'blocksuite/polymind/gfx/mindmap',
      'blocksuite/polymind/gfx/note',
      'blocksuite/polymind/gfx/pointer',
      'blocksuite/polymind/gfx/shape',
      'blocksuite/polymind/gfx/template',
      'blocksuite/polymind/gfx/text',
      'blocksuite/polymind/gfx/turbo-renderer',
      'blocksuite/polymind/inlines/comment',
      'blocksuite/polymind/inlines/footnote',
      'blocksuite/polymind/inlines/latex',
      'blocksuite/polymind/inlines/link',
      'blocksuite/polymind/inlines/mention',
      'blocksuite/polymind/inlines/preset',
      'blocksuite/polymind/inlines/reference',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/polymind/widgets/drag-handle',
      'blocksuite/polymind/widgets/edgeless-auto-connect',
      'blocksuite/polymind/widgets/edgeless-dragging-area',
      'blocksuite/polymind/widgets/edgeless-selected-rect',
      'blocksuite/polymind/widgets/edgeless-toolbar',
      'blocksuite/polymind/widgets/edgeless-zoom-toolbar',
      'blocksuite/polymind/widgets/frame-title',
      'blocksuite/polymind/widgets/keyboard-toolbar',
      'blocksuite/polymind/widgets/linked-doc',
      'blocksuite/polymind/widgets/note-slicer',
      'blocksuite/polymind/widgets/page-dragging-area',
      'blocksuite/polymind/widgets/remote-selection',
      'blocksuite/polymind/widgets/scroll-anchoring',
      'blocksuite/polymind/widgets/slash-menu',
      'blocksuite/polymind/widgets/toolbar',
      'blocksuite/polymind/widgets/viewport-overlay',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
      'blocksuite/framework/sync',
    ],
  },
  {
    location: 'blocksuite/polymind/blocks/attachment',
    name: '@blocksuite/polymind-block-attachment',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/surface',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/model',
      'blocksuite/polymind/shared',
      'blocksuite/polymind/widgets/slash-menu',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/blocks/bookmark',
    name: '@blocksuite/polymind-block-bookmark',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/embed',
      'blocksuite/polymind/blocks/embed-doc',
      'blocksuite/polymind/blocks/surface',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/model',
      'blocksuite/polymind/shared',
      'blocksuite/polymind/widgets/slash-menu',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/blocks/callout',
    name: '@blocksuite/polymind-block-callout',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/inlines/preset',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/polymind/widgets/slash-menu',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/blocks/code',
    name: '@blocksuite/polymind-block-code',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/gfx/turbo-renderer',
      'blocksuite/polymind/inlines/comment',
      'blocksuite/polymind/inlines/latex',
      'blocksuite/polymind/inlines/link',
      'blocksuite/polymind/inlines/preset',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/polymind/widgets/slash-menu',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/blocks/data-view',
    name: '@blocksuite/polymind-block-data-view',
    workspaceDependencies: [
      'blocksuite/polymind/data-view',
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/database',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/model',
      'blocksuite/polymind/shared',
      'blocksuite/polymind/widgets/slash-menu',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/blocks/database',
    name: '@blocksuite/polymind-block-database',
    workspaceDependencies: [
      'blocksuite/polymind/data-view',
      'blocksuite/framework/global',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/inlines/preset',
      'blocksuite/polymind/inlines/reference',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/polymind/widgets/drag-handle',
      'blocksuite/polymind/widgets/slash-menu',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/blocks/divider',
    name: '@blocksuite/polymind-block-divider',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/blocks/edgeless-text',
    name: '@blocksuite/polymind-block-edgeless-text',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/surface',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/gfx/text',
      'blocksuite/polymind/inlines/preset',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/polymind/widgets/edgeless-toolbar',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/blocks/embed',
    name: '@blocksuite/polymind-block-embed',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/surface',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/gfx/pointer',
      'blocksuite/polymind/inlines/reference',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/polymind/widgets/slash-menu',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/blocks/embed-doc',
    name: '@blocksuite/polymind-block-embed-doc',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/embed',
      'blocksuite/polymind/blocks/surface',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/inlines/reference',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/polymind/widgets/slash-menu',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/blocks/frame',
    name: '@blocksuite/polymind-block-frame',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/surface',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/gfx/pointer',
      'blocksuite/polymind/model',
      'blocksuite/polymind/shared',
      'blocksuite/polymind/widgets/edgeless-toolbar',
      'blocksuite/polymind/widgets/frame-title',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/blocks/image',
    name: '@blocksuite/polymind-block-image',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/note',
      'blocksuite/polymind/blocks/surface',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/gfx/turbo-renderer',
      'blocksuite/polymind/model',
      'blocksuite/polymind/shared',
      'blocksuite/polymind/widgets/slash-menu',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/blocks/latex',
    name: '@blocksuite/polymind-block-latex',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/note',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/inlines/latex',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/polymind/widgets/slash-menu',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/blocks/list',
    name: '@blocksuite/polymind-block-list',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/gfx/turbo-renderer',
      'blocksuite/polymind/inlines/preset',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/blocks/note',
    name: '@blocksuite/polymind-block-note',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/embed',
      'blocksuite/polymind/blocks/surface',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/fragments/doc-title',
      'blocksuite/polymind/gfx/turbo-renderer',
      'blocksuite/polymind/inlines/preset',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/polymind/widgets/slash-menu',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/blocks/paragraph',
    name: '@blocksuite/polymind-block-paragraph',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/gfx/turbo-renderer',
      'blocksuite/polymind/inlines/preset',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/blocks/root',
    name: '@blocksuite/polymind-block-root',
    workspaceDependencies: [
      'blocksuite/polymind/data-view',
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/attachment',
      'blocksuite/polymind/blocks/bookmark',
      'blocksuite/polymind/blocks/database',
      'blocksuite/polymind/blocks/edgeless-text',
      'blocksuite/polymind/blocks/embed',
      'blocksuite/polymind/blocks/frame',
      'blocksuite/polymind/blocks/image',
      'blocksuite/polymind/blocks/note',
      'blocksuite/polymind/blocks/paragraph',
      'blocksuite/polymind/blocks/surface',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/gfx/brush',
      'blocksuite/polymind/gfx/connector',
      'blocksuite/polymind/gfx/group',
      'blocksuite/polymind/gfx/mindmap',
      'blocksuite/polymind/gfx/note',
      'blocksuite/polymind/gfx/pointer',
      'blocksuite/polymind/gfx/shape',
      'blocksuite/polymind/gfx/text',
      'blocksuite/polymind/inlines/preset',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/polymind/widgets/edgeless-selected-rect',
      'blocksuite/polymind/widgets/edgeless-toolbar',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/blocks/surface',
    name: '@blocksuite/polymind-block-surface',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/blocks/surface-ref',
    name: '@blocksuite/polymind-block-surface-ref',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/frame',
      'blocksuite/polymind/blocks/surface',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/inlines/reference',
      'blocksuite/polymind/model',
      'blocksuite/polymind/shared',
      'blocksuite/polymind/widgets/slash-menu',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/blocks/table',
    name: '@blocksuite/polymind-block-table',
    workspaceDependencies: [
      'blocksuite/polymind/data-view',
      'blocksuite/framework/global',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/inlines/preset',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/polymind/widgets/slash-menu',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/components',
    name: '@blocksuite/polymind-components',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/model',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
      'blocksuite/framework/sync',
    ],
  },
  {
    location: 'blocksuite/polymind/data-view',
    name: '@blocksuite/data-view',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/components',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/ext-loader',
    name: '@blocksuite/polymind-ext-loader',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/foundation',
    name: '@blocksuite/polymind-foundation',
    workspaceDependencies: [
      'blocksuite/polymind/data-view',
      'blocksuite/framework/global',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/fragments/adapter-panel',
    name: '@blocksuite/polymind-fragment-adapter-panel',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/model',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/fragments/doc-title',
    name: '@blocksuite/polymind-fragment-doc-title',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/frame',
      'blocksuite/polymind/blocks/surface',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/fragments/frame-panel',
    name: '@blocksuite/polymind-fragment-frame-panel',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/frame',
      'blocksuite/polymind/blocks/surface',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/fragments/outline',
    name: '@blocksuite/polymind-fragment-outline',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/note',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/fragments/doc-title',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/gfx/brush',
    name: '@blocksuite/polymind-gfx-brush',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/surface',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/polymind/widgets/edgeless-toolbar',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/gfx/connector',
    name: '@blocksuite/polymind-gfx-connector',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/surface',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/gfx/text',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/polymind/widgets/edgeless-toolbar',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/gfx/group',
    name: '@blocksuite/polymind-gfx-group',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/surface',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/gfx/text',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/polymind/widgets/edgeless-toolbar',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/gfx/link',
    name: '@blocksuite/polymind-gfx-link',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/bookmark',
      'blocksuite/polymind/blocks/embed',
      'blocksuite/polymind/blocks/surface',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/gfx/pointer',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/polymind/widgets/edgeless-toolbar',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/gfx/mindmap',
    name: '@blocksuite/polymind-gfx-mindmap',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/attachment',
      'blocksuite/polymind/blocks/edgeless-text',
      'blocksuite/polymind/blocks/image',
      'blocksuite/polymind/blocks/surface',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/gfx/connector',
      'blocksuite/polymind/gfx/pointer',
      'blocksuite/polymind/gfx/shape',
      'blocksuite/polymind/gfx/text',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/polymind/widgets/edgeless-toolbar',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/gfx/note',
    name: '@blocksuite/polymind-gfx-note',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/attachment',
      'blocksuite/polymind/blocks/bookmark',
      'blocksuite/polymind/blocks/image',
      'blocksuite/polymind/blocks/surface',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/polymind/widgets/edgeless-toolbar',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/gfx/pointer',
    name: '@blocksuite/polymind-gfx-pointer',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/surface',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/polymind/widgets/edgeless-toolbar',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/gfx/shape',
    name: '@blocksuite/polymind-gfx-shape',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/surface',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/gfx/text',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/polymind/widgets/edgeless-toolbar',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/gfx/template',
    name: '@blocksuite/polymind-gfx-template',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/surface',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/gfx/text',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/polymind/widgets/edgeless-toolbar',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/gfx/text',
    name: '@blocksuite/polymind-gfx-text',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/surface',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/polymind/widgets/edgeless-toolbar',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/gfx/turbo-renderer',
    name: '@blocksuite/polymind-gfx-turbo-renderer',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/inlines/comment',
    name: '@blocksuite/polymind-inline-comment',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/inlines/footnote',
    name: '@blocksuite/polymind-inline-footnote',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/inlines/reference',
      'blocksuite/polymind/model',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/inlines/latex',
    name: '@blocksuite/polymind-inline-latex',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/inlines/reference',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/inlines/link',
    name: '@blocksuite/polymind-inline-link',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/inlines/reference',
      'blocksuite/polymind/model',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/inlines/mention',
    name: '@blocksuite/polymind-inline-mention',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/model',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/inlines/preset',
    name: '@blocksuite/polymind-inline-preset',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/inlines/comment',
      'blocksuite/polymind/inlines/footnote',
      'blocksuite/polymind/inlines/latex',
      'blocksuite/polymind/inlines/link',
      'blocksuite/polymind/inlines/mention',
      'blocksuite/polymind/inlines/reference',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/inlines/reference',
    name: '@blocksuite/polymind-inline-reference',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/model',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/model',
    name: '@blocksuite/polymind-model',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/rich-text',
    name: '@blocksuite/polymind-rich-text',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/components',
      'blocksuite/polymind/model',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/shared',
    name: '@blocksuite/polymind-shared',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/model',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/widgets/drag-handle',
    name: '@blocksuite/polymind-widget-drag-handle',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/callout',
      'blocksuite/polymind/blocks/embed',
      'blocksuite/polymind/blocks/list',
      'blocksuite/polymind/blocks/note',
      'blocksuite/polymind/blocks/paragraph',
      'blocksuite/polymind/blocks/surface',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/model',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/widgets/edgeless-auto-connect',
    name: '@blocksuite/polymind-widget-edgeless-auto-connect',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/note',
      'blocksuite/polymind/blocks/surface',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/model',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
    ],
  },
  {
    location: 'blocksuite/polymind/widgets/edgeless-dragging-area',
    name: '@blocksuite/polymind-widget-edgeless-dragging-area',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/note',
      'blocksuite/polymind/blocks/surface',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/model',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
    ],
  },
  {
    location: 'blocksuite/polymind/widgets/edgeless-selected-rect',
    name: '@blocksuite/polymind-widget-edgeless-selected-rect',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/frame',
      'blocksuite/polymind/blocks/note',
      'blocksuite/polymind/blocks/surface',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/gfx/connector',
      'blocksuite/polymind/gfx/shape',
      'blocksuite/polymind/gfx/text',
      'blocksuite/polymind/model',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
    ],
  },
  {
    location: 'blocksuite/polymind/widgets/edgeless-toolbar',
    name: '@blocksuite/polymind-widget-edgeless-toolbar',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/surface',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
    ],
  },
  {
    location: 'blocksuite/polymind/widgets/edgeless-zoom-toolbar',
    name: '@blocksuite/polymind-widget-edgeless-zoom-toolbar',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/surface',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/model',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
    ],
  },
  {
    location: 'blocksuite/polymind/widgets/frame-title',
    name: '@blocksuite/polymind-widget-frame-title',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/surface',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
    ],
  },
  {
    location: 'blocksuite/polymind/widgets/keyboard-toolbar',
    name: '@blocksuite/polymind-widget-keyboard-toolbar',
    workspaceDependencies: [
      'blocksuite/polymind/data-view',
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/attachment',
      'blocksuite/polymind/blocks/database',
      'blocksuite/polymind/blocks/embed',
      'blocksuite/polymind/blocks/image',
      'blocksuite/polymind/blocks/latex',
      'blocksuite/polymind/blocks/list',
      'blocksuite/polymind/blocks/note',
      'blocksuite/polymind/blocks/paragraph',
      'blocksuite/polymind/blocks/surface',
      'blocksuite/polymind/blocks/surface-ref',
      'blocksuite/polymind/blocks/table',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/fragments/doc-title',
      'blocksuite/polymind/inlines/latex',
      'blocksuite/polymind/inlines/link',
      'blocksuite/polymind/inlines/preset',
      'blocksuite/polymind/inlines/reference',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/widgets/linked-doc',
    name: '@blocksuite/polymind-widget-linked-doc',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/image',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/inlines/reference',
      'blocksuite/polymind/model',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/widgets/note-slicer',
    name: '@blocksuite/polymind-widget-note-slicer',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/note',
      'blocksuite/polymind/blocks/surface',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/model',
      'blocksuite/polymind/shared',
      'blocksuite/polymind/widgets/edgeless-selected-rect',
      'blocksuite/framework/std',
    ],
  },
  {
    location: 'blocksuite/polymind/widgets/page-dragging-area',
    name: '@blocksuite/polymind-widget-page-dragging-area',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/model',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/widgets/remote-selection',
    name: '@blocksuite/polymind-widget-remote-selection',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/surface',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/model',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
    ],
  },
  {
    location: 'blocksuite/polymind/widgets/scroll-anchoring',
    name: '@blocksuite/polymind-widget-scroll-anchoring',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/model',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
    ],
  },
  {
    location: 'blocksuite/polymind/widgets/slash-menu',
    name: '@blocksuite/polymind-widget-slash-menu',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/rich-text',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/widgets/toolbar',
    name: '@blocksuite/polymind-widget-toolbar',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/blocks/database',
      'blocksuite/polymind/blocks/surface',
      'blocksuite/polymind/blocks/table',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/model',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
    ],
  },
  {
    location: 'blocksuite/polymind/widgets/viewport-overlay',
    name: '@blocksuite/polymind-widget-viewport-overlay',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/components',
      'blocksuite/polymind/ext-loader',
      'blocksuite/polymind/model',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
    ],
  },
  {
    location: 'docs/reference',
    name: '@polymind/docs',
    workspaceDependencies: [],
  },
  {
    location: 'packages/backend/native',
    name: '@polymind/server-native',
    workspaceDependencies: [],
  },
  {
    location: 'packages/backend/server',
    name: '@polymind/server',
    workspaceDependencies: [
      'packages/common/s3-compat',
      'packages/backend/native',
      'tools/cli',
      'tools/utils',
      'packages/common/graphql',
    ],
  },
  {
    location: 'packages/common/debug',
    name: '@polymind/debug',
    workspaceDependencies: [],
  },
  {
    location: 'packages/common/env',
    name: '@polymind/env',
    workspaceDependencies: [],
  },
  {
    location: 'packages/common/error',
    name: '@polymind/error',
    workspaceDependencies: [],
  },
  {
    location: 'packages/common/graphql',
    name: '@polymind/graphql',
    workspaceDependencies: [
      'packages/common/debug',
      'packages/common/env',
      'packages/common/error',
    ],
  },
  {
    location: 'packages/common/infra',
    name: '@toeverything/infra',
    workspaceDependencies: [
      'packages/common/debug',
      'packages/common/env',
      'packages/common/error',
      'packages/frontend/templates',
    ],
  },
  {
    location: 'packages/common/nbstore',
    name: '@polymind/nbstore',
    workspaceDependencies: [
      'packages/common/reader',
      'packages/common/infra',
      'blocksuite/polymind/all',
      'packages/common/error',
      'packages/common/graphql',
    ],
  },
  {
    location: 'packages/common/reader',
    name: '@polymind/reader',
    workspaceDependencies: ['blocksuite/polymind/all'],
  },
  {
    location: 'packages/common/s3-compat',
    name: '@polymind/s3-compat',
    workspaceDependencies: [],
  },
  {
    location: 'packages/frontend/apps/electron',
    name: '@polymind/electron',
    workspaceDependencies: [
      'tools/utils',
      'packages/frontend/i18n',
      'packages/frontend/native',
      'packages/common/nbstore',
      'packages/common/infra',
    ],
  },
  {
    location: 'packages/frontend/apps/electron-renderer',
    name: '@polymind/electron-renderer',
    workspaceDependencies: [
      'blocksuite/polymind/all',
      'packages/frontend/component',
      'packages/frontend/core',
      'packages/common/debug',
      'packages/frontend/electron-api',
      'packages/frontend/i18n',
      'packages/common/nbstore',
      'packages/common/infra',
      'tools/utils',
    ],
  },
  {
    location: 'packages/frontend/apps/mobile',
    name: '@polymind/mobile',
    workspaceDependencies: [
      'blocksuite/polymind/all',
      'packages/frontend/component',
      'packages/frontend/core',
      'packages/common/env',
      'packages/frontend/i18n',
      'packages/common/nbstore',
      'packages/common/infra',
    ],
  },
  {
    location: 'packages/frontend/apps/web',
    name: '@polymind/web',
    workspaceDependencies: [
      'packages/frontend/component',
      'packages/frontend/core',
      'packages/common/env',
      'packages/frontend/i18n',
      'packages/common/nbstore',
      'packages/common/infra',
    ],
  },
  {
    location: 'packages/frontend/component',
    name: '@polymind/component',
    workspaceDependencies: [
      'packages/common/debug',
      'packages/frontend/electron-api',
      'packages/common/error',
      'packages/common/graphql',
      'packages/frontend/i18n',
      'blocksuite/polymind/all',
      'tools/utils',
    ],
  },
  {
    location: 'packages/frontend/core',
    name: '@polymind/core',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/all',
      'blocksuite/polymind/blocks/root',
      'blocksuite/polymind/components',
      'blocksuite/polymind/shared',
      'blocksuite/framework/std',
      'packages/frontend/component',
      'packages/common/debug',
      'packages/frontend/electron-api',
      'packages/common/env',
      'packages/common/error',
      'packages/common/graphql',
      'packages/frontend/i18n',
      'packages/common/nbstore',
      'packages/common/reader',
      'packages/frontend/templates',
      'packages/common/infra',
      'blocksuite/polymind/ext-loader',
    ],
  },
  {
    location: 'packages/frontend/electron-api',
    name: '@polymind/electron-api',
    workspaceDependencies: ['packages/frontend/apps/electron'],
  },
  {
    location: 'packages/frontend/i18n',
    name: '@polymind/i18n',
    workspaceDependencies: [
      'packages/common/debug',
      'tools/cli',
      'tools/utils',
    ],
  },
  {
    location: 'packages/frontend/media-capture-playground',
    name: '@polymind/media-capture-playground',
    workspaceDependencies: ['packages/frontend/native'],
  },
  {
    location: 'packages/frontend/native',
    name: '@polymind/native',
    workspaceDependencies: [],
  },
  {
    location: 'packages/frontend/routes',
    name: '@polymind/routes',
    workspaceDependencies: ['tools/cli', 'tools/utils'],
  },
  {
    location: 'packages/frontend/templates',
    name: '@polymind/templates',
    workspaceDependencies: [],
  },
  {
    location: 'tests/blocksuite',
    name: '@polymind-test/blocksuite',
    workspaceDependencies: [
      'blocksuite/integration-test',
      'blocksuite/polymind/all',
      'tests/kit',
    ],
  },
  {
    location: 'tests/kit',
    name: '@polymind-test/kit',
    workspaceDependencies: [
      'blocksuite/polymind/all',
      'tools/utils',
      'packages/common/infra',
    ],
  },
  {
    location: 'tests/polymind-cloud',
    name: '@polymind-test/polymind-cloud',
    workspaceDependencies: ['tests/kit'],
  },
  {
    location: 'tests/polymind-cloud-copilot',
    name: '@polymind-test/polymind-cloud-copilot',
    workspaceDependencies: ['tests/kit'],
  },
  {
    location: 'tests/polymind-desktop',
    name: '@polymind-test/polymind-desktop',
    workspaceDependencies: ['tests/kit', 'packages/frontend/electron-api'],
  },
  {
    location: 'tests/polymind-desktop-cloud',
    name: '@polymind-test/polymind-desktop-cloud',
    workspaceDependencies: ['tests/kit'],
  },
  {
    location: 'tests/polymind-local',
    name: '@polymind-test/polymind-local',
    workspaceDependencies: ['tests/kit', 'tools/cli', 'tools/utils'],
  },
  {
    location: 'tests/polymind-mobile',
    name: '@polymind-test/polymind-mobile',
    workspaceDependencies: ['tests/kit'],
  },
  {
    location: 'tools/@types/build-config',
    name: '@types/build-config',
    workspaceDependencies: [],
  },
  {
    location: 'tools/@types/env',
    name: '@types/polymind__env',
    workspaceDependencies: ['blocksuite/polymind/all', 'packages/common/env'],
  },
  {
    location: 'tools/changelog',
    name: '@polymind/changelog',
    workspaceDependencies: [],
  },
  {
    location: 'tools/cli',
    name: '@polymind-tools/cli',
    workspaceDependencies: ['tools/utils', 'packages/common/s3-compat'],
  },
  {
    location: 'tools/commitlint',
    name: '@polymind/commitlint-config',
    workspaceDependencies: [],
  },
  {
    location: 'tools/copilot-result',
    name: '@polymind/copilot-result',
    workspaceDependencies: [],
  },
  {
    location: 'tools/doc-diff',
    name: '@polymind/doc-diff',
    workspaceDependencies: ['tools/cli'],
  },
  {
    location: 'tools/revert-update',
    name: '@polymind/revert-update',
    workspaceDependencies: ['tools/cli'],
  },
  {
    location: 'tools/utils',
    name: '@polymind-tools/utils',
    workspaceDependencies: [],
  },
];

export type PackageName =
  | '@blocksuite/bs-docs'
  | '@blocksuite/global'
  | '@blocksuite/std'
  | '@blocksuite/store'
  | '@blocksuite/sync'
  | '@blocksuite/integration-test'
  | '@blocksuite/playground'
  | '@blocksuite/polymind'
  | '@blocksuite/polymind-block-attachment'
  | '@blocksuite/polymind-block-bookmark'
  | '@blocksuite/polymind-block-callout'
  | '@blocksuite/polymind-block-code'
  | '@blocksuite/polymind-block-data-view'
  | '@blocksuite/polymind-block-database'
  | '@blocksuite/polymind-block-divider'
  | '@blocksuite/polymind-block-edgeless-text'
  | '@blocksuite/polymind-block-embed'
  | '@blocksuite/polymind-block-embed-doc'
  | '@blocksuite/polymind-block-frame'
  | '@blocksuite/polymind-block-image'
  | '@blocksuite/polymind-block-latex'
  | '@blocksuite/polymind-block-list'
  | '@blocksuite/polymind-block-note'
  | '@blocksuite/polymind-block-paragraph'
  | '@blocksuite/polymind-block-root'
  | '@blocksuite/polymind-block-surface'
  | '@blocksuite/polymind-block-surface-ref'
  | '@blocksuite/polymind-block-table'
  | '@blocksuite/polymind-components'
  | '@blocksuite/data-view'
  | '@blocksuite/polymind-ext-loader'
  | '@blocksuite/polymind-foundation'
  | '@blocksuite/polymind-fragment-adapter-panel'
  | '@blocksuite/polymind-fragment-doc-title'
  | '@blocksuite/polymind-fragment-frame-panel'
  | '@blocksuite/polymind-fragment-outline'
  | '@blocksuite/polymind-gfx-brush'
  | '@blocksuite/polymind-gfx-connector'
  | '@blocksuite/polymind-gfx-group'
  | '@blocksuite/polymind-gfx-link'
  | '@blocksuite/polymind-gfx-mindmap'
  | '@blocksuite/polymind-gfx-note'
  | '@blocksuite/polymind-gfx-pointer'
  | '@blocksuite/polymind-gfx-shape'
  | '@blocksuite/polymind-gfx-template'
  | '@blocksuite/polymind-gfx-text'
  | '@blocksuite/polymind-gfx-turbo-renderer'
  | '@blocksuite/polymind-inline-comment'
  | '@blocksuite/polymind-inline-footnote'
  | '@blocksuite/polymind-inline-latex'
  | '@blocksuite/polymind-inline-link'
  | '@blocksuite/polymind-inline-mention'
  | '@blocksuite/polymind-inline-preset'
  | '@blocksuite/polymind-inline-reference'
  | '@blocksuite/polymind-model'
  | '@blocksuite/polymind-rich-text'
  | '@blocksuite/polymind-shared'
  | '@blocksuite/polymind-widget-drag-handle'
  | '@blocksuite/polymind-widget-edgeless-auto-connect'
  | '@blocksuite/polymind-widget-edgeless-dragging-area'
  | '@blocksuite/polymind-widget-edgeless-selected-rect'
  | '@blocksuite/polymind-widget-edgeless-toolbar'
  | '@blocksuite/polymind-widget-edgeless-zoom-toolbar'
  | '@blocksuite/polymind-widget-frame-title'
  | '@blocksuite/polymind-widget-keyboard-toolbar'
  | '@blocksuite/polymind-widget-linked-doc'
  | '@blocksuite/polymind-widget-note-slicer'
  | '@blocksuite/polymind-widget-page-dragging-area'
  | '@blocksuite/polymind-widget-remote-selection'
  | '@blocksuite/polymind-widget-scroll-anchoring'
  | '@blocksuite/polymind-widget-slash-menu'
  | '@blocksuite/polymind-widget-toolbar'
  | '@blocksuite/polymind-widget-viewport-overlay'
  | '@polymind/docs'
  | '@polymind/server-native'
  | '@polymind/server'
  | '@polymind/debug'
  | '@polymind/env'
  | '@polymind/error'
  | '@polymind/graphql'
  | '@toeverything/infra'
  | '@polymind/nbstore'
  | '@polymind/reader'
  | '@polymind/s3-compat'
  | '@polymind/electron'
  | '@polymind/electron-renderer'
  | '@polymind/mobile'
  | '@polymind/web'
  | '@polymind/component'
  | '@polymind/core'
  | '@polymind/electron-api'
  | '@polymind/i18n'
  | '@polymind/media-capture-playground'
  | '@polymind/native'
  | '@polymind/routes'
  | '@polymind/templates'
  | '@polymind-test/blocksuite'
  | '@polymind-test/kit'
  | '@polymind-test/polymind-cloud'
  | '@polymind-test/polymind-cloud-copilot'
  | '@polymind-test/polymind-desktop'
  | '@polymind-test/polymind-desktop-cloud'
  | '@polymind-test/polymind-local'
  | '@polymind-test/polymind-mobile'
  | '@types/build-config'
  | '@types/polymind__env'
  | '@polymind/changelog'
  | '@polymind-tools/cli'
  | '@polymind/commitlint-config'
  | '@polymind/copilot-result'
  | '@polymind/doc-diff'
  | '@polymind/revert-update'
  | '@polymind-tools/utils';
