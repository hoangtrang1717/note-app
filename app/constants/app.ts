// UI Constants
export const UI_CONSTANTS = {
  // Content limits
  MAX_NOTE_CONTENT_LENGTH: 200,
  CHAR_WARNING_THRESHOLD: 20,

  // List limits
  MAX_RECENT_NOTES_PER_CATEGORY: 3,

  // Layout values
  HEADER_HEIGHT: 120,
  BOTTOM_CONTAINER_PADDING: 32,
  BORDER_RADIUS: {
    small: 12,
    medium: 16,
    large: 20,
    button: 24,
  },

  // Icon sizes
  ICON_SIZES: {
    small: 16,
    medium: 20,
    large: 24,
    xlarge: 36,
  },
} as const;

// Color constants
export const COLORS = {
  // Primary gradient colors
  GRADIENT_PRIMARY: ['#1B284F', '#351159', '#421C45', '#3B184E'],

  // Background colors
  HEADER_BG: '#1C0B37',

  // Accent colors
  ACCENT_PINK: '#F13A76',

  // Text colors
  WHITE: '#FFFFFF',
  WHITE_70: 'rgba(255, 255, 255, 0.7)',
  WHITE_50: 'rgba(255, 255, 255, 0.5)',
  WHITE_12: 'rgba(255, 255, 255, 0.12)',
  WHITE_08: 'rgba(255, 255, 255, 0.08)',
  WHITE_05: 'rgba(255, 255, 255, 0.05)',

  // Tab colors
  TAB_INACTIVE: '#918DAC',
  TAB_ACTIVE: '#F94695',
} as const;

// Text styles
export const TEXT_STYLES = {
  FONT_FAMILY: 'PingFang SC',
  FONT_WEIGHTS: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  FONT_SIZES: {
    small: 12,
    body: 14,
    subtitle: 16,
    title: 18,
    headerTitle: 24,
  },
} as const;

// Animation durations
export const ANIMATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
} as const;
