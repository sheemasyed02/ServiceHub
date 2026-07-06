import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useAppTheme } from '@/hooks';
import type { Booking, BookingStatus } from '@/types/customer';

export type BookingCardProps = {
  booking: Booking;
  onPress: () => void;
  showDivider?: boolean;
};

const STATUS_LABEL: Record<BookingStatus, string> = {
  upcoming: 'Upcoming',
  ongoing: 'Live',
  completed: 'Done',
  cancelled: 'Cancelled',
};

const STATUS_TONE: Record<BookingStatus, 'neutral' | 'active' | 'done' | 'cancelled'> = {
  upcoming: 'neutral',
  ongoing: 'active',
  completed: 'done',
  cancelled: 'cancelled',
};

export function BookingCard({ booking, onPress, showDivider = false }: BookingCardProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  const statusLabel =
    booking.providerStatus === 'pending' && booking.status === 'upcoming'
      ? 'Pending'
      : STATUS_LABEL[booking.status];

  const tone = STATUS_TONE[booking.status];
  const badgeBg =
    tone === 'active'
      ? colors.primaryContainer
      : tone === 'done'
        ? colors.surfaceVariant
        : tone === 'cancelled'
          ? '#FCE8E8'
          : colors.surfaceVariant;
  const badgeColor =
    tone === 'active'
      ? colors.primaryDark
      : tone === 'cancelled'
        ? colors.error
        : colors.textSecondary;

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.row,
        showDivider && {
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: colors.divider,
        },
      ]}
    >
      <View style={[styles.dateBox, { backgroundColor: colors.surfaceVariant }]}>
        <Text variant="labelSmall" style={{ color: colors.textTertiary, fontWeight: '600' }}>
          {booking.date.split(' ')[0]}
        </Text>
        <Text variant="titleSmall" style={{ color: colors.textPrimary, fontWeight: '700' }}>
          {booking.date.split(' ')[1]?.replace(',', '') ?? '—'}
        </Text>
      </View>

      <View style={styles.body}>
        <View style={styles.top}>
          <Text variant="bodyLarge" numberOfLines={1} style={{ color: colors.textPrimary, flex: 1, fontWeight: '600' }}>
            {booking.service}
          </Text>
          <View style={[styles.badge, { backgroundColor: badgeBg }]}>
            <Text variant="labelSmall" style={{ color: badgeColor, fontWeight: '600' }}>
              {statusLabel}
            </Text>
          </View>
        </View>
        <Text variant="bodySmall" numberOfLines={1} style={{ color: colors.textSecondary }}>
          {booking.providerName}
        </Text>
        <View style={styles.meta}>
          <MaterialCommunityIcons name="clock-outline" size={14} color={colors.textTertiary} />
          <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
            {booking.time}
          </Text>
          <Text variant="bodyMedium" style={{ color: colors.textPrimary, marginLeft: 'auto', fontWeight: '600' }}>
            ₹{booking.price}
          </Text>
        </View>
      </View>

      <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textTertiary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dateBox: {
    width: 48,
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { flex: 1, gap: 3 },
  top: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
});
