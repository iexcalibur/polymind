// Auto generated content
// DO NOT MODIFY THIS FILE MANUALLY
export const PackageList = [
  {
    location: 'blocksuite/docs',
    name: '@blockmind/bs-docs',
    workspaceDependencies: ['blocksuite/polymind/all'],
  },
  {
    location: 'blocksuite/framework/global',
    name: '@blockmind/global',
    workspaceDependencies: [],
  },
  {
    location: 'blocksuite/framework/std',
    name: '@blockmind/std',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/framework/store',
    name: '@blockmind/store',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/framework/sync',
    ],
  },
  {
    location: 'blocksuite/framework/sync',
    name: '@blockmind/sync',
    workspaceDependencies: ['blocksuite/framework/global'],
  },
  {
    location: 'blocksuite/integration-test',
    name: '@blockmind/integration-test',
    workspaceDependencies: ['blocksuite/polymind/all'],
  },
  {
    location: 'blocksuite/playground',
    name: '@blockmind/playground',
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
    name: '@blockmind/polymind',
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
    name: '@blockmind/polymind-block-attachment',
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
    name: '@blockmind/polymind-block-bookmark',
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
    name: '@blockmind/polymind-block-callout',
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
    name: '@blockmind/polymind-block-code',
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
    name: '@blockmind/polymind-block-data-view',
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
    name: '@blockmind/polymind-block-database',
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
    name: '@blockmind/polymind-block-divider',
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
    name: '@blockmind/polymind-block-edgeless-text',
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
    name: '@blockmind/polymind-block-embed',
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
    name: '@blockmind/polymind-block-embed-doc',
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
    name: '@blockmind/polymind-block-frame',
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
    name: '@blockmind/polymind-block-image',
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
    name: '@blockmind/polymind-block-latex',
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
    name: '@blockmind/polymind-block-list',
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
    name: '@blockmind/polymind-block-note',
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
    name: '@blockmind/polymind-block-paragraph',
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
    name: '@blockmind/polymind-block-root',
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
    name: '@blockmind/polymind-block-surface',
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
    name: '@blockmind/polymind-block-surface-ref',
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
    name: '@blockmind/polymind-block-table',
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
    name: '@blockmind/polymind-components',
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
    name: '@blockmind/data-view',
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
    name: '@blockmind/polymind-ext-loader',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/foundation',
    name: '@blockmind/polymind-foundation',
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
    name: '@blockmind/polymind-fragment-adapter-panel',
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
    name: '@blockmind/polymind-fragment-doc-title',
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
    name: '@blockmind/polymind-fragment-frame-panel',
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
    name: '@blockmind/polymind-fragment-outline',
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
    name: '@blockmind/polymind-gfx-brush',
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
    name: '@blockmind/polymind-gfx-connector',
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
    name: '@blockmind/polymind-gfx-group',
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
    name: '@blockmind/polymind-gfx-link',
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
    name: '@blockmind/polymind-gfx-mindmap',
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
    name: '@blockmind/polymind-gfx-note',
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
    name: '@blockmind/polymind-gfx-pointer',
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
    name: '@blockmind/polymind-gfx-shape',
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
    name: '@blockmind/polymind-gfx-template',
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
    name: '@blockmind/polymind-gfx-text',
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
    name: '@blockmind/polymind-gfx-turbo-renderer',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/inlines/comment',
    name: '@blockmind/polymind-inline-comment',
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
    name: '@blockmind/polymind-inline-footnote',
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
    name: '@blockmind/polymind-inline-latex',
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
    name: '@blockmind/polymind-inline-link',
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
    name: '@blockmind/polymind-inline-mention',
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
    name: '@blockmind/polymind-inline-preset',
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
    name: '@blockmind/polymind-inline-reference',
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
    name: '@blockmind/polymind-model',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/rich-text',
    name: '@blockmind/polymind-rich-text',
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
    name: '@blockmind/polymind-shared',
    workspaceDependencies: [
      'blocksuite/framework/global',
      'blocksuite/polymind/model',
      'blocksuite/framework/std',
      'blocksuite/framework/store',
    ],
  },
  {
    location: 'blocksuite/polymind/widgets/drag-handle',
    name: '@blockmind/polymind-widget-drag-handle',
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
    name: '@blockmind/polymind-widget-edgeless-auto-connect',
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
    name: '@blockmind/polymind-widget-edgeless-dragging-area',
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
    name: '@blockmind/polymind-widget-edgeless-selected-rect',
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
    name: '@blockmind/polymind-widget-edgeless-toolbar',
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
    name: '@blockmind/polymind-widget-edgeless-zoom-toolbar',
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
    name: '@blockmind/polymind-widget-frame-title',
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
    name: '@blockmind/polymind-widget-keyboard-toolbar',
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
    name: '@blockmind/polymind-widget-linked-doc',
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
    name: '@blockmind/polymind-widget-note-slicer',
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
    name: '@blockmind/polymind-widget-page-dragging-area',
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
    name: '@blockmind/polymind-widget-remote-selection',
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
    name: '@blockmind/polymind-widget-scroll-anchoring',
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
    name: '@blockmind/polymind-widget-slash-menu',
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
    name: '@blockmind/polymind-widget-toolbar',
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
    name: '@blockmind/polymind-widget-viewport-overlay',
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
  | '@blockmind/bs-docs'
  | '@blockmind/global'
  | '@blockmind/std'
  | '@blockmind/store'
  | '@blockmind/sync'
  | '@blockmind/integration-test'
  | '@blockmind/playground'
  | '@blockmind/polymind'
  | '@blockmind/polymind-block-attachment'
  | '@blockmind/polymind-block-bookmark'
  | '@blockmind/polymind-block-callout'
  | '@blockmind/polymind-block-code'
  | '@blockmind/polymind-block-data-view'
  | '@blockmind/polymind-block-database'
  | '@blockmind/polymind-block-divider'
  | '@blockmind/polymind-block-edgeless-text'
  | '@blockmind/polymind-block-embed'
  | '@blockmind/polymind-block-embed-doc'
  | '@blockmind/polymind-block-frame'
  | '@blockmind/polymind-block-image'
  | '@blockmind/polymind-block-latex'
  | '@blockmind/polymind-block-list'
  | '@blockmind/polymind-block-note'
  | '@blockmind/polymind-block-paragraph'
  | '@blockmind/polymind-block-root'
  | '@blockmind/polymind-block-surface'
  | '@blockmind/polymind-block-surface-ref'
  | '@blockmind/polymind-block-table'
  | '@blockmind/polymind-components'
  | '@blockmind/data-view'
  | '@blockmind/polymind-ext-loader'
  | '@blockmind/polymind-foundation'
  | '@blockmind/polymind-fragment-adapter-panel'
  | '@blockmind/polymind-fragment-doc-title'
  | '@blockmind/polymind-fragment-frame-panel'
  | '@blockmind/polymind-fragment-outline'
  | '@blockmind/polymind-gfx-brush'
  | '@blockmind/polymind-gfx-connector'
  | '@blockmind/polymind-gfx-group'
  | '@blockmind/polymind-gfx-link'
  | '@blockmind/polymind-gfx-mindmap'
  | '@blockmind/polymind-gfx-note'
  | '@blockmind/polymind-gfx-pointer'
  | '@blockmind/polymind-gfx-shape'
  | '@blockmind/polymind-gfx-template'
  | '@blockmind/polymind-gfx-text'
  | '@blockmind/polymind-gfx-turbo-renderer'
  | '@blockmind/polymind-inline-comment'
  | '@blockmind/polymind-inline-footnote'
  | '@blockmind/polymind-inline-latex'
  | '@blockmind/polymind-inline-link'
  | '@blockmind/polymind-inline-mention'
  | '@blockmind/polymind-inline-preset'
  | '@blockmind/polymind-inline-reference'
  | '@blockmind/polymind-model'
  | '@blockmind/polymind-rich-text'
  | '@blockmind/polymind-shared'
  | '@blockmind/polymind-widget-drag-handle'
  | '@blockmind/polymind-widget-edgeless-auto-connect'
  | '@blockmind/polymind-widget-edgeless-dragging-area'
  | '@blockmind/polymind-widget-edgeless-selected-rect'
  | '@blockmind/polymind-widget-edgeless-toolbar'
  | '@blockmind/polymind-widget-edgeless-zoom-toolbar'
  | '@blockmind/polymind-widget-frame-title'
  | '@blockmind/polymind-widget-keyboard-toolbar'
  | '@blockmind/polymind-widget-linked-doc'
  | '@blockmind/polymind-widget-note-slicer'
  | '@blockmind/polymind-widget-page-dragging-area'
  | '@blockmind/polymind-widget-remote-selection'
  | '@blockmind/polymind-widget-scroll-anchoring'
  | '@blockmind/polymind-widget-slash-menu'
  | '@blockmind/polymind-widget-toolbar'
  | '@blockmind/polymind-widget-viewport-overlay'
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
