import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { Avatar } from '@/components/ui';
import { useAppTheme } from '@/hooks';
import type { Booking } from '@/types/customer';

export type ProviderJobListItemProps = {
  booking: Booking;
  onPress: () => void;
};

type StatusMeta = {
  label: string;
  tone: 'pending' | 'active' | 'upcoming' | 'done' | 'cancelled';
};

function getStatusMeta(booking: Booking): StatusMeta {
  if (booking.providerStatus === 'pending') {
    return { label: 'New request', tone: 'pending' };
  }
  if (booking.status === 'ongoing') {
    return { label: 'In progress', tone: 'active' };
  }
  if (booking.status === 'completed') {
    return { label: 'Completed', tone: 'done' };
  }
  if (booking.status === 'cancelled' || booking.providerStatus === 'rejected') {
    return { label: 'Cancelled', tone: 'cancelled' };
  }
  return { label: 'Scheduled', tone: 'upcoming' };
}

export function ProviderJobListItem({ booking, onPress }: ProviderJobListItemProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const meta = getStatusMeta(booking);

  const badgeBg =
    meta.tone === 'active'
      ? colors.primaryContainer
      : meta.tone === 'pending'
        ? colors.warningContainer
        : meta.tone === 'cancelled'
          ? '#FCE8E8'
          : colors.surfaceVariant;

  const badgeColor =
    meta.tone === 'active'
      ? colors.primaryDark
      : meta.tone === 'pending'
        ? colors.warning
        : meta.tone === 'cancelled'
          ? colors.error
          : colors.textSecondary;

  return (
    <Pressable onPress={onPress} style={[styles.card, { backgroundColor: colors.surface }]}>
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

      <View style={styles.customerRow}>
        <Avatar
          source={booking.customerAvatar ? { uri: booking.customerAvatar } : undefined}
          name={booking.customerName}
          size="sm"
        />
        <Text variant="bodyMedium" style={{ color: colors.textSecondary, flex: 1 }} numberOfLines={1}>
          {booking.customerName}
        </Text>
      </View>

      <View style={[styles.divider, { backgroundColor: colors.divider }]} />

      <View style={styles.meta}>
        <MetaLine icon="calendar-outline" text={`${booking.date} · ${booking.time}`} />
        <MetaLine icon="map-marker-outline" text={booking.address} />
      </View>

      <View style={styles.footer}>
        <Text variant="labelMedium" style={{ color: colors.primaryDark, fontWeight: '600' }}>
          View job
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
  customerRow: {
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
