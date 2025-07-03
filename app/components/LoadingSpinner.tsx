import React, {memo} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {COLORS, TEXT_STYLES} from '../constants';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = memo(
  ({message = 'Loading...', size = 'large', color = COLORS.ACCENT_PINK}) => {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={size} color={color} />
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontFamily: TEXT_STYLES.FONT_FAMILY,
    fontSize: TEXT_STYLES.FONT_SIZES.subtitle,
    color: COLORS.WHITE,
    marginTop: 16,
    textAlign: 'center',
  },
});

export default LoadingSpinner;
