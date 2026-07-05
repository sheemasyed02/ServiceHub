import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import {
  CategoryCard,
  CustomerScreen,
  SearchResultItem,
  SectionHeader,
} from '@/components/customer';
import { EmptyState, SearchBar } from '@/components/ui';
import { CUSTOMER_CATEGORIES, MOCK_PROVIDERS, MOCK_SEARCH } from '@/constants/customer';
import { useAppTheme } from '@/hooks';
import type { HomeStackParamList } from '@/navigation/types/customer.types';

type Props = NativeStackScreenProps<HomeStackParamList, 'Search'>;

export function SearchScreen({ navigation }: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return MOCK_PROVIDERS.filter(
      (p) => p.name.toLowerCase().includes(q) || p.profession.toLowerCase().includes(q),
    );
  }, [query]);

  const recent = MOCK_SEARCH.filter((s) => s.type === 'recent');
  const popular = MOCK_SEARCH.filter((s) => s.type === 'popular');
  const categories = MOCK_SEARCH.filter((s) => s.type === 'category');

  return (
    <CustomerScreen bottomPadding={40}>
      <View style={styles.searchWrap}>
        <SearchBar
          placeholder="Search services or providers..."
          value={query}
          onChangeText={setQuery}
          autoFocus
        />
        {query.length > 0 ? (
          <Pressable onPress={() => setQuery('')}>
            <Text variant="labelLarge" style={{ color: colors.primaryDark, fontWeight: '600' }}>
              Clear
            </Text>
          </Pressable>
        ) : null}
      </View>

      {query.trim().length > 0 ? (
        results.length > 0 ? (
          <View style={{ gap: 10, marginTop: 16 }}>
            {results.map((p) => (
              <SearchResultItem
                key={p.id}
                provider={p}
                onPress={() => navigation.navigate('ProviderProfile', { providerId: p.id })}
              />
            ))}
          </View>
        ) : (
          <EmptyState
            icon="magnify-close"
            title="No results found"
            description="Try a different keyword or browse categories below."
          />
        )
      ) : (
        <>
          <ChipSection title="Recent Searches" items={recent} onSelect={setQuery} />
          <ChipSection title="Popular Searches" items={popular} onSelect={setQuery} />

          <SectionHeader title="Suggested Categories" />
          <View style={styles.categoryGrid}>
            {CUSTOMER_CATEGORIES.slice(0, 6).map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                onPress={() =>
                  navigation.navigate('ProviderListing', {
                    categoryId: cat.id,
                    categoryTitle: cat.title,
                  })
                }
              />
            ))}
          </View>

          <SectionHeader title="Browse" />
          <View style={{ gap: 8 }}>
            {categories.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => setQuery(item.label)}
                style={[
                  styles.suggestRow,
                  { borderColor: colors.borderLight, backgroundColor: colors.surface },
                ]}
              >
                <Text variant="bodyLarge" style={{ color: colors.textPrimary }}>
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </>
      )}
    </CustomerScreen>
  );
}

function ChipSection({
  title,
  items,
  onSelect,
}: {
  title: string;
  items: { id: string; label: string }[];
  onSelect: (v: string) => void;
}) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <View style={styles.section}>
      <Text
        variant="titleSmall"
        style={{
          color: colors.textPrimary,
          fontWeight: '700',
          paddingHorizontal: 20,
          marginBottom: 10,
        }}
      >
        {title}
      </Text>
      <View style={styles.chips}>
        {items.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => onSelect(item.label)}
            style={[
              styles.chip,
              { backgroundColor: colors.surfaceVariant, borderColor: colors.border },
            ]}
          >
            <Text variant="labelLarge" style={{ color: colors.textPrimary }}>
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchWrap: {
    paddingHorizontal: 20,
    gap: 12,
  },
  section: {
    marginTop: 20,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 20,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  suggestRow: {
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
});
