import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { FilterSheet, SortSheet } from '@/components/bottom-sheets';
import { CustomerScreen, ProviderCard } from '@/components/customer';
import { EmptyState, SearchBar } from '@/components/ui';
import { FILTER_OPTIONS, getProvidersByCategory, SORT_OPTIONS } from '@/constants/customer';
import { useAppTheme } from '@/hooks';
import type { HomeStackParamList } from '@/navigation/types/customer.types';

type Props = NativeStackScreenProps<HomeStackParamList, 'ProviderListing'>;
type SortKey = 'rating' | 'price' | 'distance';
type LayoutMode = 'list' | 'compact';

export function ProviderListingScreen({ navigation, route }: Props) {
  const theme = useAppTheme();
  const { colors, shadows } = theme.tokens;
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('rating');
  const [sortId, setSortId] = useState('rating');
  const [filterIds, setFilterIds] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [layout, setLayout] = useState<LayoutMode>('list');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const categoryId = route.params?.categoryId;
  const categoryTitle = route.params?.categoryTitle;

  const providers = useMemo(() => {
    let list = getProvidersByCategory(categoryId);

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.profession.toLowerCase().includes(q),
      );
    }
    if (filterIds.includes('verified')) list = list.filter((p) => p.verified);
    if (filterIds.includes('top-rated')) list = list.filter((p) => p.rating >= 4.5);
    if (filterIds.includes('nearby')) list = list.filter((p) => parseFloat(p.distance) <= 3);
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    if (sort === 'price') list.sort((a, b) => a.priceFrom - b.priceFrom);
    return list;
  }, [categoryId, query, sort, filterIds]);

  const loadMore = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setPage((p) => p + 1);
      setLoading(false);
    }, 800);
  };

  const screenTitle = categoryTitle ? categoryTitle : categoryId ? 'Providers' : 'All Providers';

  return (
    <CustomerScreen scroll={false} bottomPadding={0}>
      <View style={styles.topBar}>
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={12}
          style={[styles.backBtn, { backgroundColor: colors.surface, borderColor: colors.border, ...shadows.xs }]}
        >
          <MaterialCommunityIcons name="arrow-left" size={22} color={colors.textPrimary} />
        </Pressable>
      </View>

      <View style={styles.header}>
        {categoryId ? (
          <View style={[styles.categoryBadge, { backgroundColor: `${colors.primary}18` }]}>
            <MaterialCommunityIcons name="shape-outline" size={14} color={colors.primaryDark} />
            <Text variant="labelSmall" style={{ color: colors.primaryDark, fontWeight: '600' }}>
              Category
            </Text>
          </View>
        ) : null}
        <Text variant="headlineSmall" style={{ color: colors.textPrimary, fontWeight: '700' }}>
          {screenTitle}
        </Text>
        {categoryId ? (
          <Text variant="bodySmall" style={{ color: colors.textSecondary, marginTop: 4 }}>
            {providers.length} provider{providers.length === 1 ? '' : 's'} available
          </Text>
        ) : null}
      </View>

      <View style={styles.toolbar}>
        <SearchBar
          placeholder={`Search ${categoryTitle?.toLowerCase() ?? 'providers'}...`}
          value={query}
          onChangeText={setQuery}
          containerStyle={{ flex: 1 }}
        />
      </View>

      <View style={styles.filters}>
        <FilterChip label="Filter" icon="tune-variant" onPress={() => setFilterOpen(true)} />
        <FilterChip
          label={SORT_OPTIONS.find((o) => o.id === sortId)?.label ?? 'Sort'}
          icon="sort"
          onPress={() => setSortOpen(true)}
        />
        <FilterChip
          label={layout === 'list' ? 'Compact' : 'List'}
          icon={layout === 'list' ? 'view-grid-outline' : 'view-list-outline'}
          onPress={() => setLayout(layout === 'list' ? 'compact' : 'list')}
        />
      </View>

      {providers.length === 0 ? (
        <EmptyState
          icon="account-search"
          title={categoryTitle ? `No ${categoryTitle} providers` : 'No providers found'}
          description={
            categoryId
              ? 'No providers in this category yet. Try another category.'
              : 'Try adjusting filters or search.'
          }
          actionLabel={categoryId ? 'Browse all' : undefined}
          onAction={
            categoryId
              ? () => navigation.setParams({ categoryId: undefined, categoryTitle: undefined })
              : undefined
          }
        />
      ) : (
        <FlatList
          data={providers}
          key={layout}
          numColumns={layout === 'compact' ? 2 : 1}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          columnWrapperStyle={layout === 'compact' ? styles.gridRow : undefined}
          renderItem={({ item }) => (
            <View style={layout === 'compact' ? styles.gridItem : styles.listItem}>
              <ProviderCard
                provider={item}
                layout={layout}
                onPress={() => navigation.navigate('ProviderProfile', { providerId: item.id })}
                onBook={() => navigation.navigate('Booking', { providerId: item.id })}
              />
            </View>
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            loading ? (
              <ActivityIndicator color={colors.primary} style={{ marginVertical: 20 }} />
            ) : (
              <Text
                variant="bodySmall"
                style={{ textAlign: 'center', color: colors.textTertiary, marginVertical: 16 }}
              >
                Page {page}
              </Text>
            )
          }
        />
      )}

      <FilterSheet
        visible={filterOpen}
        onClose={() => setFilterOpen(false)}
        options={FILTER_OPTIONS}
        selectedIds={filterIds}
        onChange={setFilterIds}
        onApply={() => undefined}
      />
      <SortSheet
        visible={sortOpen}
        onClose={() => setSortOpen(false)}
        options={SORT_OPTIONS}
        selectedId={sortId}
        onChange={(id) => {
          setSortId(id);
          if (id === 'rating' || id === 'popular') setSort('rating');
          else if (id.startsWith('price')) setSort('price');
          else setSort('distance');
        }}
        onApply={() => undefined}
      />
    </CustomerScreen>
  );
}

function FilterChip({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: keyof typeof import('@expo/vector-icons').MaterialCommunityIcons.glyphMap;
  onPress: () => void;
}) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, { backgroundColor: colors.surface, borderColor: colors.border }]}
    >
      <MaterialCommunityIcons name={icon} size={16} color={colors.primaryDark} />
      <Text variant="labelMedium" style={{ color: colors.textPrimary, fontWeight: '600' }}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  topBar: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 6,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  toolbar: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  filters: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 10,
  },
  listItem: { marginBottom: 14 },
  gridRow: { gap: 12 },
  gridItem: { flex: 1, marginBottom: 12 },
});
