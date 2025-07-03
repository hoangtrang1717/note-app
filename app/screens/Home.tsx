import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';

import GradientView from '../components/GradientView';
import {loadNotes} from '../store/notesSlice';
import {RootState} from '../store/store';
import {spacing, themes, typeVariants} from '../theme/theme';
import {useTheme} from '../theme/useTheme';
import {Category, Note} from '../types/notes';

interface CategoryWithNotes extends Category {
  recentNotes: Note[];
  totalCount: number;
}

const Home = () => {
  const {theme} = useTheme();
  const dispatch = useDispatch();

  const {notes, categories, status} = useSelector(
    (state: RootState) => state.notes,
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(loadNotes() as any);
    }
  }, [dispatch, status]);

  // Get categories with their recent notes
  const getCategoriesWithNotes = (): CategoryWithNotes[] => {
    return categories
      .map(category => {
        const categoryNotes = notes
          .filter(note => note.category === category.id && !note.isArchived)
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );

        return {
          ...category,
          recentNotes: categoryNotes.slice(0, 3),
          totalCount: categoryNotes.length,
        };
      })
      .filter(category => category.totalCount > 0); // Only show categories with notes
  };

  const categoriesWithNotes = getCategoriesWithNotes();

  const truncateContent = (content: string, maxLength: number = 25): string => {
    if (content.length <= maxLength) {
      return content;
    }
    return content.substring(0, maxLength) + '...';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return 'Today';
    }
    if (diffDays === 2) {
      return 'Yesterday';
    }
    if (diffDays <= 7) {
      return `${diffDays - 1} days ago`;
    }
    return date.toLocaleDateString();
  };

  const renderNoteItem = (note: Note, index: number) => (
    <TouchableOpacity
      key={note.id}
      style={[
        styles.noteItem,
        {borderLeftColor: note.color},
        index === 0 && styles.firstNoteItem,
      ]}
      activeOpacity={0.7}
      onPress={() => handleNotePress(note)} // Handle note press
      onLongPress={() => handleNoteLongPress(note)} // Handle note long press
      delayLongPress={200}>
      <View style={styles.noteContent}>
        <Text
          style={[
            styles.noteTitle,
            typeVariants.bodyMedium,
            {color: theme.color},
          ]}
          numberOfLines={1}>
          {note.title}
        </Text>
        <Text
          style={[
            styles.notePreview,
            typeVariants.bodySmall,
            {color: theme.color + '80'},
          ]}
          numberOfLines={1}>
          {truncateContent(note.content)}
        </Text>
        <Text
          style={[
            styles.noteDate,
            typeVariants.bodySmall,
            {color: theme.color + '60'},
          ]}>
          {formatDate(note.createdAt)}
        </Text>
      </View>
      {note.isPinned && (
        <Icon
          name="pin"
          size={12}
          color={theme.focused}
          style={styles.pinnedIcon}
        />
      )}
    </TouchableOpacity>
  );

  const renderCategorySection = (categoryWithNotes: CategoryWithNotes) => (
    <View key={categoryWithNotes.id} style={styles.categorySection}>
      <View style={styles.categoryHeader}>
        <View style={styles.categoryTitleRow}>
          <GradientView
            variant="card"
            style={[
              styles.categoryIcon,
              {backgroundColor: categoryWithNotes.color + '20'},
            ]}>
            <Icon
              name={categoryWithNotes.icon}
              size={16}
              color={categoryWithNotes.color}
            />
          </GradientView>
          <Text
            style={[
              styles.categoryName,
              typeVariants.titleSmall,
              {color: theme.color},
            ]}>
            {categoryWithNotes.name}
          </Text>
        </View>
        <TouchableOpacity style={styles.viewAllButton}>
          <Icon name="chevron-forward" size={16} color={theme.color + '60'} />
        </TouchableOpacity>
      </View>

      {/* Horizontal Scrolling Notes */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.notesScrollContainer}
        style={styles.notesScrollView}
        onScroll={handleCategoryScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={296} // noteWidth + margin (280 + 16)
        snapToAlignment="start">
        {categoryWithNotes.recentNotes.length > 0 ? (
          categoryWithNotes.recentNotes.map((note, index) =>
            renderNoteItem(note, index),
          )
        ) : (
          <Text
            style={[
              styles.emptyText,
              typeVariants.bodySmall,
              {color: theme.color + '60'},
            ]}>
            No recent notes
          </Text>
        )}
      </ScrollView>

      {/* Scroll Indicator */}
      {categoryWithNotes.recentNotes.length > 1 && (
        <View style={styles.scrollIndicator}>
          {categoryWithNotes.recentNotes.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicatorDot,
                {
                  backgroundColor:
                    index === activeCategory
                      ? theme.focused
                      : theme.color + '30',
                },
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );

  // Add scroll state for enhanced UX
  const [activeCategory, setActiveCategory] = useState(0);

  const handleCategoryScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const categoryWidth = 280 + 16; // note width + margin
    const currentIndex = Math.round(scrollPosition / categoryWidth);
    setActiveCategory(currentIndex);
  };

  // Handle note interactions
  const handleNotePress = (note: Note) => {
    console.log('Note pressed:', note.title);
    // Navigate to note detail or edit screen
  };

  const handleNoteLongPress = (note: Note) => {
    console.log('Note long pressed:', note.title);
    // Show note actions menu (edit, delete, pin, etc.)
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text
          style={[
            styles.headerTitle,
            typeVariants.titleLarge,
            {color: theme.color},
          ]}>
          Home
        </Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Icon name="settings" size={20} color={theme.color} />
        </TouchableOpacity>
      </View>

      {/* Recently Created Notes Section */}
      <View style={styles.sectionHeader}>
        <Icon name="time-outline" size={20} color={theme.focused} />
        <Text
          style={[
            styles.sectionTitle,
            typeVariants.titleSmall,
            {color: theme.color},
          ]}>
          Recently created notes
        </Text>
      </View>

      {/* Categories with Recent Notes */}
      {categoriesWithNotes.length > 0 ? (
        categoriesWithNotes.map(renderCategorySection)
      ) : (
        <View style={styles.emptyStateCard}>
          <View style={styles.emptyStateContent}>
            <Icon
              name="document-text-outline"
              size={48}
              color={theme.color + '40'}
            />
            <Text
              style={[
                styles.emptyStateTitle,
                typeVariants.titleSmall,
                {color: theme.color},
              ]}>
              No notes yet
            </Text>
            <Text
              style={[
                styles.emptyStateSubtitle,
                typeVariants.bodyMedium,
                {color: theme.color + '80'},
              ]}>
              Start creating notes to see them here
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.dark.layoutBg,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.layoutPaddingH,
    paddingVertical: spacing.layoutPaddingH,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
  },
  settingsButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: spacing.layoutPaddingH,
    gap: 8,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.layoutPaddingH,
    marginBottom: 12,
  },
  categoryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600',
  },
  viewAllButton: {
    padding: 4,
  },
  notesScrollView: {
    marginBottom: 8,
  },
  notesScrollContainer: {
    paddingHorizontal: spacing.layoutPaddingH,
    paddingRight: spacing.layoutPaddingH + 20,
  },
  noteItem: {
    width: 280,
    marginRight: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  firstNoteItem: {
    marginLeft: 0,
  },
  noteContent: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  notePreview: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  noteDate: {
    fontSize: 12,
    opacity: 0.7,
  },
  pinnedIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  emptyText: {
    textAlign: 'center',
    fontStyle: 'italic',
    opacity: 0.6,
    paddingVertical: 32,
    paddingHorizontal: spacing.layoutPaddingH,
  },
  emptyStateCard: {
    marginTop: 32,
    paddingHorizontal: spacing.layoutPaddingH,
  },
  emptyStateContent: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateTitle: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: '600',
  },
  emptyStateSubtitle: {
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 22,
  },
  scrollIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: spacing.layoutPaddingH,
    gap: 6,
  },
  indicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  // Legacy styles (keeping for backward compatibility)
  welcomeSection: {
    marginBottom: 24,
  },
  welcomeTitle: {
    marginBottom: 4,
  },
  welcomeSubtitle: {
    opacity: 0.8,
  },
  categoryCard: {
    marginBottom: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryCount: {
    opacity: 0.8,
  },
  viewAllText: {
    fontWeight: '500',
  },
  notesContainer: {
    gap: 8,
  },
});
