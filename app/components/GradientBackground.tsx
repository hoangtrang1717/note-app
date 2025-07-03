import React, {memo} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useGradientConfig} from '../theme/useGradient';

interface GradientBackgroundProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * GradientBackground Component
 *
 * A reusable component that provides a beautiful purple gradient background
 * with optimized performance using React.memo
 *
 * Gradient specifications:
 * - Primary: linear-gradient(155.28deg, #1B284F 14.45%, #351159 49.17%, #421C45 74.82%, #3B184E 101.18%)
 * - Overlay: linear-gradient(179.98deg, #240D38 -0.36%, rgba(51, 15, 82, 0) 13.75%)
 */
const GradientBackground: React.FC<GradientBackgroundProps> = memo(
  ({children, style, testID = 'GradientBackground'}) => {
    const {primaryGradient, overlayGradient} = useGradientConfig();

    return (
      <LinearGradient
        testID={testID}
        colors={primaryGradient.colors}
        locations={primaryGradient.locations}
        angle={primaryGradient.angle}
        useAngle={true}
        style={[styles.container, style]}>
        <LinearGradient
          colors={overlayGradient.colors}
          locations={overlayGradient.locations}
          angle={overlayGradient.angle}
          useAngle={true}
          style={styles.overlay}>
          {children}
        </LinearGradient>
      </LinearGradient>
    );
  },
);

GradientBackground.displayName = 'GradientBackground';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
});

export default GradientBackground;
