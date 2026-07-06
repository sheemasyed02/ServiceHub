import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { BookingCard, CustomerScreen, InsetGroup } from '@/components/customer';
import { EmptyState, PrimaryButton } from '@/components/ui';
import { useAppTheme, useCustomerBookings } from '@/hooks';
import type { BookingsStackParamList } from '@/navigation/types/customer.types';
import type { BookingStatus } from '@/types/customer';

type Props = NativeStackScreenProps<BookingsStackParamList, 'MyBookings'>;

const TABS: { key: BookingStatus; label: string }[] = [
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'ongoing', label: 'Live' },
  { key: 'completed', label: 'Past' },
  { key: 'cancelled', label: 'Cancelled' },
];

export function MyBookingsScreen({ navigation }: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const [activeTab, setActiveTab] = useState<BookingStatus>('upcoming');
  const allBookings = useCustomerBookings();

  const counts = useMemo(() => {
    return TABS.reduce(
      (acc, tab) => {
        acc[tab.key] = allBookings.filter((b) => b.status === tab.key).length;
        return acc;
      },
      {} as Record<BookingStatus, number>,
    );
  }, [allBookings]);

  const bookings = useMemo(
    () => allBookings.filter((b) => b.status === activeTab),
    [allBookings, activeTab],
  );

  return (
    <CustomerScreen>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={{ color: colors.textPrimary, fontWeight: '700' }}>
          Bookings
        </Text>
        <Text variant="bodySmall" style={{ color: colors.textSecondary, marginTop: 4 }}>
          {allBookings.length} total
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.segmentTrack, { backgroundColor: colors.surfaceVariant }]}
      >
        {TABS.map((tab) => {
          const active = activeTab === tab.key;
          const count = counts[tab.key];
          return (
            <Pressable
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              style={[
                styles.segment,
                active && { backgroundColor: colors.surface },
              ]}
            >
              <Text
                variant="labelMedium"
                style={{
                  color: active ? colors.textPrimary : colors.textTertiary,
                  fontWeight: active ? '600' : '500',
                }}
              >
                {tab.label}
                {count > 0 ? ` · ${count}` : ''}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {bookings.length === 0 ? (
        <View style={styles.empty}>
          <EmptyState
            icon="calendar-blank-outline"
            title={`No ${activeTab} bookings`}
            description={
              activeTab === 'upcoming'
                ? 'Book a service from home and it will show up here.'
                : `You don't have any ${activeTab} bookings right now.`
            }
          />
          {activeTab === 'upcoming' ? (
            <PrimaryButton
              label="Browse services"
              onPress={() => navigation.getParent()?.navigate('Home')}
              style={styles.cta}
            />
          ) : null}
        </View>
      ) : (
        <InsetGroup style={styles.list}>
          {bookings.map((booking, index) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              showDivider={index < bookings.length - 1}
              onPress={() => navigation.navigate('BookingDetails', { bookingId: booking.id })}
            />
          ))}
        </InsetGroup>
      )}

      <View style={{ height: 24 }} />
    </CustomerScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  segmentTrack: {
    flexDirection: 'row',
    marginHorizontal: 16,
    borderRadius: 10,
    padding: 4,
    marginBottom: 16,
    gap: 4,
  },
  segment: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  list: {
    marginTop: 0,
  },
  empty: {
    paddingHorizontal: 20,
  },
  cta: {
    marginTop: 8,
  },
});
