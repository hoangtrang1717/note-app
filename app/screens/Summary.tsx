import React, {useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GradientView from '../components/GradientView';
import LoadingSpinner from '../components/LoadingSpinner';
import {useNotes} from '../hooks/useNotes';
import {COLORS, TEXT_STYLES, UI_CONSTANTS} from '../constants';

// Image imports
const SummaryHeaderIcon = require('../assets/images/SummaryHeader.png');
const WorkIcon = require('../assets/images/Work.png');
const HomeLifeIcon = require('../assets/images/HomeLife.png');
const HealthIcon = require('../assets/images/Health.png');

const CATEGORY_CONFIG = {
  workAndStudy: {
    title: 'Work and study',
    icon: WorkIcon,
  },
  life: {
    title: 'Home life',
    icon: HomeLifeIcon,
  },
  healthAndWellness: {
    title: 'Health and wellness',
    icon: HealthIcon,
  },
};

const Summary = () => {
  const {categoryCounts, isLoading, loadNotesData} = useNotes();

  useEffect(() => {
    loadNotesData();
  }, [loadNotesData]);

  const handleCategoryPress = (category: string) => {
    // TODO: Navigate to detailed category view or filter notes by category
    console.log(`Navigate to ${category} details`);
  };

  if (isLoading) {
    return (
      <GradientView
        customGradient={{
          colors: [...COLORS.GRADIENT_PRIMARY],
          locations: [0.14, 0.49, 0.75, 1.0],
          angle: 155.28,
        }}
        style={styles.container}>
        <LoadingSpinner message="Loading summary..." />
      </GradientView>
    );
  }

  return (
    <GradientView
      customGradient={{
        colors: [...COLORS.GRADIENT_PRIMARY],
        locations: [0.14, 0.49, 0.75, 1.0],
        angle: 155.28,
      }}
      style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Summary</Text>
        <Image source={SummaryHeaderIcon} style={styles.headerIcon} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        {Object.entries(CATEGORY_CONFIG).map(([categoryKey, config]) => {
          const count = categoryCounts[categoryKey] || 0;

          return (
            <View key={categoryKey} style={styles.categoryCard}>
              <View style={styles.categoryHeader}>
                <Image source={config.icon} style={styles.categoryIcon} />
                <Text style={styles.categoryTitle}>{config.title}</Text>
                <TouchableOpacity
                  style={styles.detailButton}
                  onPress={() => handleCategoryPress(categoryKey)}>
                  <Text style={styles.detailButtonText}>Detail</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.categoryCountSection}>
                <Text style={styles.categoryCount}>
                  This topic has a total of {count} records.
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </GradientView>
  );
};

export default Summary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingBottom: 20,
  },
  headerIcon: {
    width: 268,
    height: 268,
  },
  headerTitle: {
    fontFamily: TEXT_STYLES.FONT_FAMILY,
    fontWeight: TEXT_STYLES.FONT_WEIGHTS.semibold,
    fontSize: TEXT_STYLES.FONT_SIZES.headerTitle,
    color: COLORS.WHITE,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  categoryCard: {
    marginBottom: 30,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  categoryIcon: {
    width: 48,
    height: 48,
  },
  categoryTitle: {
    fontFamily: TEXT_STYLES.FONT_FAMILY,
    fontWeight: TEXT_STYLES.FONT_WEIGHTS.medium,
    fontSize: TEXT_STYLES.FONT_SIZES.title,
    color: COLORS.WHITE,
    flex: 1,
    marginLeft: 16,
  },
  categoryCountSection: {
    backgroundColor: COLORS.WHITE_08,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.medium,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.WHITE_12,
  },
  categoryCount: {
    fontFamily: TEXT_STYLES.FONT_FAMILY,
    fontWeight: TEXT_STYLES.FONT_WEIGHTS.regular,
    fontSize: TEXT_STYLES.FONT_SIZES.body,
    color: COLORS.WHITE_70,
  },
  detailButton: {
    backgroundColor: COLORS.ACCENT_PINK,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.button,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  detailButtonText: {
    fontFamily: TEXT_STYLES.FONT_FAMILY,
    fontWeight: TEXT_STYLES.FONT_WEIGHTS.semibold,
    fontSize: TEXT_STYLES.FONT_SIZES.body,
    color: COLORS.WHITE,
  },
});
