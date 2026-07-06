import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { CustomerScreen } from '@/components/customer';
import { Card, PrimaryButton, SecondaryButton } from '@/components/ui';
import { useAppTheme, useBooking } from '@/hooks';
import type { HomeStackParamList } from '@/navigation/types/customer.types';

type Props = NativeStackScreenProps<HomeStackParamList, 'BookingConfirmation'>;

export function BookingConfirmationScreen({ navigation, route }: Props) {
  const theme = useAppTheme();
  const { colors, shadows } = theme.tokens;
  const scale = useRef(new Animated.Value(0)).current;
  const booking = useBooking(route.params.bookingId);

  useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 5,
      tension: 80,
      useNativeDriver: true,
    }).start();
  }, [scale]);

  if (!booking) {
    return (
      <CustomerScreen contentStyle={styles.center}>
        <Text>Booking not found.</Text>
      </CustomerScreen>
    );
  }

  return (
    <CustomerScreen contentStyle={styles.center}>
      <Animated.View style={[styles.iconWrap, { transform: [{ scale }] }]}>
        <View style={[styles.circle, shadows.lg, { backgroundColor: colors.success }]}>
          <MaterialCommunityIcons name="check" size={48} color={colors.onPrimary} />
        </View>
      </Animated.View>

      <Text
        variant="headlineSmall"
        style={{ color: colors.textPrimary, fontWeight: '700', textAlign: 'center' }}
      >
        Booking Successful!
      </Text>
      <Text
        variant="bodyMedium"
        style={{ color: colors.textSecondary, textAlign: 'center', marginTop: 8 }}
      >
        Your service has been scheduled. Waiting for provider confirmation.
      </Text>

      <Card variant="outlined" padding={20} style={StyleSheet.flatten([styles.card, shadows.sm])}>
        <DetailRow label="Booking ID" value={booking.id} />
        <DetailRow label="Provider" value={booking.providerName} />
        <DetailRow label="Scheduled" value={`${booking.date} · ${booking.time}`} />
        <DetailRow label="ETA" value={booking.estimatedArrival ?? '15 min'} highlight />
      </Card>

      <View style={styles.actions}>
        <PrimaryButton
          label="Track Provider"
          onPress={() =>
            navigation
              .getParent()
              ?.navigate('Bookings', { screen: 'LiveTracking', params: { bookingId: booking.id } })
          }
        />
        <SecondaryButton label="Go Home" variant="outline" onPress={() => navigation.popToTop()} />
      </View>
    </CustomerScreen>
  );
}

function DetailRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <View style={styles.row}>
      <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
        {label}
      </Text>
      <Text
        variant="labelLarge"
        style={{ color: highlight ? colors.primaryDark : colors.textPrimary, fontWeight: '700' }}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  iconWrap: {
    marginBottom: 24,
  },
  circle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    marginTop: 32,
    gap: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actions: {
    width: '100%',
    gap: 12,
    marginTop: 32,
  },
});
