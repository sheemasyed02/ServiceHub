import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { InsetGroup, SectionHeader } from '@/components/customer';
import { ProviderScreen, StatCard } from '@/components/provider';
import { PrimaryButton } from '@/components/ui';
import { useAppTheme, useProviderCompletedBookings, useProviderEarnings } from '@/hooks';
import type { ProviderDashboardStackParamList } from '@/navigation/types/provider.types';

type Props = NativeStackScreenProps<ProviderDashboardStackParamList, 'Earnings'>;

export function ProviderEarningsScreen({ navigation }: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const earnings = useProviderEarnings();
  const completed = useProviderCompletedBookings();

  return (
    <ProviderScreen bottomPadding={40}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={{ color: colors.textPrimary, fontWeight: '700' }}>
          Earnings
        </Text>
        <Text variant="bodyMedium" style={{ color: colors.textSecondary, marginTop: 4 }}>
          Track payouts from completed jobs
        </Text>
      </View>

      <InsetGroup style={styles.statsGroup}>
        <View style={styles.statsRow}>
          <StatCard label="Today" value={`₹${earnings.today}`} icon="cash" accent={colors.success} compact />
          <View style={[styles.statsDivider, { backgroundColor: colors.divider }]} />
          <StatCard label="This week" value={`₹${earnings.weekly}`} icon="calendar-week" compact />
        </View>
        <View style={[styles.rowDivider, { backgroundColor: colors.divider }]} />
        <View style={styles.statsRow}>
          <StatCard label="This month" value={`₹${earnings.monthly}`} icon="calendar-month" compact />
          <View style={[styles.statsDivider, { backgroundColor: colors.divider }]} />
          <StatCard
            label="Total"
            value={`₹${earnings.total.toLocaleString()}`}
            icon="wallet"
            accent={colors.primary}
            compact
          />
        </View>
      </InsetGroup>

      <SectionHeader title="Completed jobs" />

      {completed.length === 0 ? (
        <Text variant="bodyMedium" style={{ color: colors.textSecondary, paddingHorizontal: 20 }}>
          Completed bookings will show here with earnings.
        </Text>
      ) : (
        <InsetGroup>
          {completed.map((booking, index) => (
            <View
              key={booking.id}
              style={[
                styles.txRow,
                index < completed.length - 1 && {
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderBottomColor: colors.divider,
                },
              ]}
            >
              <View style={{ flex: 1 }}>
                <Text variant="bodyLarge" style={{ color: colors.textPrimary, fontWeight: '600' }}>
                  {booking.service}
                </Text>
                <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
                  {booking.customerName} · {booking.date}
                </Text>
              </View>
              <Text variant="titleSmall" style={{ color: colors.success, fontWeight: '700' }}>
                +₹{booking.price}
              </Text>
            </View>
          ))}
        </InsetGroup>
      )}

      <PrimaryButton
        label="View all transactions"
        tone="secondary"
        onPress={() => navigation.navigate('Transactions')}
        style={{ marginHorizontal: 20, marginTop: 20 }}
      />
    </ProviderScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  statsGroup: { marginBottom: 8 },
  statsRow: { flexDirection: 'row' },
  statsDivider: { width: StyleSheet.hairlineWidth },
  rowDivider: { height: StyleSheet.hairlineWidth, marginHorizontal: 16 },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
});
