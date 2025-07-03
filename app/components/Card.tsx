import React from 'react';
import {StyleSheet, View} from 'react-native';
import {spacing} from '../theme/theme';
import {useTheme} from '../theme/useTheme';
import {CardPropsType} from '../types/components';
import GradientView from './GradientView';

const Card = ({
  children,
  style,
  useGradient = false,
  gradientVariant = 'card',
}: CardPropsType) => {
  const {theme} = useTheme();

  if (useGradient) {
    return (
      <GradientView variant={gradientVariant} style={[styles.card, style]}>
        {children}
      </GradientView>
    );
  }

  return (
    <View
      style={[
        styles.card,
        {backgroundColor: theme.cardBg, borderColor: theme.cardBorderColor},
        style,
      ]}>
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    paddingHorizontal: spacing.layoutPaddingH,
    paddingVertical: spacing.layoutPaddingH,
    borderRadius: spacing.borderRadius,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#fff',
  },
});

// IntrinsicAttributes
