/**
 * Custom hook for gradient configurations
 * Provides a centralized way to manage gradient colors and settings
 */

export interface GradientConfig {
  colors: string[];
  locations?: number[];
  angle?: number;
}

export const useGradientConfig = () => {
  // Primary gradient configuration based on design specs
  const primaryGradient: GradientConfig = {
    colors: ['#1B284F', '#351159', '#421C45', '#3B184E'],
    locations: [0.1445, 0.4917, 0.7482, 1.0118],
    angle: 155.28,
  };

  // Overlay gradient configuration
  const overlayGradient: GradientConfig = {
    colors: ['#240D38', 'rgba(51, 15, 82, 0)'],
    locations: [-0.0036, 0.1375],
    angle: 179.98,
  };

  return {
    primaryGradient,
    overlayGradient,
  };
};
