// Types
interface spacingType {
  borderRadius: number;
  layoutPaddingH: number;
  containerPaddingV: number;
  cardMarginB: number;
}

interface typeSizesType {
  FONT_SIZE_SMALL: number;
  FONT_SIZE_MEDIUM: number;
  FONT_SIZE_LARGE: number;
  FONT_WEIGHT_LIGHT: number;
  FONT_WEIGHT_MEDIUM: number;
  FONT_WEIGHT_HEAVY: number;
}

export interface themeType {
  name: string;
  color: string;
  primary: string;
  layoutBg: string;
  cardBg: string;
  cardBorderColor: string;
  accent: string;
  error: string;
  focused: string;
}

interface themesType {
  light: themeType;
  dark: themeType;
}

// Spacing:- Common margins and paddings
const spacing: spacingType = {
  borderRadius: 16,
  layoutPaddingH: 16,
  containerPaddingV: 22,
  cardMarginB: 16,
};

// Type Sizes:- Font sizes and weights
const typeSizes: typeSizesType = {
  FONT_SIZE_LARGE: 16,
  FONT_SIZE_MEDIUM: 14,
  FONT_SIZE_SMALL: 12,
  FONT_WEIGHT_LIGHT: 200,
  FONT_WEIGHT_MEDIUM: 600,
  FONT_WEIGHT_HEAVY: 700,
};

const typeVariants = {
  titleLarge: {
    fontFamily: 'Poppins-Bold',
    fontSize: typeSizes.FONT_SIZE_LARGE,
  },
  titleSmall: {
    fontFamily: 'Poppins-Bold',
    fontSize: typeSizes.FONT_SIZE_SMALL,
  },
  bodyMedium: {
    fontFamily: 'Poppins-Regular',
    fontSize: typeSizes.FONT_SIZE_MEDIUM,
  },
  bodySmall: {
    fontFamily: 'Poppins-Regular',
    fontSize: typeSizes.FONT_SIZE_SMALL,
  },
};

const themes: themesType = {
  light: {
    name: 'dark',
    color: '#ffffff',
    primary: '#ffffff',
    layoutBg: '#121212',
    cardBg: '#1C0B37',
    cardBorderColor: '#1A1A1A',
    accent: '#0071ff',
    error: '#B00020',
    focused: '#F94695',
  },
  dark: {
    name: 'dark',
    color: '#ffffff',
    primary: '#ffffff',
    layoutBg: '#121212',
    cardBg: '#1C0B37',
    cardBorderColor: '#1A1A1A',
    accent: '#0071ff',
    error: '#B00020',
    focused: '#F94695',
  },
};

export { spacing, themes, typeSizes, typeVariants };

