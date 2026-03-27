import { DocsService } from '@affine/core/modules/doc';
import { useService } from '@toeverything/infra';
import { useEffect, useRef } from 'react';

/**
 * Grid layout constants for embedding docs on the canvas.
 */
const EMBED_COLS = 3;
const EMBED_WIDTH = 752;
const EMBED_HEIGHT = 455;
const EMBED_GAP_X = 850;
const EMBED_GAP_Y = 520;

function computePosition(index: number): string {
  const col = index % EMBED_COLS;
  const row = Math.floor(index / EMBED_COLS);
  const x = col * EMBED_GAP_X;
  const y = row * EMBED_GAP_Y;
  return `[${x}, ${y}, ${EMBED_WIDTH}, ${EMBED_HEIGHT}]`;
}

/**
 * Syncs folder/space doc IDs → canvas embed blocks.
 *
 * One-way sync: Space doc list drives the canvas.
 * Users can add connectors, shapes, and reposition freely.
 * Docs removed from the Space will have their embed block removed.
 */
export function useSpaceCanvasSync(
  spaceDocIds: string[],
  canvasDocId: string | null
) {
  const docsService = useService(DocsService);
  // Track which docIds we have already embedded to avoid re-adding them.
  const embeddedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!canvasDocId) return;

    const canvasBsDoc = docsService.list.doc$(canvasDocId).value?.id
      ? docsService['store'].getBlockSuiteDoc(canvasDocId)
      : null;

    if (!canvasBsDoc) return;

    // Ensure the doc is loaded
    canvasBsDoc.load();

    const root = canvasBsDoc.root;
    if (!root) return;

    // Find or create the surface block
    let surface = canvasBsDoc.getBlocksByFlavour('affine:surface')[0];
    if (!surface) {
      canvasBsDoc.addBlock('affine:surface' as never, {}, root.id);
      surface = canvasBsDoc.getBlocksByFlavour('affine:surface')[0];
    }
    if (!surface) return;

    // Get existing embed-synced-doc blocks on the canvas
    const existingEmbeds = canvasBsDoc.getBlocksByFlavour(
      'affine:embed-synced-doc'
    ) as Array<{ id: string; props: { pageId: string } }>;

    const existingPageIds = new Set(existingEmbeds.map(b => b.props.pageId));

    // Add new docs that aren't yet on the canvas
    const newDocIds = spaceDocIds.filter(id => !existingPageIds.has(id));
    const allEmbeddedCount = existingEmbeds.length;

    newDocIds.forEach((docId, i) => {
      if (embeddedRef.current.has(docId)) return;
      const index = allEmbeddedCount + i;
      canvasBsDoc.addBlock(
        'affine:embed-synced-doc' as never,
        {
          pageId: docId,
          xywh: computePosition(index),
        },
        surface.id
      );
      embeddedRef.current.add(docId);
    });

    // Remove embed blocks for docs no longer in the space
    const spaceDocSet = new Set(spaceDocIds);
    existingEmbeds.forEach(embed => {
      if (!spaceDocSet.has(embed.props.pageId)) {
        const block = canvasBsDoc.getBlock(embed.id);
        if (block) canvasBsDoc.deleteBlock(block.model);
        embeddedRef.current.delete(embed.props.pageId);
      }
    });
  }, [spaceDocIds, canvasDocId, docsService]);
}
