import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../theme/useTheme';
import GradientBackground from './GradientBackground';

import {ThemeContextInterface} from '../theme/useTheme';
import {LayoutPropsType} from '../types/components';

const Layout = ({children, style, ...rest}: LayoutPropsType) => {
  const {theme}: Partial<ThemeContextInterface> = useTheme();
  return (
    <SafeAreaView style={styles.container} {...rest}>
      <StatusBar
        animated
        backgroundColor={theme.cardBg}
        barStyle={theme?.name === 'light' ? 'dark-content' : 'light-content'}
      />
      <GradientBackground testID="Layout.LayoutContainer" style={style}>
        {children}
      </GradientBackground>
    </SafeAreaView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {flex: 1},
  layout: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
