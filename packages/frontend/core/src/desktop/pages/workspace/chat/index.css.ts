import { cssVarV2 } from '@toeverything/theme/v2';
import { style } from '@vanilla-extract/css';

export const chatRoot = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  maxWidth: 760,
  margin: '0 auto',
  padding: '0 24px 24px',
});

export const chatHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 0 12px',
  borderBottom: `1px solid ${cssVarV2.layer.insideBorder.border}`,
  marginBottom: 4,
  flexShrink: 0,
});

export const chatHeaderTitle = style({
  fontSize: 15,
  fontWeight: 600,
  color: cssVarV2.text.primary,
});

export const chatHeaderActions = style({
  display: 'flex',
  gap: 8,
});

export const chatActionButton = style({
  fontSize: 12,
  padding: '4px 10px',
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
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
});

export const chatMessages = style({
  flexGrow: 1,
  overflowY: 'auto',
  padding: '12px 0',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

export const chatEmpty = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flexGrow: 1,
  padding: '40px 24px',
  textAlign: 'center',
  color: cssVarV2.text.secondary,
});

export const chatEmptyTitle = style({
  fontSize: 16,
  fontWeight: 600,
  color: cssVarV2.text.primary,
  marginBottom: 8,
});

export const chatEmptyDesc = style({
  fontSize: 13,
  lineHeight: '1.6',
  maxWidth: 400,
});

export const chatMessage = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  selectors: {
    '&[data-role="user"]': {
      alignItems: 'flex-end',
    },
    '&[data-role="assistant"]': {
      alignItems: 'flex-start',
    },
  },
});

export const chatMessageRole = style({
  fontSize: 11,
  fontWeight: 600,
  color: cssVarV2.text.tertiary,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const chatMessageContent = style({
  fontSize: 14,
  lineHeight: '1.65',
  padding: '10px 14px',
  borderRadius: 12,
  maxWidth: '85%',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  selectors: {
    [`${chatMessage}[data-role="user"] &`]: {
      background: cssVarV2.button.primary,
      color: cssVarV2.button.pureWhiteText,
      borderBottomRightRadius: 4,
    },
    [`${chatMessage}[data-role="assistant"] &`]: {
      background: cssVarV2.layer.background.secondary,
      color: cssVarV2.text.primary,
      borderBottomLeftRadius: 4,
    },
  },
});

export const typingDots = style({
  display: 'inline-flex',
  gap: 4,
  alignItems: 'center',
  selectors: {
    '& span': {
      display: 'inline-block',
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'currentColor',
      opacity: 0.4,
      animationName: 'pulse',
      animationDuration: '1s',
      animationIterationCount: 'infinite',
    },
    '& span:nth-child(2)': { animationDelay: '0.2s' },
    '& span:nth-child(3)': { animationDelay: '0.4s' },
  },
});

export const chatError = style({
  fontSize: 13,
  color: cssVarV2.status.error,
  background: `color-mix(in srgb, ${cssVarV2.status.error} 10%, transparent)`,
  border: `1px solid color-mix(in srgb, ${cssVarV2.status.error} 30%, transparent)`,
  borderRadius: 8,
  padding: '10px 14px',
});

export const chatInputArea = style({
  display: 'flex',
  gap: 8,
  alignItems: 'flex-end',
  paddingTop: 12,
  borderTop: `1px solid ${cssVarV2.layer.insideBorder.border}`,
  flexShrink: 0,
});

export const chatTextarea = style({
  flexGrow: 1,
  resize: 'none',
  borderRadius: 10,
  border: `1px solid ${cssVarV2.layer.insideBorder.border}`,
  padding: '10px 12px',
  fontSize: 14,
  lineHeight: '1.5',
  fontFamily: 'inherit',
  background: cssVarV2.layer.background.primary,
  color: cssVarV2.text.primary,
  outline: 'none',
  transition: 'border-color 0.15s ease',
  selectors: {
    '&:focus': {
      borderColor: cssVarV2.button.primary,
    },
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
    '&::placeholder': {
      color: cssVarV2.text.placeholder,
    },
  },
});

export const chatSendButton = style({
  flexShrink: 0,
  padding: '10px 20px',
  borderRadius: 10,
  border: 'none',
  background: cssVarV2.button.primary,
  color: cssVarV2.button.pureWhiteText,
  fontSize: 14,
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.15s ease',
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

// ─── API Key setup ──────────────────────────────────────────────────────

export const apiKeySetup = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flexGrow: 1,
  gap: 16,
  padding: '48px 32px',
  textAlign: 'center',
  maxWidth: 480,
  margin: '0 auto',
});

export const apiKeyTitle = style({
  fontSize: 20,
  fontWeight: 700,
  color: cssVarV2.text.primary,
});

export const apiKeyDesc = style({
  fontSize: 14,
  lineHeight: '1.6',
  color: cssVarV2.text.secondary,
});

export const apiKeyInput = style({
  width: '100%',
  padding: '10px 14px',
  borderRadius: 8,
  border: `1px solid ${cssVarV2.layer.insideBorder.border}`,
  fontSize: 14,
  fontFamily: 'monospace',
  background: cssVarV2.layer.background.primary,
  color: cssVarV2.text.primary,
  outline: 'none',
  selectors: {
    '&:focus': {
      borderColor: cssVarV2.button.primary,
    },
  },
});

export const apiKeySaveButton = style({
  width: '100%',
  padding: '10px',
  borderRadius: 8,
  border: 'none',
  background: cssVarV2.button.primary,
  color: cssVarV2.button.pureWhiteText,
  fontSize: 14,
  fontWeight: 600,
  cursor: 'pointer',
  selectors: {
    '&:disabled': {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
  },
});

export const apiKeyLink = style({
  fontSize: 13,
  color: cssVarV2.text.emphasis,
  textDecoration: 'none',
  selectors: {
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});
