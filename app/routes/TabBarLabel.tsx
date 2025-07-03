import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {typeVariants} from '../theme/theme';

type TabBarLabelProps = {
  label: string;
  focused: boolean;
};

function TabBarLabel({label, focused}: TabBarLabelProps) {
  return (
    <Text
      style={[
        styles.label,
        focused ? styles.labelFocused : styles.labelDefault,
      ]}>
      {label}
    </Text>
  );
}

export default TabBarLabel;

const styles = StyleSheet.create({
  label: {
    fontFamily: typeVariants.titleLarge.fontFamily,
    fontSize: 12,
    paddingTop: 10,
  },
  labelFocused: {
    color: '#F94695',
  },
  labelDefault: {
    color: '#918DAC',
  },
});
