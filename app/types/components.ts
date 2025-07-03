import { ReactNode } from 'react';
import { StyleProp, TextInputProps, ViewProps, ViewStyle } from 'react-native';

// Layout
export interface LayoutPropsType extends ViewProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

// MenuItem
export interface MenuItemPropsType {
  label: string;
  rightItem?: ReactNode;
  onPress: () => void;
}

// Card
export interface CardPropsType {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  useGradient?: boolean;
  gradientVariant?: 'primary' | 'overlay' | 'card';
}

// Input
export interface InputPropsType extends TextInputProps {
  testID?: string;
  style?: ViewStyle;
  error?: string;
}
