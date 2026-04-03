import 'katex/dist/katex.min.css';

import { useConfirmModal, useLitPortalFactory } from '@polymind/component';
import {
  type EdgelessEditor,
  LitDocEditor,
  LitDocTitle,
  LitEdgelessEditor,
  type PageEditor,
} from '@polymind/core/blocksuite/editors';
import { getViewManager } from '@polymind/core/blocksuite/manager/view';
import { useEnableAI } from '@polymind/core/components/hooks/polymind/use-enable-ai';
import type { DocCustomPropertyInfo } from '@polymind/core/modules/db';
import type {
  DatabaseRow,
  DatabaseValueCell,
} from '@polymind/core/modules/doc-info/types';
import { EditorSettingService } from '@polymind/core/modules/editor-setting';
import { FeatureFlagService } from '@polymind/core/modules/feature-flag';
import { JournalService } from '@polymind/core/modules/journal';
import { useInsidePeekView } from '@polymind/core/modules/peek-view';
import { WorkspaceService } from '@polymind/core/modules/workspace';
import { ServerFeature } from '@polymind/graphql';
import type { DocTitle } from '@blocksuite/polymind/fragments/doc-title';
import type { DocMode } from '@blocksuite/polymind/model';
import type { Store } from '@blocksuite/polymind/store';
import {
  useFramework,
  useLiveData,
  useService,
  useServices,
} from '@toeverything/infra';
import type React from 'react';
import {
  forwardRef,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import {
  type DefaultOpenProperty,
  WorkspacePropertiesTable,
} from '../../components/properties';
import { BiDirectionalLinkPanel } from './bi-directional-link-panel';
import { DocIconPicker } from './doc-icon-picker';
import { BlocksuiteEditorJournalDocTitle } from './journal-doc-title';
import { StarterBar } from './starter-bar';
import * as styles from './styles.css';

interface BlocksuiteEditorProps {
  page: Store;
  readonly?: boolean;
  shared?: boolean;
  defaultOpenProperty?: DefaultOpenProperty;
}

const usePatchSpecs = (mode: DocMode, shared?: boolean) => {
  const [reactToLit, portals] = useLitPortalFactory();
  const { workspaceService, featureFlagService } = useServices({
    WorkspaceService,
    FeatureFlagService,
  });
  const isCloud = workspaceService.workspace.flavour !== 'local';
  const framework = useFramework();

  const confirmModal = useConfirmModal();

  const enableAI = useEnableAI();

  const isInPeekView = useInsidePeekView();

  const enableTurboRenderer = useLiveData(
    featureFlagService.flags.enable_turbo_renderer.$
  );

  const enablePDFEmbedPreview = useLiveData(
    featureFlagService.flags.enable_pdf_embed_preview.$
  );

  const enableComment = false;

  const patchedSpecs = useMemo(() => {
    const manager = getViewManager()
      .config.init()
      .foundation(framework)
      .ai(enableAI, framework)
      .theme(framework)
      .editorConfig(framework)
      .editorView({
        framework,
        reactToLit,
        confirmModal,
      })
      .cloud(framework, isCloud)
      .turboRenderer(enableTurboRenderer)
      .pdf(enablePDFEmbedPreview, reactToLit)
      .edgelessBlockHeader({
        framework,
        isInPeekView,
        reactToLit,
      })
      .database(framework)
      .linkedDoc(framework)
      .paragraph(enableAI)
      .mobile(framework)
      .electron(framework)
      .linkPreview(framework)
      .codeBlockPreview(framework)
      .iconPicker(framework)
      .comment(enableComment, framework).value;

    if (BUILD_CONFIG.isMobileEdition) {
      if (mode === 'page') {
        return manager.get('mobile-page');
      } else {
        return manager.get('mobile-edgeless');
      }
    } else {
      return manager.get(mode);
    }
  }, [
    confirmModal,
    enableAI,
    enablePDFEmbedPreview,
    enableTurboRenderer,
    enableComment,
    framework,
    isInPeekView,
    isCloud,
    mode,
    reactToLit,
  ]);

  return [
    patchedSpecs,
    useMemo(
      () => (
        <>
          {portals.map(p => (
            <Fragment key={p.id}>{p.portal}</Fragment>
          ))}
        </>
      ),
      [portals]
    ),
  ] as const;
};

export const BlocksuiteDocEditor = forwardRef<
  PageEditor,
  BlocksuiteEditorProps & {
    onClickBlank?: () => void;
    titleRef?: React.Ref<DocTitle>;
  }
>(function BlocksuiteDocEditor(
  {
    page,
    shared,
    onClickBlank,
    titleRef: externalTitleRef,
    defaultOpenProperty,
    readonly,
  },
  ref
) {
  const titleRef = useRef<DocTitle | null>(null);
  const docRef = useRef<PageEditor | null>(null);
  const journalService = useService(JournalService);
  const isJournal = !!useLiveData(journalService.journalDate$(page.id));

  const editorSettingService = useService(EditorSettingService);

  const onDocRef = useCallback(
    (el: PageEditor) => {
      docRef.current = el;
      if (ref) {
        if (typeof ref === 'function') {
          ref(el);
        } else {
          ref.current = el;
        }
      }
    },
    [ref]
  );

  const onTitleRef = useCallback(
    (el: DocTitle) => {
      titleRef.current = el;
      if (externalTitleRef) {
        if (typeof externalTitleRef === 'function') {
          externalTitleRef(el);
        } else {
          externalTitleRef.current = el;
        }
      }
    },
    [externalTitleRef]
  );

  const [specs, portals] = usePatchSpecs('page', shared);

  const displayBiDirectionalLink = useLiveData(
    editorSettingService.editorSetting.settings$.selector(
      s => s.displayBiDirectionalLink
    )
  );

  const displayDocInfo = useLiveData(
    editorSettingService.editorSetting.settings$.selector(s => s.displayDocInfo)
  );

  const onPropertyChange = useCallback((_property: DocCustomPropertyInfo) => {
    // property change handler
  }, []);

  const onPropertyAdded = useCallback((_property: DocCustomPropertyInfo) => {
    // property added handler
  }, []);

  const onDatabasePropertyChange = useCallback(
    (_row: DatabaseRow, _cell: DatabaseValueCell) => {
      // database property change handler
    },
    []
  );

  const onPropertyInfoChange = useCallback(
    (_property: DocCustomPropertyInfo, _field: string) => {
      // property info change handler
    },
    []
  );

  return (
    <>
      <div className={styles.affineDocViewport}>
        {!BUILD_CONFIG.isMobileEdition ? (
          <DocIconPicker docId={page.id} readonly={readonly || shared} />
        ) : null}
        {!isJournal ? (
          <LitDocTitle doc={page} ref={onTitleRef} />
        ) : (
          <BlocksuiteEditorJournalDocTitle page={page} />
        )}
        {!shared && displayDocInfo ? (
          <div className={styles.docPropertiesTableContainer}>
            <WorkspacePropertiesTable
              className={styles.docPropertiesTable}
              onDatabasePropertyChange={onDatabasePropertyChange}
              onPropertyChange={onPropertyChange}
              onPropertyAdded={onPropertyAdded}
              onPropertyInfoChange={onPropertyInfoChange}
              defaultOpenProperty={defaultOpenProperty}
            />
          </div>
        ) : null}
        <LitDocEditor
          className={styles.docContainer}
          ref={onDocRef}
          doc={page}
          specs={specs}
        />
        <div
          className={styles.docEditorGap}
          data-testid="page-editor-blank"
          onClick={onClickBlank}
        ></div>
        {!readonly && !BUILD_CONFIG.isMobileEdition && (
          <StarterBar doc={page} />
        )}
        {!shared && displayBiDirectionalLink ? (
          <BiDirectionalLinkPanel />
        ) : null}
      </div>
      {portals}
    </>
  );
});
export const BlocksuiteEdgelessEditor = forwardRef<
  EdgelessEditor,
  BlocksuiteEditorProps
>(function BlocksuiteEdgelessEditor({ page }, ref) {
  const [specs, portals] = usePatchSpecs('edgeless');
  const editorRef = useRef<EdgelessEditor | null>(null);

  const onDocRef = useCallback(
    (el: EdgelessEditor) => {
      editorRef.current = el;
      if (ref) {
        if (typeof ref === 'function') {
          ref(el);
        } else {
          ref.current = el;
        }
      }
    },
    [ref]
  );

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateComplete
        .then(() => {
          // make sure editor can get keyboard events on showing up
          editorRef.current
            ?.querySelector<HTMLElement>('polymind-edgeless-root')
            ?.click();
        })
        .catch(console.error);
    }
  }, []);

  return (
    <div className={styles.affineEdgelessDocViewport}>
      <LitEdgelessEditor ref={onDocRef} doc={page} specs={specs} />
      {portals}
    </div>
  );
});
