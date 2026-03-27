import { cssVarV2 } from '@toeverything/theme/v2';
import { globalStyle, style } from '@vanilla-extract/css';

export const dumpPage = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  maxWidth: 720,
  margin: '0 auto',
  padding: '16px 24px 32px',
  gap: 16,
  overflowY: 'auto',
});

// ─── Header ───────────────────────────────────────────────────────────────────

export const pageTitle = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  fontSize: 15,
  fontWeight: 600,
  color: cssVarV2.text.primary,
});

export const pendingBadge = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 20,
  height: 20,
  borderRadius: 10,
  background: cssVarV2.button.primary,
  color: cssVarV2.button.pureWhiteText,
  fontSize: 11,
  fontWeight: 700,
  padding: '0 6px',
});

// ─── Drop zone ────────────────────────────────────────────────────────────────

export const dropZone = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  padding: '28px 24px',
  borderRadius: 12,
  border: `2px dashed ${cssVarV2.layer.insideBorder.border}`,
  background: cssVarV2.layer.background.secondary,
  cursor: 'default',
  transition: 'all 0.15s ease',
  selectors: {
    '&[data-dragging="true"]': {
      borderColor: cssVarV2.button.primary,
      background: `color-mix(in srgb, ${cssVarV2.button.primary} 8%, transparent)`,
    },
  },
});

export const dropZoneIcon = style({
  fontSize: 32,
  lineHeight: 1,
});

export const dropZoneText = style({
  fontSize: 14,
  color: cssVarV2.text.secondary,
  textAlign: 'center',
  lineHeight: '1.6',
});

globalStyle(`${dropZoneText} small`, {
  fontSize: 12,
  opacity: 0.75,
});

// ─── Capture bar ──────────────────────────────────────────────────────────────

export const captureBar = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '10px 12px',
  borderRadius: 10,
  border: `1px solid ${cssVarV2.layer.insideBorder.border}`,
  background: cssVarV2.layer.background.primary,
});

export const captureTabs = style({
  display: 'flex',
  gap: 2,
  flexShrink: 0,
});

export const captureTab = style({
  padding: '4px 10px',
  borderRadius: 6,
  border: 'none',
  background: 'transparent',
  fontSize: 12,
  fontWeight: 500,
  color: cssVarV2.text.secondary,
  cursor: 'pointer',
  transition: 'all 0.12s ease',
  selectors: {
    '&[data-active="true"]': {
      background: cssVarV2.layer.background.secondary,
      color: cssVarV2.text.primary,
    },
    '&:hover': {
      color: cssVarV2.text.primary,
    },
  },
});

export const captureInput = style({
  flexGrow: 1,
  border: 'none',
  outline: 'none',
  fontSize: 14,
  background: 'transparent',
  color: cssVarV2.text.primary,
  selectors: {
    '&::placeholder': {
      color: cssVarV2.text.placeholder,
    },
  },
});

export const captureSubmit = style({
  flexShrink: 0,
  padding: '6px 14px',
  borderRadius: 7,
  border: 'none',
  background: cssVarV2.button.primary,
  color: cssVarV2.button.pureWhiteText,
  fontSize: 13,
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'filter 0.12s ease',
  selectors: {
    '&:hover:not(:disabled)': {
      filter: 'brightness(1.1)',
    },
    '&:disabled': {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
  },
});

// ─── Items list ───────────────────────────────────────────────────────────────

export const itemsList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

export const emptyState = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '48px 24px',
  textAlign: 'center',
  gap: 8,
});

export const emptyStateTitle = style({
  fontSize: 16,
  fontWeight: 600,
  color: cssVarV2.text.primary,
});

export const emptyStateDesc = style({
  fontSize: 13,
  color: cssVarV2.text.secondary,
  lineHeight: '1.6',
  maxWidth: 420,
});

// ─── Dump item card ───────────────────────────────────────────────────────────

export const dumpCard = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 0,
  borderRadius: 10,
  border: `1px solid ${cssVarV2.layer.insideBorder.border}`,
  background: cssVarV2.layer.background.primary,
  overflow: 'hidden',
  transition: 'opacity 0.2s ease',
  selectors: {
    '&[data-moved="true"]': {
      opacity: 0.55,
    },
  },
});

export const dumpCardHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '10px 12px',
});

export const dumpCardIcon = style({
  fontSize: 18,
  flexShrink: 0,
  lineHeight: 1,
});

export const dumpCardPreview = style({
  flexGrow: 1,
  fontSize: 13,
  color: cssVarV2.text.primary,
  lineHeight: '1.5',
  cursor: 'pointer',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  selectors: {
    '&:hover': {
      color: cssVarV2.text.emphasis,
    },
  },
});

export const dumpCardActions = style({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  flexShrink: 0,
});

export const dumpCardBadge = style({
  fontSize: 12,
  padding: '3px 10px',
  borderRadius: 6,
  border: `1px solid ${cssVarV2.button.primary}`,
  color: cssVarV2.button.primary,
  background: `color-mix(in srgb, ${cssVarV2.button.primary} 8%, transparent)`,
  cursor: 'pointer',
  fontWeight: 500,
  transition: 'all 0.12s ease',
  selectors: {
    '&[data-unsorted]': {
      borderColor: cssVarV2.layer.insideBorder.border,
      color: cssVarV2.text.secondary,
      background: 'transparent',
    },
    '&:hover': {
      filter: 'brightness(1.05)',
    },
  },
});

export const dumpCardMoved = style({
  fontSize: 12,
  color: cssVarV2.status.successFg,
  fontWeight: 500,
});

export const dumpCardDelete = style({
  width: 24,
  height: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  border: 'none',
  background: 'transparent',
  color: cssVarV2.text.secondary,
  fontSize: 16,
  cursor: 'pointer',
  lineHeight: 1,
  transition: 'all 0.12s ease',
  selectors: {
    '&:hover': {
      background: `color-mix(in srgb, ${cssVarV2.status.error} 12%, transparent)`,
      color: cssVarV2.status.error,
    },
  },
});

export const dumpCardFull = style({
  padding: '8px 12px 12px 40px',
  fontSize: 12,
  lineHeight: '1.65',
  color: cssVarV2.text.secondary,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  fontFamily: 'monospace',
  borderTop: `1px solid ${cssVarV2.layer.insideBorder.border}`,
  margin: 0,
  background: cssVarV2.layer.background.secondary,
  maxHeight: 300,
  overflowY: 'auto',
});

// ─── Space picker dropdown ────────────────────────────────────────────────────

export const spacePicker = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 6,
  padding: '8px 12px 12px',
  borderTop: `1px solid ${cssVarV2.layer.insideBorder.border}`,
});

export const spacePickerItem = style({
  fontSize: 12,
  padding: '4px 12px',
  borderRadius: 6,
  border: `1px solid ${cssVarV2.layer.insideBorder.border}`,
  background: cssVarV2.layer.background.secondary,
  color: cssVarV2.text.primary,
  cursor: 'pointer',
  fontWeight: 500,
  transition: 'all 0.12s ease',
  selectors: {
    '&[data-suggested="true"]': {
      borderColor: cssVarV2.button.primary,
      color: cssVarV2.button.primary,
      background: `color-mix(in srgb, ${cssVarV2.button.primary} 8%, transparent)`,
    },
    '&:hover': {
      background: cssVarV2.layer.background.hoverOverlay,
    },
  },
});

// ─── Sub-Space suggestion banner ──────────────────────────────────────────────

export const suggestionBanner = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
  padding: '12px 16px',
  borderRadius: 10,
  background: `color-mix(in srgb, ${cssVarV2.button.primary} 8%, transparent)`,
  border: `1px solid color-mix(in srgb, ${cssVarV2.button.primary} 25%, transparent)`,
  marginBottom: 12,
});

export const suggestionText = style({
  fontSize: 13,
  color: cssVarV2.text.primary,
  lineHeight: '1.5',
  flexGrow: 1,
});

export const suggestionActions = style({
  display: 'flex',
  gap: 8,
  flexShrink: 0,
});

export const suggestionAccept = style({
  fontSize: 12,
  fontWeight: 600,
  padding: '6px 14px',
  borderRadius: 6,
  border: 'none',
  background: cssVarV2.button.primary,
  color: cssVarV2.button.pureWhiteText,
  cursor: 'pointer',
  transition: 'filter 0.15s ease',
  selectors: {
    '&:hover': {
      filter: 'brightness(1.1)',
    },
  },
});

export const suggestionDismiss = style({
  fontSize: 12,
  padding: '6px 14px',
  borderRadius: 6,
  border: `1px solid ${cssVarV2.layer.insideBorder.border}`,
  background: 'transparent',
  color: cssVarV2.text.secondary,
  cursor: 'pointer',
  transition: 'all 0.15s ease',
  selectors: {
    '&:hover': {
      background: cssVarV2.layer.background.hoverOverlay,
      color: cssVarV2.text.primary,
    },
  },
});

// ─── Sidebar badge ────────────────────────────────────────────────────────────

export const sidebarBadge = style({
  marginLeft: 'auto',
  minWidth: 18,
  height: 18,
  borderRadius: 9,
  background: cssVarV2.button.primary,
  color: cssVarV2.button.pureWhiteText,
  fontSize: 10,
  fontWeight: 700,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 5px',
});
