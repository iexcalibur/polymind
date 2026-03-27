import { cssVarV2 } from '@toeverything/theme/v2';
import { style } from '@vanilla-extract/css';

export const universeCanvas = style({
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  background: cssVarV2.layer.background.secondary,
  position: 'relative',
  cursor: 'grab',
  selectors: {
    '&:active': {
      cursor: 'grabbing',
    },
  },
});

export const canvasViewport = style({
  position: 'absolute',
  top: 0,
  left: 0,
  transformOrigin: '0 0',
});

export const spaceCard = style({
  position: 'absolute',
  width: 200,
  minHeight: 120,
  background: cssVarV2.layer.background.primary,
  borderRadius: 12,
  border: `1px solid ${cssVarV2.layer.insideBorder.border}`,
  padding: '16px',
  cursor: 'pointer',
  userSelect: 'none',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  transition: 'box-shadow 0.15s ease, border-color 0.15s ease',
  selectors: {
    '&:hover': {
      boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
      borderColor: cssVarV2.button.primary,
    },
    '&[data-dragging="true"]': {
      cursor: 'grabbing',
      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    },
  },
});

export const spaceCardIcon = style({
  fontSize: 24,
  marginBottom: 8,
});

export const spaceCardName = style({
  fontSize: 14,
  fontWeight: 600,
  color: cssVarV2.text.primary,
  marginBottom: 4,
});

export const spaceCardDocCount = style({
  fontSize: 12,
  color: cssVarV2.text.secondary,
});

export const svgConnections = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  overflow: 'visible',
});

export const universeHeader = style({
  position: 'absolute',
  top: 16,
  left: 16,
  zIndex: 10,
  display: 'flex',
  alignItems: 'center',
  gap: 12,
});

export const universeTitle = style({
  fontSize: 16,
  fontWeight: 700,
  color: cssVarV2.text.primary,
});

export const zoomControls = style({
  position: 'absolute',
  bottom: 24,
  right: 24,
  zIndex: 10,
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});

export const zoomButton = style({
  width: 32,
  height: 32,
  borderRadius: 8,
  border: `1px solid ${cssVarV2.layer.insideBorder.border}`,
  background: cssVarV2.layer.background.primary,
  color: cssVarV2.text.primary,
  cursor: 'pointer',
  fontSize: 18,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  selectors: {
    '&:hover': {
      background: cssVarV2.layer.background.hoverOverlay,
    },
  },
});

export const emptyState = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  gap: 12,
  color: cssVarV2.text.secondary,
  fontSize: 14,
});
