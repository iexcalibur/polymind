import { cssVarV2 } from '@toeverything/theme/v2';
import { style } from '@vanilla-extract/css';

export const searchPage = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  maxWidth: 760,
  margin: '0 auto',
  padding: '0 24px 24px',
});

export const searchInputArea = style({
  display: 'flex',
  gap: 8,
  alignItems: 'center',
  padding: '20px 0 16px',
  flexShrink: 0,
});

export const searchInput = style({
  flexGrow: 1,
  padding: '12px 16px',
  borderRadius: 10,
  border: `1px solid ${cssVarV2.layer.insideBorder.border}`,
  fontSize: 15,
  fontFamily: 'inherit',
  background: cssVarV2.layer.background.primary,
  color: cssVarV2.text.primary,
  outline: 'none',
  transition: 'border-color 0.15s ease',
  selectors: {
    '&:focus': {
      borderColor: cssVarV2.button.primary,
    },
    '&::placeholder': {
      color: cssVarV2.text.placeholder,
    },
  },
});

export const searchButton = style({
  flexShrink: 0,
  padding: '12px 24px',
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

export const resultsArea = style({
  flexGrow: 1,
  overflowY: 'auto',
  padding: '12px 0',
});

export const resultsContent = style({
  fontSize: 14,
  lineHeight: '1.7',
  color: cssVarV2.text.primary,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
});

export const emptyState = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flexGrow: 1,
  padding: '40px 24px',
  textAlign: 'center',
  color: cssVarV2.text.secondary,
});

export const emptyTitle = style({
  fontSize: 16,
  fontWeight: 600,
  color: cssVarV2.text.primary,
  marginBottom: 8,
});

export const emptyDesc = style({
  fontSize: 13,
  lineHeight: '1.6',
  maxWidth: 400,
});

export const searchError = style({
  fontSize: 13,
  color: cssVarV2.status.error,
  background: `color-mix(in srgb, ${cssVarV2.status.error} 10%, transparent)`,
  border: `1px solid color-mix(in srgb, ${cssVarV2.status.error} 30%, transparent)`,
  borderRadius: 8,
  padding: '10px 14px',
});

export const noKeyMessage = style({
  fontSize: 13,
  color: cssVarV2.text.secondary,
  textAlign: 'center',
  padding: '24px',
});
