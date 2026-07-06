import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { BookingCard, CustomerScreen } from '@/components/customer';
import { EmptyState } from '@/components/ui';
import { useAppDispatch, useAppTheme, useCustomerBookingsByStatus } from '@/hooks';
import type { BookingsStackParamList } from '@/navigation/types/customer.types';
import { cancelBooking } from '@/store';
import type { BookingStatus } from '@/types/customer';

type Props = NativeStackScreenProps<BookingsStackParamList, 'MyBookings'>;

const TABS: { key: BookingStatus; label: string }[] = [
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'ongoing', label: 'Ongoing' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' },
];

export function MyBookingsScreen({ navigation }: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<BookingStatus>('upcoming');

  const bookings = useCustomerBookingsByStatus(activeTab);

  return (
    <CustomerScreen>
      <Text
        variant="headlineSmall"
        style={{
          fontWeight: '700',
          color: colors.textPrimary,
          paddingHorizontal: 20,
          marginBottom: 16,
        }}
      >
        My Bookings
      </Text>

      <View style={styles.tabs}>
        {TABS.map((tab) => {
          const active = activeTab === tab.key;
          return (
            <Pressable
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              style={[
                styles.tab,
                {
                  backgroundColor: active ? colors.primary : colors.surfaceVariant,
                  borderColor: active ? colors.primary : colors.border,
                },
              ]}
            >
              <Text
                variant="labelMedium"
                style={{
                  color: active ? colors.onPrimary : colors.textSecondary,
                  fontWeight: '600',
                }}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {bookings.length === 0 ? (
        <EmptyState
          icon="calendar-blank"
          title={`No ${activeTab} bookings`}
          description="Book a service from the home screen to get started."
        />
      ) : (
        <View style={styles.list}>
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onViewDetails={() => navigation.navigate('BookingDetails', { bookingId: booking.id })}
              onCancel={() => dispatch(cancelBooking(booking.id))}
              onTrack={
                booking.status === 'ongoing'
                  ? () => navigation.navigate('LiveTracking', { bookingId: booking.id })
                  : undefined
              }
            />
          ))}
        </View>
      )}
    </CustomerScreen>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  list: {
    gap: 14,
    paddingBottom: 20,
  },
});
