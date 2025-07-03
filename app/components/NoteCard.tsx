import React, {memo, useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {COLORS, TEXT_STYLES, UI_CONSTANTS} from '../constants';
import {Note} from '../types/notes';

interface NoteCardProps {
  note: Note;
  onPress?: (note: Note) => void;
  showContent?: boolean;
  maxContentLength?: number;
}

const NoteCard: React.FC<NoteCardProps> = memo(
  ({note, onPress, showContent = true, maxContentLength = 80}) => {
    const handlePress = useCallback(() => {
      onPress?.(note);
    }, [note, onPress]);

    const truncatedContent =
      note.content.length > maxContentLength
        ? `${note.content.substring(0, maxContentLength)}...`
        : note.content;

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={handlePress}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={`Note: ${truncatedContent}`}>
        <View style={styles.contentContainer}>
          {showContent && (
            <Text style={styles.content} numberOfLines={2}>
              {truncatedContent}
            </Text>
          )}
        </View>
        <FontAwesome6
          name="chevron-right"
          size={UI_CONSTANTS.ICON_SIZES.medium}
          color={COLORS.ACCENT_PINK}
          iconStyle="solid"
        />
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.medium,
    borderWidth: 1,
    borderColor: COLORS.WHITE_12,
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    flex: 1,
    marginRight: 12,
  },
  content: {
    fontFamily: TEXT_STYLES.FONT_FAMILY,
    fontWeight: TEXT_STYLES.FONT_WEIGHTS.regular,
    fontSize: TEXT_STYLES.FONT_SIZES.body,
    color: COLORS.WHITE,
    lineHeight: 20,
  },
});

export default NoteCard;
