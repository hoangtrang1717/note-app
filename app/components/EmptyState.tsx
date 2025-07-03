import React, {memo} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, TEXT_STYLES} from '../constants';

interface EmptyStateProps {
  title: string;
  message: string;
  actionText?: string;
  onActionPress?: () => void;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = memo(
  ({title, message, actionText, onActionPress, icon}) => {
    return (
      <View style={styles.container}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        {actionText && onActionPress && (
          <TouchableOpacity style={styles.actionButton} onPress={onActionPress}>
            <Text style={styles.actionButtonText}>{actionText}</Text>
          </TouchableOpacity>
        )}
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
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontFamily: TEXT_STYLES.FONT_FAMILY,
    fontWeight: TEXT_STYLES.FONT_WEIGHTS.semibold,
    fontSize: TEXT_STYLES.FONT_SIZES.title,
    color: COLORS.WHITE,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontFamily: TEXT_STYLES.FONT_FAMILY,
    fontSize: TEXT_STYLES.FONT_SIZES.body,
    color: COLORS.WHITE_70,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  actionButton: {
    backgroundColor: COLORS.ACCENT_PINK,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  actionButtonText: {
    fontFamily: TEXT_STYLES.FONT_FAMILY,
    fontWeight: TEXT_STYLES.FONT_WEIGHTS.semibold,
    fontSize: TEXT_STYLES.FONT_SIZES.body,
    color: COLORS.WHITE,
  },
});

export default EmptyState;
