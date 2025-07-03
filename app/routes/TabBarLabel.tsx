import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {typeVariants} from '../theme/theme';

type TabBarLabelProps = {
  label: string;
  focused: boolean;
  theme: any;
};

function TabBarLabel({label, focused, theme}: TabBarLabelProps) {
  return (
    <Text
      style={{
        ...styles.label,
        color: focused ? theme.focused : '#918DAC',
      }}>
      {label}
    </Text>
  );
}

export default TabBarLabel;

const styles = StyleSheet.create({
  label: {
    fontFamily: typeVariants.titleLarge.fontFamily,
    fontSize: 12,
    color: '#918DAC',
    paddingTop: 10,
  },
});
