import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import Card from '../components/Card';
import GradientView from '../components/GradientView';
import Layout from '../components/Layout';
import {spacing} from '../theme/theme';

/**
 * GradientDemo Component
 *
 * Demonstrates various uses of the gradient components
 * Shows different variants and combinations
 */
const GradientDemo = () => {
  return (
    <Layout>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Gradient Components Demo</Text>

        {/* Standard Card without gradient */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Standard Card</Text>
          <Text>This is a regular card without gradient background.</Text>
        </Card>

        {/* Card with gradient */}
        <Card useGradient={true} gradientVariant="card" style={styles.section}>
          <Text style={styles.sectionTitle}>Gradient Card</Text>
          <Text>
            This card uses the gradient background with 'card' variant.
          </Text>
        </Card>

        {/* Standalone GradientView with primary variant */}
        <GradientView variant="primary" style={styles.gradientSection}>
          <Text style={styles.sectionTitle}>Primary Gradient View</Text>
          <Text>This is a standalone GradientView with primary variant.</Text>
        </GradientView>

        {/* Standalone GradientView with overlay variant */}
        <GradientView variant="overlay" style={styles.gradientSection}>
          <Text style={styles.sectionTitle}>Overlay Gradient View</Text>
          <Text>This is a standalone GradientView with overlay variant.</Text>
        </GradientView>

        {/* Custom gradient */}
        <GradientView
          customGradient={{
            colors: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
            locations: [0, 0.5, 1],
            angle: 90,
          }}
          style={styles.gradientSection}>
          <Text style={styles.sectionTitle}>Custom Gradient</Text>
          <Text>This GradientView uses a custom gradient configuration.</Text>
        </GradientView>
      </ScrollView>
    </Layout>
  );
};

export default GradientDemo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.layoutPaddingH,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: spacing.cardMarginB * 2,
  },
  section: {
    marginBottom: spacing.cardMarginB,
  },
  gradientSection: {
    padding: spacing.layoutPaddingH,
    borderRadius: spacing.borderRadius,
    marginBottom: spacing.cardMarginB,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
});
