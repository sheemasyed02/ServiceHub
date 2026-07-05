import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { SecondaryButton } from '@/components/ui';
import { useAppTheme } from '@/hooks';
import type { Booking, BookingStatus } from '@/types/customer';

export type BookingCardProps = {
  booking: Booking;
  onViewDetails: () => void;
  onCancel?: () => void;
  onTrack?: () => void;
};

const STATUS_LABEL: Record<BookingStatus, string> = {
  upcoming: 'Upcoming',
  ongoing: 'In progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export function BookingCard({ booking, onViewDetails, onCancel, onTrack }: BookingCardProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text variant="bodyLarge" style={{ fontWeight: '600', color: colors.textPrimary }}>
            {booking.service}
          </Text>
          <Text variant="bodySmall" style={{ color: colors.textSecondary, marginTop: 2 }}>
            {booking.providerName}
          </Text>
        </View>
        <Text variant="labelMedium" style={{ color: colors.textSecondary }}>
          {STATUS_LABEL[booking.status]}
        </Text>
      </View>

      <View style={styles.meta}>
        <View style={styles.metaItem}>
          <MaterialCommunityIcons name="calendar-outline" size={14} color={colors.textTertiary} />
          <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
            {booking.date} · {booking.time}
          </Text>
        </View>
        <Text variant="bodyLarge" style={{ color: colors.textPrimary, fontWeight: '600' }}>
          ₹{booking.price}
        </Text>
      </View>

      <View style={styles.actions}>
        <SecondaryButton
          label="Details"
          variant="outline"
          onPress={onViewDetails}
          style={styles.btn}
        />
        {booking.status === 'ongoing' && onTrack ? (
          <SecondaryButton label="Track" onPress={onTrack} style={styles.btn} />
        ) : null}
        {(booking.status === 'upcoming' || booking.status === 'ongoing') && onCancel ? (
          <Pressable onPress={onCancel} style={styles.cancel}>
            <Text variant="labelMedium" style={{ color: colors.error }}>
              Cancel
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  btn: {
    flex: 1,
  },
  cancel: {
    paddingHorizontal: 8,
  },
});
