import Icon from '@react-native-vector-icons/evil-icons';
import React, {useEffect, useMemo} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import CategoryHeader from '../components/CategoryHeader';
import NoteCard from '../components/NoteCard';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import PencilIcon from '../components/Icons/PencilIcon';
import HealthIcon from '../components/Icons/HealthIcon';
import LifeIcon from '../components/Icons/LifeIcon';
import {useNotes} from '../hooks/useNotes';
import {getCategoryDisplayName} from '../constants';
import {COLORS, TEXT_STYLES, UI_CONSTANTS} from '../constants';

const Home = () => {
  const {groupedNotes, isLoading, hasNotes, loadNotesData} = useNotes();

  useEffect(() => {
    loadNotesData();
  }, [loadNotesData]);

  // Memoize icon list to prevent re-creation
  const iconList = useMemo(
    () => ({
      workAndStudy: <PencilIcon />,
      healthAndWellness: <HealthIcon />,
      life: <LifeIcon />,
    }),
    [],
  );

  if (isLoading) {
    return <LoadingSpinner message="Loading notes..." />;
  }

  if (!hasNotes) {
    return (
      <EmptyState
        title="No notes yet"
        message="Create your first note to get started"
      />
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.sectionTitleWrapper}>
        <Icon
          style={styles.icon}
          name="clock"
          size={UI_CONSTANTS.ICON_SIZES.medium}
          color={COLORS.WHITE}
        />
        <Text style={styles.sectionTitle}>Recently created notes</Text>
      </View>
      {Object.entries(groupedNotes).map(([category, noteItems]) => (
        <View key={category} style={styles.categoryList}>
          <CategoryHeader
            title={getCategoryDisplayName(category)}
            icon={iconList[category as keyof typeof iconList]}
          />
          {noteItems.map((note, index) => (
            <NoteCard
              key={`${note.category}-${index}`}
              note={note}
              maxContentLength={20}
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: TEXT_STYLES.FONT_FAMILY,
    fontWeight: TEXT_STYLES.FONT_WEIGHTS.regular,
    fontSize: TEXT_STYLES.FONT_SIZES.subtitle,
    color: COLORS.WHITE,
  },
  categoryList: {
    marginBottom: 24,
  },
  sectionTitleWrapper: {
    marginBottom: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  icon: {
    marginRight: 8,
  },
});
