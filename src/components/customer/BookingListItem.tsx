import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { Avatar } from '@/components/ui';
import { getProviderImages } from '@/constants/customer/images';
import { useAppTheme } from '@/hooks';
import type { Booking, BookingStatus } from '@/types/customer';

export type BookingListItemProps = {
  booking: Booking;
  onPress: () => void;
};

type FilterTone = 'active' | 'upcoming' | 'done' | 'cancelled';

const STATUS_META: Record<
  BookingStatus,
  { label: string; tone: FilterTone }
> = {
  upcoming: { label: 'Upcoming', tone: 'upcoming' },
  ongoing: { label: 'Live now', tone: 'active' },
  completed: { label: 'Completed', tone: 'done' },
  cancelled: { label: 'Cancelled', tone: 'cancelled' },
};

export function BookingListItem({ booking, onPress }: BookingListItemProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const images = getProviderImages(booking.providerId);
  const meta =
    booking.providerStatus === 'pending' && booking.status === 'upcoming'
      ? { label: 'Awaiting provider', tone: 'upcoming' as const }
      : STATUS_META[booking.status];

  const badgeBg =
    meta.tone === 'active'
      ? colors.primaryContainer
      : meta.tone === 'cancelled'
        ? '#FCE8E8'
        : meta.tone === 'done'
          ? colors.surfaceVariant
          : colors.surfaceVariant;

  const badgeColor =
    meta.tone === 'active'
      ? colors.primaryDark
      : meta.tone === 'cancelled'
        ? colors.error
        : colors.textSecondary;

  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, { backgroundColor: colors.surface }]}
    >
      <View style={styles.top}>
        <View style={[styles.badge, { backgroundColor: badgeBg }]}>
          <Text variant="labelSmall" style={{ color: badgeColor, fontWeight: '600' }}>
            {meta.label}
          </Text>
        </View>
        <Text variant="titleMedium" style={{ color: colors.textPrimary, fontWeight: '700' }}>
          ₹{booking.price}
        </Text>
      </View>

      <Text variant="titleLarge" style={{ color: colors.textPrimary, fontWeight: '700', marginTop: 10 }}>
        {booking.service}
      </Text>

      <View style={styles.providerRow}>
        <Avatar
          source={images?.avatar ? { uri: images.avatar } : undefined}
          name={booking.providerName}
          size="sm"
        />
        <Text variant="bodyMedium" style={{ color: colors.textSecondary, flex: 1 }} numberOfLines={1}>
          {booking.providerName}
        </Text>
      </View>

      <View style={[styles.divider, { backgroundColor: colors.divider }]} />

      <View style={styles.meta}>
        <MetaLine icon="calendar-outline" text={`${booking.date} · ${booking.time}`} />
        <MetaLine icon="map-marker-outline" text={booking.address} />
      </View>

      <View style={styles.footer}>
        <Text variant="labelMedium" style={{ color: colors.primaryDark, fontWeight: '600' }}>
          View details
        </Text>
        <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textTertiary} />
      </View>
    </Pressable>
  );
}

function MetaLine({
  icon,
  text,
}: {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  text: string;
}) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <View style={styles.metaLine}>
      <MaterialCommunityIcons name={icon} size={15} color={colors.textTertiary} />
      <Text variant="bodySmall" style={{ color: colors.textSecondary, flex: 1 }} numberOfLines={1}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 14,
    padding: 16,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  providerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 14,
  },
  meta: { gap: 8 },
  metaLine: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
  },
});
