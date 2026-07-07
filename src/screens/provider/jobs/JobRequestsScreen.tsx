import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { InsetGroup } from '@/components/customer';
import { JobRequestCard, ProviderJobListItem } from '@/components/provider';
import { EmptyState } from '@/components/ui';
import {
  useAppDispatch,
  useAppTheme,
  useCurrentProviderProfile,
  useProviderBookings,
  useProviderPendingRequests,
} from '@/hooks';
import type { ProviderJobsStackParamList } from '@/navigation/types/provider.types';
import { acceptBooking, rejectBooking } from '@/store';
import type { Booking } from '@/types/customer';

type Props = NativeStackScreenProps<ProviderJobsStackParamList, 'JobRequests'>;

type FilterKey = 'pending' | 'active' | 'completed' | 'cancelled';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'pending', label: 'Pending' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' },
];

function matchesFilter(booking: Booking, filter: FilterKey): boolean {
  if (filter === 'pending') return booking.providerStatus === 'pending';
  if (filter === 'active') {
    return (
      booking.providerStatus === 'accepted' &&
      (booking.status === 'upcoming' || booking.status === 'ongoing')
    );
  }
  if (filter === 'completed') return booking.status === 'completed';
  return booking.status === 'cancelled' || booking.providerStatus === 'rejected';
}

export function JobRequestsScreen({ navigation }: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const dispatch = useAppDispatch();
  const provider = useCurrentProviderProfile();
  const allBookings = useProviderBookings();
  const pendingRequests = useProviderPendingRequests();
  const [filter, setFilter] = useState<FilterKey>('pending');

  const filteredBookings = useMemo(() => {
    const list = allBookings.filter((b) => matchesFilter(b, filter));
    const order: Record<FilterKey, (b: Booking) => number> = {
      pending: () => 0,
      active: (b) => (b.status === 'ongoing' ? 0 : 1),
      completed: () => 0,
      cancelled: () => 0,
    };
    return [...list].sort((a, b) => order[filter](a) - order[filter](b));
  }, [allBookings, filter]);

  const counts = useMemo(
    () => ({
      pending: allBookings.filter((b) => matchesFilter(b, 'pending')).length,
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
          Jobs
        </Text>
        <Text variant="bodyMedium" style={{ color: colors.textSecondary, marginTop: 4 }}>
          {provider
            ? `${counts.pending} pending · ${counts.active} active`
            : 'Manage your service bookings'}
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
    [colors, counts, filter, provider],
  );

  const renderEmpty = useCallback(
    () => (
      <View style={styles.empty}>
        <EmptyState
          icon={
            filter === 'pending'
              ? 'briefcase-off-outline'
              : filter === 'active'
                ? 'briefcase-clock-outline'
                : filter === 'completed'
                  ? 'briefcase-check-outline'
                  : 'briefcase-remove-outline'
          }
          title={
            filter === 'pending'
              ? 'No pending requests'
              : filter === 'active'
                ? 'No active jobs'
                : filter === 'completed'
                  ? 'No completed jobs'
                  : 'No cancelled jobs'
          }
          description={
            filter === 'pending'
              ? 'New booking requests for your services will show up here.'
              : 'Nothing to show for this filter.'
          }
        />
      </View>
    ),
    [filter],
  );

  const renderItem = useCallback(
    ({ item }: { item: Booking }) => {
      if (filter === 'pending') {
        const request = pendingRequests.find((r) => r.id === item.id);
        if (!request) return null;
        return (
          <InsetGroup style={styles.pendingCard}>
            <JobRequestCard
              request={request}
              onAccept={() => {
                dispatch(acceptBooking(item.id));
                navigation.navigate('ActiveJob', { jobId: item.id });
              }}
              onReject={() => dispatch(rejectBooking(item.id))}
              onPress={() => navigation.navigate('ActiveJob', { jobId: item.id })}
            />
          </InsetGroup>
        );
      }

      return (
        <ProviderJobListItem
          booking={item}
          onPress={() => navigation.navigate('ActiveJob', { jobId: item.id })}
        />
      );
    },
    [dispatch, filter, navigation, pendingRequests],
  );

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top', 'left', 'right']}>
      <FlatList
        data={filteredBookings}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={[
          styles.list,
          filteredBookings.length === 0 && styles.listEmpty,
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
  pendingCard: {
    marginBottom: 12,
  },
});
