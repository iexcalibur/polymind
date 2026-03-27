import { Header } from '@affine/core/components/pure/header';
import type { DumpItemRecord } from '@affine/core/modules/dump';
import { DumpService } from '@affine/core/modules/dump';
import { SpaceService } from '@affine/core/modules/space';
import {
  ViewBody,
  ViewHeader,
  ViewIcon,
  ViewTitle,
  WorkbenchService,
} from '@affine/core/modules/workbench';
import { useLiveData, useServices } from '@toeverything/infra';
import {
  type DragEvent,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import * as styles from './index.css';

// ─── Capture bar ──────────────────────────────────────────────────────────────

const CaptureBar = ({
  onCaptureText,
  onCaptureUrl,
}: {
  onCaptureText: (text: string) => void;
  onCaptureUrl: (url: string) => void;
}) => {
  const [mode, setMode] = useState<'text' | 'url'>('text');
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(() => {
    const v = value.trim();
    if (!v) return;
    if (mode === 'url') {
      onCaptureUrl(v);
    } else {
      onCaptureText(v);
    }
    setValue('');
  }, [value, mode, onCaptureText, onCaptureUrl]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') handleSubmit();
    },
    [handleSubmit]
  );

  return (
    <div className={styles.captureBar}>
      <div className={styles.captureTabs}>
        <button
          className={styles.captureTab}
          data-active={mode === 'text'}
          onClick={() => {
            setMode('text');
            inputRef.current?.focus();
          }}
        >
          Text
        </button>
        <button
          className={styles.captureTab}
          data-active={mode === 'url'}
          onClick={() => {
            setMode('url');
            inputRef.current?.focus();
          }}
        >
          URL
        </button>
      </div>
      <input
        ref={inputRef}
        className={styles.captureInput}
        placeholder={mode === 'url' ? 'Paste a URL…' : 'Type or paste text…'}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className={styles.captureSubmit}
        onClick={handleSubmit}
        disabled={!value.trim()}
      >
        Capture
      </button>
    </div>
  );
};

// ─── Drop zone ────────────────────────────────────────────────────────────────

const DropZone = ({ onCapture }: { onCapture: (dataUrl: string) => void }) => {
  const [dragging, setDragging] = useState(false);
  const [processing, setProcessing] = useState(false);

  const readFile = useCallback(
    async (file: File) => {
      return new Promise<void>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          onCapture(reader.result as string);
          resolve();
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    },
    [onCapture]
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (!file?.type.startsWith('image/')) return;
      setProcessing(true);
      readFile(file)
        .catch(console.error)
        .finally(() => setProcessing(false));
    },
    [readFile]
  );

  return (
    <div
      className={styles.dropZone}
      data-dragging={dragging}
      onDragOver={e => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      {processing ? (
        <span className={styles.dropZoneText}>Sending to Claude Vision…</span>
      ) : (
        <>
          <span className={styles.dropZoneIcon}>📷</span>
          <span className={styles.dropZoneText}>
            Drop a screenshot here
            <br />
            <small>or paste with Ctrl/Cmd+V anywhere on this page</small>
          </span>
        </>
      )}
    </div>
  );
};

// ─── Dump Item card ───────────────────────────────────────────────────────────

const DumpItemCard = ({
  item,
  spaceName,
  onMove,
  onDelete,
}: {
  item: DumpItemRecord;
  spaceName: string | null;
  onMove: (spaceId: string) => void;
  onDelete: () => void;
}) => {
  const { spaceService } = useServices({ SpaceService });
  const spaces = useLiveData(spaceService.spaces$);
  const [expanded, setExpanded] = useState(false);
  const [showSpacePicker, setShowSpacePicker] = useState(false);

  const typeIcon =
    item.type === 'image' ? '📷' : item.type === 'url' ? '🔗' : '📝';
  const preview =
    item.content.slice(0, 120) + (item.content.length > 120 ? '…' : '');
  const isMovedOut = !!item.movedToSpaceId;

  return (
    <div className={styles.dumpCard} data-moved={isMovedOut}>
      <div className={styles.dumpCardHeader}>
        <span className={styles.dumpCardIcon}>{typeIcon}</span>
        <span
          className={styles.dumpCardPreview}
          onClick={() => setExpanded(e => !e)}
        >
          {item.content
            ? preview
            : item.isProcessed === false
              ? 'Processing…'
              : '(empty)'}
        </span>
        <div className={styles.dumpCardActions}>
          {!isMovedOut && spaceName && (
            <button
              className={styles.dumpCardBadge}
              onClick={() => setShowSpacePicker(s => !s)}
              title={`Suggested: ${spaceName}`}
            >
              → {spaceName}
            </button>
          )}
          {!isMovedOut && !spaceName && item.isProcessed && (
            <button
              className={styles.dumpCardBadge}
              data-unsorted
              onClick={() => setShowSpacePicker(s => !s)}
            >
              Pick Space
            </button>
          )}
          {isMovedOut && <span className={styles.dumpCardMoved}>✓ Moved</span>}
          <button
            className={styles.dumpCardDelete}
            onClick={onDelete}
            title="Dismiss"
          >
            ×
          </button>
        </div>
      </div>

      {expanded && item.content && (
        <pre className={styles.dumpCardFull}>{item.content}</pre>
      )}

      {showSpacePicker && !isMovedOut && (
        <div className={styles.spacePicker}>
          {spaces.map(s => (
            <button
              key={s.id}
              className={styles.spacePickerItem}
              data-suggested={s.id === item.suggestedSpaceId}
              onClick={() => {
                onMove(s.id);
                setShowSpacePicker(false);
              }}
            >
              {s.name$.value}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Main page component ──────────────────────────────────────────────────────

export const Component = function DumpZonePage() {
  const { dumpService, workbenchService, spaceService } = useServices({
    DumpService,
    WorkbenchService,
    SpaceService,
  });

  const workbench = workbenchService.workbench;
  const items = useLiveData(dumpService.allItems$());
  const spaces = useLiveData(spaceService.spaces$);
  const spaceMap = useCallback(
    (id: string | undefined) => {
      if (!id) return null;
      const s = spaces.find(sp => sp.id === id);
      return s ? s.name$.value : null;
    },
    [spaces]
  );

  // ── Paste handler ────────────────────────────────────────────────────

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of Array.from(items)) {
        if (item.type.startsWith('image/')) {
          e.preventDefault();
          const file = item.getAsFile();
          if (!file) continue;
          const reader = new FileReader();
          reader.onload = () => {
            dumpService.captureImage(reader.result as string);
          };
          reader.readAsDataURL(file);
          return;
        }
      }
      // Text paste is handled by the capture bar input directly
    };
    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [dumpService]);

  // ── Actions ──────────────────────────────────────────────────────────

  const handleMove = useCallback(
    (itemId: string, spaceId: string) => {
      const docId = dumpService.moveToSpace(itemId, spaceId);
      workbench.openDoc(docId);
    },
    [dumpService, workbench]
  );

  const pendingCount = items.filter(i => !i.movedToSpaceId).length;

  return (
    <>
      <ViewIcon icon="folder" />
      <ViewTitle title="Inbox" />
      <ViewHeader>
        <Header
          centerContent={
            <span className={styles.pageTitle}>
              Inbox
              {pendingCount > 0 && (
                <span className={styles.pendingBadge}>{pendingCount}</span>
              )}
            </span>
          }
        />
      </ViewHeader>
      <ViewBody>
        <div className={styles.dumpPage}>
          {/* Screenshot drop zone */}
          <DropZone onCapture={dataUrl => dumpService.captureImage(dataUrl)} />

          {/* Text / URL capture bar */}
          <CaptureBar
            onCaptureText={text => dumpService.captureText(text)}
            onCaptureUrl={url => dumpService.captureUrl(url)}
          />

          {/* Items list */}
          <div className={styles.itemsList}>
            {items.length === 0 && (
              <div className={styles.emptyState}>
                <div className={styles.emptyStateTitle}>
                  Your inbox is empty
                </div>
                <p className={styles.emptyStateDesc}>
                  Drop screenshots, paste text, or capture URLs here. Claude
                  will OCR images and suggest which Space each capture belongs
                  to.
                </p>
              </div>
            )}
            {items.map(item => (
              <DumpItemCard
                key={item.id}
                item={item}
                spaceName={spaceMap(item.suggestedSpaceId)}
                onMove={spaceId => handleMove(item.id, spaceId)}
                onDelete={() => dumpService.deleteItem(item.id)}
              />
            ))}
          </div>
        </div>
      </ViewBody>
    </>
  );
};
