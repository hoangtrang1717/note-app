export interface CategoryConfig {
  id: string;
  name: string;
  displayName: string;
}

export const CATEGORIES: Record<string, CategoryConfig> = {
  workAndStudy: {
    id: 'workAndStudy',
    name: 'workAndStudy',
    displayName: 'Work and study',
  },
  life: {
    id: 'life',
    name: 'life',
    displayName: 'Life',
  },
  healthAndWellness: {
    id: 'healthAndWellness',
    name: 'healthAndWellness',
    displayName: 'Health and wellness',
  },
} as const;

// Type-safe category keys
export type CategoryKey = keyof typeof CATEGORIES;

// Helper functions
export const getCategoryDisplayName = (categoryKey: string): string => {
  return CATEGORIES[categoryKey as CategoryKey]?.displayName ?? categoryKey;
};

export const getCategoryOptions = () => {
  return Object.values(CATEGORIES).map(category => ({
    key: category.id,
    value: category.displayName,
  }));
};

// Default categories for initialization
export const getDefaultCategories = () => {
  return Object.values(CATEGORIES).map(category => ({
    id: category.id,
    name: category.displayName,
  }));
};
