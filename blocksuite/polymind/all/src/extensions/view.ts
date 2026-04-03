import { AttachmentViewExtension } from '@blocksuite/polymind-block-attachment/view';
import { BookmarkViewExtension } from '@blocksuite/polymind-block-bookmark/view';
import { CalloutViewExtension } from '@blocksuite/polymind-block-callout/view';
import { CodeBlockViewExtension } from '@blocksuite/polymind-block-code/view';
import { DataViewViewExtension } from '@blocksuite/polymind-block-data-view/view';
import { DatabaseViewExtension } from '@blocksuite/polymind-block-database/view';
import { DividerViewExtension } from '@blocksuite/polymind-block-divider/view';
import { EdgelessTextViewExtension } from '@blocksuite/polymind-block-edgeless-text/view';
import { EmbedViewExtension } from '@blocksuite/polymind-block-embed/view';
import { EmbedDocViewExtension } from '@blocksuite/polymind-block-embed-doc/view';
import { FrameViewExtension } from '@blocksuite/polymind-block-frame/view';
import { ImageViewExtension } from '@blocksuite/polymind-block-image/view';
import { LatexViewExtension } from '@blocksuite/polymind-block-latex/view';
import { ListViewExtension } from '@blocksuite/polymind-block-list/view';
import { NoteViewExtension } from '@blocksuite/polymind-block-note/view';
import { ParagraphViewExtension } from '@blocksuite/polymind-block-paragraph/view';
import { RootViewExtension } from '@blocksuite/polymind-block-root/view';
import { SurfaceViewExtension } from '@blocksuite/polymind-block-surface/view';
import { SurfaceRefViewExtension } from '@blocksuite/polymind-block-surface-ref/view';
import { TableViewExtension } from '@blocksuite/polymind-block-table/view';
import { FoundationViewExtension } from '@blocksuite/polymind-foundation/view';
import { AdapterPanelViewExtension } from '@blocksuite/polymind-fragment-adapter-panel/view';
import { DocTitleViewExtension } from '@blocksuite/polymind-fragment-doc-title/view';
import { FramePanelViewExtension } from '@blocksuite/polymind-fragment-frame-panel/view';
import { OutlineViewExtension } from '@blocksuite/polymind-fragment-outline/view';
import { BrushViewExtension } from '@blocksuite/polymind-gfx-brush/view';
import { ConnectorViewExtension } from '@blocksuite/polymind-gfx-connector/view';
import { GroupViewExtension } from '@blocksuite/polymind-gfx-group/view';
import { LinkViewExtension as GfxLinkViewExtension } from '@blocksuite/polymind-gfx-link/view';
import { MindmapViewExtension } from '@blocksuite/polymind-gfx-mindmap/view';
import { NoteViewExtension as GfxNoteViewExtension } from '@blocksuite/polymind-gfx-note/view';
import { PointerViewExtension } from '@blocksuite/polymind-gfx-pointer/view';
import { ShapeViewExtension } from '@blocksuite/polymind-gfx-shape/view';
import { TemplateViewExtension } from '@blocksuite/polymind-gfx-template/view';
import { TextViewExtension } from '@blocksuite/polymind-gfx-text/view';
import { InlineCommentViewExtension } from '@blocksuite/polymind-inline-comment/view';
import { FootnoteViewExtension } from '@blocksuite/polymind-inline-footnote/view';
import { LatexViewExtension as InlineLatexViewExtension } from '@blocksuite/polymind-inline-latex/view';
import { LinkViewExtension } from '@blocksuite/polymind-inline-link/view';
import { MentionViewExtension } from '@blocksuite/polymind-inline-mention/view';
import { InlinePresetViewExtension } from '@blocksuite/polymind-inline-preset/view';
import { ReferenceViewExtension } from '@blocksuite/polymind-inline-reference/view';
import { DragHandleViewExtension } from '@blocksuite/polymind-widget-drag-handle/view';
import { EdgelessAutoConnectViewExtension } from '@blocksuite/polymind-widget-edgeless-auto-connect/view';
import { EdgelessDraggingAreaViewExtension } from '@blocksuite/polymind-widget-edgeless-dragging-area/view';
import { EdgelessSelectedRectViewExtension } from '@blocksuite/polymind-widget-edgeless-selected-rect/view';
import { EdgelessToolbarViewExtension } from '@blocksuite/polymind-widget-edgeless-toolbar/view';
import { EdgelessZoomToolbarViewExtension } from '@blocksuite/polymind-widget-edgeless-zoom-toolbar/view';
import { FrameTitleViewExtension } from '@blocksuite/polymind-widget-frame-title/view';
import { KeyboardToolbarViewExtension } from '@blocksuite/polymind-widget-keyboard-toolbar/view';
import { LinkedDocViewExtension } from '@blocksuite/polymind-widget-linked-doc/view';
import { NoteSlicerViewExtension } from '@blocksuite/polymind-widget-note-slicer/view';
import { PageDraggingAreaViewExtension } from '@blocksuite/polymind-widget-page-dragging-area/view';
import { RemoteSelectionViewExtension } from '@blocksuite/polymind-widget-remote-selection/view';
import { ScrollAnchoringViewExtension } from '@blocksuite/polymind-widget-scroll-anchoring/view';
import { SlashMenuViewExtension } from '@blocksuite/polymind-widget-slash-menu/view';
import { ToolbarViewExtension } from '@blocksuite/polymind-widget-toolbar/view';
import { ViewportOverlayViewExtension } from '@blocksuite/polymind-widget-viewport-overlay/view';

export function getInternalViewExtensions() {
  return [
    FoundationViewExtension,

    // Gfx
    PointerViewExtension,
    GfxNoteViewExtension,
    BrushViewExtension,
    ShapeViewExtension,
    MindmapViewExtension,
    ConnectorViewExtension,
    GroupViewExtension,
    TextViewExtension,
    TemplateViewExtension,
    GfxLinkViewExtension,

    // Block
    AttachmentViewExtension,
    BookmarkViewExtension,
    CalloutViewExtension,
    CodeBlockViewExtension,
    DataViewViewExtension,
    DatabaseViewExtension,
    DividerViewExtension,
    EdgelessTextViewExtension,
    EmbedViewExtension,
    EmbedDocViewExtension,
    FrameViewExtension,
    ImageViewExtension,
    LatexViewExtension,
    ListViewExtension,
    NoteViewExtension,
    ParagraphViewExtension,
    SurfaceRefViewExtension,
    TableViewExtension,
    SurfaceViewExtension,
    RootViewExtension,

    // Inline
    InlineCommentViewExtension,
    FootnoteViewExtension,
    LinkViewExtension,
    ReferenceViewExtension,
    InlineLatexViewExtension,
    MentionViewExtension,
    InlinePresetViewExtension,

    // Widget
    // order will affect the z-index of the widget
    DragHandleViewExtension,
    EdgelessAutoConnectViewExtension,
    FrameTitleViewExtension,
    KeyboardToolbarViewExtension,
    LinkedDocViewExtension,
    RemoteSelectionViewExtension,
    ScrollAnchoringViewExtension,
    SlashMenuViewExtension,
    ToolbarViewExtension,
    ViewportOverlayViewExtension,
    EdgelessZoomToolbarViewExtension,
    PageDraggingAreaViewExtension,
    EdgelessSelectedRectViewExtension,
    EdgelessDraggingAreaViewExtension,
    NoteSlicerViewExtension,
    EdgelessToolbarViewExtension,

    // Fragment
    DocTitleViewExtension,
    FramePanelViewExtension,
    OutlineViewExtension,
    AdapterPanelViewExtension,
  ];
}
