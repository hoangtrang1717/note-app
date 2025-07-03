import React, {memo} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {GradientConfig, useGradientConfig} from '../theme/useGradient';

interface GradientViewProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  variant?: 'primary' | 'overlay' | 'card';
  customGradient?: GradientConfig;
}

/**
 * GradientView Component
 *
 * A flexible gradient component that can be used for various UI elements
 * Supports different variants and custom gradients for maximum flexibility
 */
const GradientView: React.FC<GradientViewProps> = memo(
  ({
    children,
    style,
    testID = 'GradientView',
    variant = 'primary',
    customGradient,
  }) => {
    const {primaryGradient, overlayGradient} = useGradientConfig();

    // Card gradient - a subtle version for card backgrounds
    const cardGradient: GradientConfig = {
      colors: [
        'rgba(27, 40, 79, 0.8)',
        'rgba(53, 17, 89, 0.8)',
        'rgba(66, 28, 69, 0.8)',
      ],
      locations: [0, 0.5, 1],
      angle: 135,
    };

    const getGradientConfig = (): GradientConfig => {
      if (customGradient) {
        return customGradient;
      }

      switch (variant) {
        case 'overlay':
          return overlayGradient;
        case 'card':
          return cardGradient;
        case 'primary':
        default:
          return primaryGradient;
      }
    };

    const gradientConfig = getGradientConfig();

    return (
      <LinearGradient
        testID={testID}
        colors={gradientConfig.colors}
        locations={gradientConfig.locations}
        angle={gradientConfig.angle}
        useAngle={true}
        style={[styles.container, style]}>
        {children}
      </LinearGradient>
    );
  },
);

GradientView.displayName = 'GradientView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GradientView;
