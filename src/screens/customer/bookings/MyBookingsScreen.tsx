import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BookingListItem } from '@/components/customer';
import { EmptyState, PrimaryButton } from '@/components/ui';
import { useAppTheme, useCustomerBookings } from '@/hooks';
import type { BookingsStackParamList } from '@/navigation/types/customer.types';
import type { Booking, BookingStatus } from '@/types/customer';

type Props = NativeStackScreenProps<BookingsStackParamList, 'MyBookings'>;

type FilterKey = 'all' | 'active' | 'completed' | 'cancelled';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' },
];

function matchesFilter(booking: Booking, filter: FilterKey): boolean {
  if (filter === 'all') return true;
  if (filter === 'active') return booking.status === 'upcoming' || booking.status === 'ongoing';
  if (filter === 'completed') return booking.status === 'completed';
  return booking.status === 'cancelled';
}

export function MyBookingsScreen({ navigation }: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const [filter, setFilter] = useState<FilterKey>('all');
  const allBookings = useCustomerBookings();

  const sortedBookings = useMemo(() => {
    const list = allBookings.filter((b) => matchesFilter(b, filter));
    const order: Record<BookingStatus, number> = {
      ongoing: 0,
      upcoming: 1,
      completed: 2,
      cancelled: 3,
    };
    return [...list].sort((a, b) => order[a.status] - order[b.status]);
  }, [allBookings, filter]);

  const counts = useMemo(
    () => ({
      all: allBookings.length,
      active: allBookings.filter((b) => matchesFilter(b, 'active')).length,
      completed: allBookings.filter((b) => matchesFilter(b, 'completed')).length,
      cancelled: allBookings.filter((b) => matchesFilter(b, 'cancelled')).length,
    }),
    [allBookings],
  );

  const renderHeader = useCallback(
    () => (
      <View style={styles.headerBlock}>
        <Text variant="headlineSmall" style={{ color: colors.textPrimary, fontWeight: '700' }}>
          My Bookings
        </Text>
        <Text variant="bodyMedium" style={{ color: colors.textSecondary, marginTop: 4 }}>
          {counts.active > 0
            ? `${counts.active} active booking${counts.active === 1 ? '' : 's'}`
            : 'Manage your service appointments'}
        </Text>

        <View style={styles.filters}>
          {FILTERS.map((item) => {
            const active = filter === item.key;
            const count = counts[item.key];
            return (
              <Pressable
                key={item.key}
                onPress={() => setFilter(item.key)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: active ? colors.primary : colors.surface,
                    borderColor: active ? colors.primary : colors.divider,
                  },
                ]}
              >
                <Text
                  variant="labelLarge"
                  style={{
                    color: active ? colors.onPrimary : colors.textSecondary,
                    fontWeight: active ? '600' : '500',
                  }}
                >
                  {item.label}
                  {count > 0 ? ` (${count})` : ''}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    ),
    [colors, counts, filter],
  );

  const renderEmpty = useCallback(
    () => (
      <View style={styles.empty}>
        <EmptyState
          icon="calendar-blank-outline"
          title={
            filter === 'active'
              ? 'No active bookings'
              : filter === 'completed'
                ? 'No completed bookings'
                : filter === 'cancelled'
                  ? 'No cancelled bookings'
                  : 'No bookings yet'
          }
          description={
            filter === 'all' || filter === 'active'
              ? 'Book a service from home and your appointments will appear here.'
              : 'Nothing to show for this filter.'
          }
        />
        {(filter === 'all' || filter === 'active') && (
          <PrimaryButton
            label="Find a service"
            onPress={() => navigation.getParent()?.navigate('Home')}
            style={styles.cta}
          />
        )}
      </View>
    ),
    [filter, navigation],
  );

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top', 'left', 'right']}>
      <FlatList
        data={sortedBookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BookingListItem
            booking={item}
            onPress={() => navigation.navigate('BookingDetails', { bookingId: item.id })}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={[
          styles.list,
          sortedBookings.length === 0 && styles.listEmpty,
        ]}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  list: { paddingBottom: 100 },
  listEmpty: { flexGrow: 1 },
  headerBlock: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  empty: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  cta: {
    marginTop: 8,
  },
});
