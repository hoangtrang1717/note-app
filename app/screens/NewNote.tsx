import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import React, {useCallback, useState} from 'react';
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import GradientView from '../components/GradientView';
import ScreenHeader from '../components/ScreenHeader';
import {addNote} from '../store/notesSlice';
import {CreateNotePayload} from '../types/notes';
import {getCategoryOptions} from '../constants';
import {COLORS, TEXT_STYLES, UI_CONSTANTS} from '../constants';

const NewNote = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState(false);

  const categories = getCategoryOptions();

  const handleContentChange = useCallback((text: string) => {
    if (text.length <= UI_CONSTANTS.MAX_NOTE_CONTENT_LENGTH) {
      setContent(text);
    }
  }, []);

  const handleSave = useCallback(() => {
    if (!content.trim()) {
      Alert.alert('Error', 'Please input note content');
      return;
    }
    if (!selectedCategory) {
      Alert.alert('Error', 'Please choose a category');
      return;
    }

    const newNote: CreateNotePayload = {
      content: content.trim(),
      category: selectedCategory,
    };

    dispatch(addNote(newNote));
    Alert.alert('Success', 'Note saved successfully!', [
      {
        text: 'OK',
        onPress: () => {
          setContent('');
          setSelectedCategory('');
          navigation.goBack();
        },
      },
    ]);
  }, [content, selectedCategory, dispatch, navigation]);

  const selectCategory = useCallback((categoryKey: string) => {
    setSelectedCategory(categoryKey);
    setShowDropdown(false);
  }, []);

  const remainingChars = UI_CONSTANTS.MAX_NOTE_CONTENT_LENGTH - content.length;
  const isNearLimit = remainingChars <= UI_CONSTANTS.CHAR_WARNING_THRESHOLD;
  const selectedCategoryDisplayName =
    categories.find(cat => cat.key === selectedCategory)?.value ||
    'Select category';

  return (
    <GradientView
      customGradient={{
        colors: [...COLORS.GRADIENT_PRIMARY],
        locations: [0.14, 0.49, 0.75, 1.0],
        angle: 155.28,
      }}
      style={styles.container}>
      <ScreenHeader title="New note" onBackPress={() => navigation.goBack()} />

      <View style={styles.content}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Choose a category</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowDropdown(true)}>
            <Text style={styles.dropdownText}>
              {selectedCategoryDisplayName}
            </Text>
            <FontAwesome6
              name="chevron-down"
              size={16}
              color="#FFFFFF"
              iconStyle="solid"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={content}
            onChangeText={handleContentChange}
            placeholder="Please input note content"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            multiline
            numberOfLines={8}
            textAlignVertical="top"
            maxLength={UI_CONSTANTS.MAX_NOTE_CONTENT_LENGTH}
          />
          <Text
            style={[
              styles.charCounter,
              isNearLimit && styles.charCounterWarning,
            ]}>
            {content.length}/{UI_CONSTANTS.MAX_NOTE_CONTENT_LENGTH}
          </Text>
        </View>
        <Modal
          visible={showDropdown}
          transparent
          animationType="fade"
          onRequestClose={() => setShowDropdown(false)}>
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setShowDropdown(false)}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Category</Text>
              <FlatList
                data={categories}
                keyExtractor={item => item.key}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.categoryItem}
                    onPress={() => selectCategory(item.key)}>
                    <Text style={styles.categoryItemText}>{item.value}</Text>
                    {selectedCategory === item.key && (
                      <FontAwesome6
                        name="check"
                        size={16}
                        color="#F13A76"
                        iconStyle="solid"
                      />
                    )}
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>

      {/* Save Button - Fixed at bottom */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </GradientView>
  );
};

export default NewNote;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  bottomContainer: {
    paddingVertical: UI_CONSTANTS.BOTTOM_CONTAINER_PADDING,
    backgroundColor: COLORS.HEADER_BG,
    alignItems: 'center',
    borderTopRightRadius: UI_CONSTANTS.BORDER_RADIUS.large,
    borderTopLeftRadius: UI_CONSTANTS.BORDER_RADIUS.large,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontFamily: TEXT_STYLES.FONT_FAMILY,
    fontWeight: TEXT_STYLES.FONT_WEIGHTS.regular,
    fontSize: TEXT_STYLES.FONT_SIZES.subtitle,
    color: COLORS.WHITE,
    marginBottom: 12,
  },
  charCounter: {
    fontFamily: TEXT_STYLES.FONT_FAMILY,
    fontSize: TEXT_STYLES.FONT_SIZES.small,
    color: COLORS.WHITE_70,
    textAlign: 'right',
    marginTop: 8,
  },
  charCounterWarning: {
    color: COLORS.ACCENT_PINK,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.WHITE_12,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.medium,
    padding: 16,
    fontFamily: TEXT_STYLES.FONT_FAMILY,
    fontSize: TEXT_STYLES.FONT_SIZES.body,
    color: COLORS.WHITE,
    backgroundColor: COLORS.WHITE_05,
  },
  textArea: {
    height: 260,
    textAlignVertical: 'top',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: COLORS.WHITE_12,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.medium,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE_05,
  },
  dropdownText: {
    fontFamily: TEXT_STYLES.FONT_FAMILY,
    fontSize: TEXT_STYLES.FONT_SIZES.body,
    color: COLORS.WHITE,
  },
  saveButton: {
    backgroundColor: COLORS.ACCENT_PINK,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.medium,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 34,
  },
  saveButtonText: {
    fontFamily: TEXT_STYLES.FONT_FAMILY,
    fontWeight: TEXT_STYLES.FONT_WEIGHTS.semibold,
    fontSize: TEXT_STYLES.FONT_SIZES.body,
    color: COLORS.WHITE,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#2A3B5C',
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.medium,
    padding: 20,
    width: '80%',
    maxHeight: '50%',
  },
  modalTitle: {
    fontFamily: TEXT_STYLES.FONT_FAMILY,
    fontWeight: TEXT_STYLES.FONT_WEIGHTS.semibold,
    fontSize: TEXT_STYLES.FONT_SIZES.title,
    color: COLORS.WHITE,
    textAlign: 'center',
    marginBottom: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  categoryItemText: {
    fontFamily: TEXT_STYLES.FONT_FAMILY,
    fontSize: TEXT_STYLES.FONT_SIZES.subtitle,
    color: COLORS.WHITE,
  },
});
