import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, TEXT_STYLES} from '../constants';

interface CategoryHeaderProps {
  title: string;
  icon?: React.ReactNode;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = memo(({title, icon}) => {
  return (
    <View style={styles.container}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    marginRight: 8,
  },
  title: {
    fontFamily: TEXT_STYLES.FONT_FAMILY,
    fontWeight: TEXT_STYLES.FONT_WEIGHTS.regular,
    fontSize: TEXT_STYLES.FONT_SIZES.subtitle,
    color: COLORS.WHITE,
  },
});

export default CategoryHeader;
