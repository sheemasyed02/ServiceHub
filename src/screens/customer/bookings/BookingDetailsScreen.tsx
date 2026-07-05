import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { CustomerScreen, StatusTimeline } from '@/components/customer';
import { Avatar, Card, PrimaryButton, SecondaryButton } from '@/components/ui';
import { getBookingById, getProviderById } from '@/constants/customer';
import { useAppTheme } from '@/hooks';
import type { BookingsStackParamList } from '@/navigation/types/customer.types';

type Props = NativeStackScreenProps<BookingsStackParamList, 'BookingDetails'>;

export function BookingDetailsScreen({ navigation, route }: Props) {
  const theme = useAppTheme();
  const { colors, shadows } = theme.tokens;
  const booking = getBookingById(route.params.bookingId);
  const provider = booking ? getProviderById(booking.providerId) : undefined;

  if (!booking) {
    return (
      <CustomerScreen>
        <Text style={{ padding: 20 }}>Booking not found.</Text>
      </CustomerScreen>
    );
  }

  const steps = [
    { label: 'Booking placed', time: booking.date, completed: true, active: false },
    {
      label: 'Provider assigned',
      time: booking.time,
      completed: booking.status !== 'cancelled',
      active: booking.status === 'upcoming',
    },
    {
      label: 'On the way',
      completed: booking.status === 'ongoing' || booking.status === 'completed',
      active: booking.status === 'ongoing',
    },
    { label: 'Completed', completed: booking.status === 'completed', active: false },
  ];

  return (
    <CustomerScreen>
      <View style={styles.section}>
        <Text
          variant="titleMedium"
          style={{
            fontWeight: '700',
            color: colors.textPrimary,
            paddingHorizontal: 20,
            marginBottom: 16,
          }}
        >
          Booking Status
        </Text>
        <StatusTimeline steps={steps} />
      </View>

      <Section title="Provider">
        <View style={styles.providerRow}>
          <Avatar name={booking.providerName} size="md" />
          <View style={{ flex: 1 }}>
            <Text variant="titleSmall" style={{ fontWeight: '700', color: colors.textPrimary }}>
              {booking.providerName}
            </Text>
            <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
              {provider?.profession}
            </Text>
          </View>
        </View>
      </Section>

      <Section title="Service Details">
        <Detail label="Service" value={booking.service} />
        <Detail label="Date & Time" value={`${booking.date} · ${booking.time}`} />
        <Detail label="Address" value={booking.address} />
      </Section>

      <Section title="Payment Summary">
        <Card variant="filled" padding={16}>
          <Detail label="Service charge" value={`₹${booking.price}`} />
          <Detail label="Total paid" value={`₹${booking.price}`} bold />
        </Card>
      </Section>

      {booking.otp ? (
        <Card
          variant="outlined"
          padding={20}
          style={StyleSheet.flatten([
            styles.otpCard,
            shadows.md,
            { borderColor: colors.primaryLight },
          ])}
        >
          <MaterialCommunityIcons name="shield-key" size={24} color={colors.primaryDark} />
          <View>
            <Text variant="labelMedium" style={{ color: colors.textSecondary }}>
              Service OTP
            </Text>
            <Text
              variant="headlineMedium"
              style={{ color: colors.primaryDark, fontWeight: '700', letterSpacing: 8 }}
            >
              {booking.otp}
            </Text>
            <Text variant="bodySmall" style={{ color: colors.textTertiary }}>
              Share with provider on arrival
            </Text>
          </View>
        </Card>
      ) : null}

      <View style={styles.actions}>
        {(booking.status === 'upcoming' || booking.status === 'ongoing') && (
          <SecondaryButton label="Cancel Booking" variant="outline" onPress={() => undefined} />
        )}
        {booking.status === 'ongoing' && (
          <PrimaryButton
            label="Track Provider"
            onPress={() => navigation.navigate('LiveTracking', { bookingId: booking.id })}
          />
        )}
        <SecondaryButton label="Contact Support" variant="soft" onPress={() => undefined} />
      </View>
    </CustomerScreen>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <View style={styles.section}>
      <Text
        variant="titleMedium"
        style={{
          fontWeight: '700',
          color: colors.textPrimary,
          paddingHorizontal: 20,
          marginBottom: 12,
        }}
      >
        {title}
      </Text>
      <View style={{ paddingHorizontal: 20 }}>{children}</View>
    </View>
  );
}

function Detail({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <View style={styles.detailRow}>
      <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
        {label}
      </Text>
      <Text
        variant="bodyMedium"
        style={{
          color: colors.textPrimary,
          fontWeight: bold ? '700' : '500',
          flex: 1,
          textAlign: 'right',
        }}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: 24 },
  providerRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 8,
  },
  otpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginHorizontal: 20,
    marginBottom: 24,
  },
  actions: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
});
