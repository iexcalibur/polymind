import { PageDetailLoading } from '@affine/component/page-detail-skeleton';
import { PageDetailEditor } from '@affine/core/components/page-detail-editor';
import { DocsService } from '@affine/core/modules/doc';
import { EditorsService } from '@affine/core/modules/editor';
import { SpaceCanvasService } from '@affine/core/modules/space';
import { ViewService } from '@affine/core/modules/workbench/services/view';
import { FrameworkScope, useLiveData, useServices } from '@toeverything/infra';
import { useLayoutEffect, useState } from 'react';

import * as styles from './index.css';
import { useSpaceCanvasSync } from './use-space-canvas-sync';

/**
 * Renders the canvas (edgeless) view for a Space.
 *
 * - Gets/creates the hidden canvas doc via SpaceCanvasService
 * - Loads it in edgeless mode using the same DetailPageWrapper pattern
 * - Syncs Space docs to the canvas as embed-synced-doc blocks
 */
export const SpaceCanvasView = ({
  spaceId,
  spaceDocIds,
}: {
  spaceId: string;
  spaceDocIds: string[];
}) => {
  const { spaceCanvasService, docsService, viewService } = useServices({
    SpaceCanvasService,
    DocsService,
    ViewService,
  });

  const canvasDocId = spaceCanvasService.getOrCreateCanvasDoc(spaceId);
  const docRecord = useLiveData(docsService.list.doc$(canvasDocId));
  const docListReady = useLiveData(docsService.list.isReady$);

  const [doc, setDoc] = useState<
    ReturnType<typeof docsService.open>['doc'] | null
  >(null);
  const [editor, setEditor] = useState<ReturnType<
    typeof doc.scope.get<typeof EditorsService>
  > | null>(null);

  useLayoutEffect(() => {
    if (!docRecord) return;

    const { doc: loadedDoc, release } = docsService.open(canvasDocId);
    setDoc(loadedDoc);

    const editorsService = loadedDoc.scope.get(EditorsService);
    const newEditor = editorsService.createEditor();
    newEditor.bindWorkbenchView(viewService.view);
    // Force edgeless mode for the canvas doc
    newEditor.setMode('edgeless');
    setEditor(newEditor);

    return () => {
      newEditor.dispose();
      release();
    };
  }, [canvasDocId, docRecord, docsService, viewService.view]);

  // Sync Space docs to canvas embed blocks
  useSpaceCanvasSync(spaceDocIds, docRecord ? canvasDocId : null);

  if (!docListReady || !doc || !editor) {
    return <PageDetailLoading />;
  }

  return (
    <div className={styles.canvasViewContainer}>
      <FrameworkScope scope={doc.scope}>
        <FrameworkScope scope={editor.scope}>
          <PageDetailEditor />
        </FrameworkScope>
      </FrameworkScope>
    </div>
  );
};
