import { AttachmentStoreExtension } from '@blocksuite/polymind-block-attachment/store';
import { BookmarkStoreExtension } from '@blocksuite/polymind-block-bookmark/store';
import { CalloutStoreExtension } from '@blocksuite/polymind-block-callout/store';
import { CodeStoreExtension } from '@blocksuite/polymind-block-code/store';
import { DataViewStoreExtension } from '@blocksuite/polymind-block-data-view/store';
import { DatabaseStoreExtension } from '@blocksuite/polymind-block-database/store';
import { DividerStoreExtension } from '@blocksuite/polymind-block-divider/store';
import { EdgelessTextStoreExtension } from '@blocksuite/polymind-block-edgeless-text/store';
import { EmbedStoreExtension } from '@blocksuite/polymind-block-embed/store';
import { EmbedDocStoreExtension } from '@blocksuite/polymind-block-embed-doc/store';
import { FrameStoreExtension } from '@blocksuite/polymind-block-frame/store';
import { ImageStoreExtension } from '@blocksuite/polymind-block-image/store';
import { LatexStoreExtension } from '@blocksuite/polymind-block-latex/store';
import { ListStoreExtension } from '@blocksuite/polymind-block-list/store';
import { NoteStoreExtension } from '@blocksuite/polymind-block-note/store';
import { ParagraphStoreExtension } from '@blocksuite/polymind-block-paragraph/store';
import { RootStoreExtension } from '@blocksuite/polymind-block-root/store';
import { SurfaceStoreExtension } from '@blocksuite/polymind-block-surface/store';
import { SurfaceRefStoreExtension } from '@blocksuite/polymind-block-surface-ref/store';
import { TableStoreExtension } from '@blocksuite/polymind-block-table/store';
import { FoundationStoreExtension } from '@blocksuite/polymind-foundation/store';
import { BrushStoreExtension } from '@blocksuite/polymind-gfx-brush/store';
import { ConnectorStoreExtension } from '@blocksuite/polymind-gfx-connector/store';
import { GroupStoreExtension } from '@blocksuite/polymind-gfx-group/store';
import { MindmapStoreExtension } from '@blocksuite/polymind-gfx-mindmap/store';
import { ShapeStoreExtension } from '@blocksuite/polymind-gfx-shape/store';
import { TextStoreExtension } from '@blocksuite/polymind-gfx-text/store';
import { FootnoteStoreExtension } from '@blocksuite/polymind-inline-footnote/store';
import { LatexStoreExtension as InlineLatexStoreExtension } from '@blocksuite/polymind-inline-latex/store';
import { LinkStoreExtension } from '@blocksuite/polymind-inline-link/store';
import { InlinePresetStoreExtension } from '@blocksuite/polymind-inline-preset/store';
import { ReferenceStoreExtension } from '@blocksuite/polymind-inline-reference/store';

export function getInternalStoreExtensions() {
  return [
    FoundationStoreExtension,

    AttachmentStoreExtension,
    BookmarkStoreExtension,
    CalloutStoreExtension,
    CodeStoreExtension,
    DataViewStoreExtension,
    DatabaseStoreExtension,
    DividerStoreExtension,
    EdgelessTextStoreExtension,
    EmbedStoreExtension,
    EmbedDocStoreExtension,
    FrameStoreExtension,
    ImageStoreExtension,
    LatexStoreExtension,
    ListStoreExtension,
    NoteStoreExtension,
    ParagraphStoreExtension,
    SurfaceRefStoreExtension,
    TableStoreExtension,
    SurfaceStoreExtension,
    RootStoreExtension,

    FootnoteStoreExtension,
    LinkStoreExtension,
    ReferenceStoreExtension,
    InlineLatexStoreExtension,
    InlinePresetStoreExtension,

    BrushStoreExtension,
    ShapeStoreExtension,
    MindmapStoreExtension,
    ConnectorStoreExtension,
    GroupStoreExtension,
    TextStoreExtension,
  ];
}
