import { ScrollView, StyleSheet, View } from 'react-native';

import { CUSTOMER_CATEGORIES } from '@/constants/customer';

import { CategoryCard } from './CategoryCard';

export type CategoryScrollerProps = {
  selectedId?: string;
  onSelect: (categoryId: string, title: string) => void;
};

export function CategoryScroller({ selectedId, onSelect }: CategoryScrollerProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {CUSTOMER_CATEGORIES.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          selected={selectedId === category.id}
          onPress={() => onSelect(category.id, category.title)}
        />
      ))}
      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    gap: 12,
  },
  spacer: {
    width: 8,
  },
});
