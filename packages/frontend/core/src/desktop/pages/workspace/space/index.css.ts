import { cssVarV2 } from '@toeverything/theme/v2';
import { style } from '@vanilla-extract/css';

export const scrollArea = style({
  width: '100%',
  flexGrow: 1,
  height: 0,
});

export const spaceHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '24px',
});

export const breadcrumb = style({
  fontSize: 14,
  lineHeight: '22px',
  color: cssVarV2.text.secondary,
  display: 'flex',
  alignItems: 'center',
});

export const breadcrumbItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  cursor: 'pointer',
  selectors: {
    '&[data-active="true"]': {
      color: cssVarV2.text.primary,
      cursor: 'default',
    },
  },
});

export const breadcrumbLink = style({
  color: 'inherit',
  textDecoration: 'none',
});

export const breadcrumbIcon = style({
  fontSize: 20,
  color: cssVarV2.icon.primary,
});

export const breadcrumbSeparator = style({
  marginLeft: 4,
  marginRight: 8,
});

export const headerActions = style({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
});

export const newPageButtonText = style({
  fontSize: 12,
  lineHeight: '20px',
  fontWeight: 500,
});

export const modeToggle = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  border: `1px solid ${cssVarV2.layer.insideBorder.border}`,
  borderRadius: 8,
  padding: '2px',
  background: cssVarV2.layer.background.secondary,
});

export const modeToggleButton = style({
  padding: '4px 12px',
  borderRadius: 6,
  fontSize: 13,
  fontWeight: 500,
  cursor: 'pointer',
  border: 'none',
  background: 'transparent',
  color: cssVarV2.text.secondary,
  transition: 'all 0.15s ease',
  selectors: {
    '&[data-active="true"]': {
      background: cssVarV2.layer.background.primary,
      color: cssVarV2.text.primary,
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    '&:hover': {
      color: cssVarV2.text.primary,
    },
  },
});

export const canvasViewContainer = style({
  width: '100%',
  flexGrow: 1,
  height: 0,
  overflow: 'hidden',
});
