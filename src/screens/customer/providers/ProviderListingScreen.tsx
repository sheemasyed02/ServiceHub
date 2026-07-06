import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FilterSheet, SortSheet } from '@/components/bottom-sheets';
import { ProviderCard } from '@/components/customer';
import { EmptyState, SearchBar } from '@/components/ui';
import { FILTER_OPTIONS, getProvidersByCategory, SORT_OPTIONS } from '@/constants/customer';
import { useAppTheme } from '@/hooks';
import type { HomeStackParamList } from '@/navigation/types/customer.types';

type Props = NativeStackScreenProps<HomeStackParamList, 'ProviderListing'>;
type SortKey = 'rating' | 'price' | 'distance';
type LayoutMode = 'list' | 'compact';

export function ProviderListingScreen({ navigation, route }: Props) {
  const theme = useAppTheme();
  const { colors, gradients, shadows } = theme.tokens;
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

  const header = (
    <LinearGradient colors={gradients.hero} style={styles.hero}>
      <View style={styles.heroTop}>
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={12}
          style={[styles.backBtn, { backgroundColor: colors.surface, ...shadows.sm }]}
        >
          <MaterialCommunityIcons name="arrow-left" size={22} color={colors.textPrimary} />
        </Pressable>
        <View style={styles.heroText}>
          <Text variant="headlineSmall" style={{ color: colors.textPrimary, fontWeight: '800' }}>
            {screenTitle}
          </Text>
          <Text variant="bodySmall" style={{ color: colors.textSecondary, marginTop: 2 }}>
            {providers.length} provider{providers.length === 1 ? '' : 's'} available
          </Text>
        </View>
      </View>

      <View style={[styles.controlsCard, { backgroundColor: colors.surface, ...shadows.md }]}>
        <SearchBar
          placeholder={`Search ${categoryTitle?.toLowerCase() ?? 'providers'}...`}
          value={query}
          onChangeText={setQuery}
          dense
        />
        <View style={styles.filterRow}>
          <FilterChip label="Filter" icon="tune-variant" onPress={() => setFilterOpen(true)} />
          <FilterChip
            label={SORT_OPTIONS.find((o) => o.id === sortId)?.label ?? 'Sort'}
            icon="sort"
            onPress={() => setSortOpen(true)}
          />
          <FilterChip
            label={layout === 'list' ? 'Grid' : 'List'}
            icon={layout === 'list' ? 'view-grid-outline' : 'view-list-outline'}
            onPress={() => setLayout(layout === 'list' ? 'compact' : 'list')}
          />
        </View>
      </View>
    </LinearGradient>
  );

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <SafeAreaView edges={['top', 'left', 'right']}>{header}</SafeAreaView>

      <FlatList
        data={providers}
        key={layout}
        numColumns={layout === 'compact' ? 2 : 1}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.list,
          providers.length === 0 && styles.listEmpty,
        ]}
        columnWrapperStyle={layout === 'compact' ? styles.gridRow : undefined}
        style={styles.listFlex}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
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
        }
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
        onEndReached={providers.length > 0 ? loadMore : undefined}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          providers.length === 0 ? null : loading ? (
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
    </View>
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
      style={[styles.chip, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}
    >
      <MaterialCommunityIcons name={icon} size={15} color={colors.primaryDark} />
      <Text variant="labelSmall" style={{ color: colors.textPrimary, fontWeight: '700' }} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  hero: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 16,
    gap: 14,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  heroText: {
    flex: 1,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlsCard: {
    borderRadius: 18,
    padding: 12,
    gap: 10,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 8,
  },
  chip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 11,
    borderRadius: 12,
    borderWidth: 1,
    minHeight: 44,
  },
  listFlex: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 10,
  },
  listEmpty: {
    flexGrow: 1,
  },
  listItem: { marginBottom: 12 },
  gridRow: { gap: 10, paddingHorizontal: 0 },
  gridItem: { flex: 1, marginBottom: 10 },
});
