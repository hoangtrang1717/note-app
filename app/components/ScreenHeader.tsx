import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {COLORS, TEXT_STYLES, UI_CONSTANTS} from '../constants';

interface ScreenHeaderProps {
  title: string;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
  showBackButton?: boolean;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = memo(
  ({title, onBackPress, rightComponent, showBackButton = true}) => {
    return (
      <View style={styles.container}>
        {showBackButton ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBackPress}
            accessibilityRole="button"
            accessibilityLabel="Go back">
            <FontAwesome6
              name="chevron-left"
              size={UI_CONSTANTS.ICON_SIZES.medium}
              color={COLORS.WHITE}
              iconStyle="solid"
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.spacer} />
        )}

        <Text style={styles.title}>{title}</Text>

        {rightComponent ? (
          <View style={styles.rightContainer}>{rightComponent}</View>
        ) : (
          <View style={styles.spacer} />
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    height: UI_CONSTANTS.HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: COLORS.HEADER_BG,
    borderBottomRightRadius: UI_CONSTANTS.BORDER_RADIUS.large,
    borderBottomLeftRadius: UI_CONSTANTS.BORDER_RADIUS.large,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.large,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: TEXT_STYLES.FONT_FAMILY,
    fontWeight: TEXT_STYLES.FONT_WEIGHTS.semibold,
    fontSize: TEXT_STYLES.FONT_SIZES.headerTitle,
    color: COLORS.WHITE,
    flex: 1,
    textAlign: 'center',
  },
  rightContainer: {
    width: 40,
    alignItems: 'center',
  },
  spacer: {
    width: 40,
  },
});

export default ScreenHeader;
