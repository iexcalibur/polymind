import { Header } from '@affine/core/components/pure/header';
import { SpaceService } from '@affine/core/modules/space';
import {
  ViewBody,
  ViewHeader,
  ViewIcon,
  ViewTitle,
  WorkbenchService,
} from '@affine/core/modules/workbench';
import { useLiveData, useServices } from '@toeverything/infra';
import { useCallback, useEffect, useRef, useState } from 'react';

import * as styles from './index.css';

/** Default grid layout for initial Space card positions */
function defaultPosition(index: number) {
  const col = index % 3;
  const row = Math.floor(index / 3);
  return { x: 80 + col * 280, y: 80 + row * 200 };
}

interface SpacePosition {
  spaceId: string;
  x: number;
  y: number;
}

const SETTINGS_KEY = 'universeCanvasPositions';

export const Component = function SpacesPage() {
  const { spaceService, workbenchService } = useServices({
    SpaceService,
    WorkbenchService,
  });

  const spaces = useLiveData(spaceService.spaces$);

  // Load persisted positions or compute defaults
  const [positions, setPositions] = useState<SpacePosition[]>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // When new spaces are added, give them a default position
  useEffect(() => {
    setPositions(prev => {
      const existing = new Map(prev.map(p => [p.spaceId, p]));
      let changed = false;
      const next = spaces.map((space, i) => {
        const existingPos = existing.get(space.id);
        if (existingPos) return existingPos;
        changed = true;
        return { spaceId: space.id, ...defaultPosition(i) };
      });
      if (!changed && prev.length === next.length) return prev;
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
      return next;
    });
  }, [spaces]);

  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState<string | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const lastPan = useRef({ x: 0, y: 0 });
  const isPanning = useRef(false);

  // Navigate to space on click (only if not dragged)
  const handleSpaceClick = useCallback(
    (spaceId: string) => {
      workbenchService.workbench.openSpace(spaceId);
    },
    [workbenchService]
  );

  // Drag to reposition Space cards
  const handleMouseDownCard = useCallback(
    (e: React.MouseEvent, spaceId: string) => {
      e.stopPropagation();
      const pos = positions.find(p => p.spaceId === spaceId);
      if (!pos) return;
      dragOffset.current = {
        x: e.clientX / zoom - pos.x,
        y: e.clientY / zoom - pos.y,
      };
      setDragging(spaceId);

      const onMouseMove = (ev: MouseEvent) => {
        setPositions(prev => {
          const next = prev.map(p =>
            p.spaceId === spaceId
              ? {
                  ...p,
                  x: ev.clientX / zoom - dragOffset.current.x,
                  y: ev.clientY / zoom - dragOffset.current.y,
                }
              : p
          );
          localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
          return next;
        });
      };

      const onMouseUp = () => {
        setDragging(null);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
    [positions, zoom]
  );

  // Canvas pan
  const handleMouseDownCanvas = useCallback((e: React.MouseEvent) => {
    isPanning.current = true;
    lastPan.current = { x: e.clientX, y: e.clientY };

    const onMouseMove = (ev: MouseEvent) => {
      if (!isPanning.current) return;
      setPan(prev => ({
        x: prev.x + (ev.clientX - lastPan.current.x),
        y: prev.y + (ev.clientY - lastPan.current.y),
      }));
      lastPan.current = { x: ev.clientX, y: ev.clientY };
    };

    const onMouseUp = () => {
      isPanning.current = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, []);

  // Scroll to zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setZoom(prev => Math.min(2, Math.max(0.3, prev - e.deltaY * 0.001)));
  }, []);

  const docCounts = useLiveData(
    spaceService.spaces$.map(sps =>
      Object.fromEntries(
        sps.map(s => [s.id, spaceService.getSpaceDocIds$(s.id).value.length])
      )
    )
  );

  return (
    <>
      <ViewIcon icon="folder" />
      <ViewTitle title="Universe Canvas" />
      <ViewHeader>
        <Header
          left={
            <span style={{ fontWeight: 700, fontSize: 15 }}>
              🌌 Universe Canvas
            </span>
          }
        />
      </ViewHeader>
      <ViewBody>
        <div
          className={styles.universeCanvas}
          onMouseDown={handleMouseDownCanvas}
          onWheel={handleWheel}
        >
          {spaces.length === 0 ? (
            <div className={styles.emptyState}>
              <div style={{ fontSize: 40 }}>🌌</div>
              <div>No Spaces yet. Create a Space from the sidebar.</div>
            </div>
          ) : (
            <div
              className={styles.canvasViewport}
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              }}
            >
              {/* SVG connection lines (placeholder for future AI connections) */}
              <svg className={styles.svgConnections}>
                {/* Future: draw lines between connected spaces */}
              </svg>

              {/* Space cards */}
              {spaces.map(space => {
                const pos = positions.find(p => p.spaceId === space.id);
                if (!pos) return null;
                const docCount = docCounts?.[space.id] ?? 0;
                const name = space.name$.value;

                return (
                  <div
                    key={space.id}
                    className={styles.spaceCard}
                    data-dragging={dragging === space.id}
                    style={{ left: pos.x, top: pos.y }}
                    onMouseDown={e => handleMouseDownCard(e, space.id)}
                    onClick={() => handleSpaceClick(space.id)}
                  >
                    <div className={styles.spaceCardIcon}>🗂️</div>
                    <div className={styles.spaceCardName}>{name}</div>
                    <div className={styles.spaceCardDocCount}>
                      {docCount} {docCount === 1 ? 'doc' : 'docs'}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Zoom controls */}
          <div className={styles.zoomControls}>
            <button
              className={styles.zoomButton}
              onClick={() => setZoom(z => Math.min(2, z + 0.1))}
            >
              +
            </button>
            <button
              className={styles.zoomButton}
              onClick={() => setZoom(1)}
              title="Reset zoom"
            >
              ⊙
            </button>
            <button
              className={styles.zoomButton}
              onClick={() => setZoom(z => Math.max(0.3, z - 0.1))}
            >
              −
            </button>
          </div>
        </div>
      </ViewBody>
    </>
  );
};
