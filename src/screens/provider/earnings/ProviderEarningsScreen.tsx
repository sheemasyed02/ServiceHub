import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { InsetGroup } from '@/components/customer';
import { ProviderScreen, StatCard } from '@/components/provider';
import { PrimaryButton } from '@/components/ui';
import { useAppSelector, useAppTheme, useProviderEarnings } from '@/hooks';
import type { ProviderDashboardStackParamList } from '@/navigation/types/provider.types';

type Props = NativeStackScreenProps<ProviderDashboardStackParamList, 'Earnings'>;

export function ProviderEarningsScreen({ navigation }: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const earnings = useProviderEarnings();
  const providerId = useAppSelector((state) => state.auth.providerId);
  const completed = useAppSelector((state) =>
    providerId
      ? state.bookings.items.filter((b) => b.providerId === providerId && b.status === 'completed')
      : [],
  );

  return (
    <ProviderScreen bottomPadding={40}>
      <View style={styles.stats}>
        <StatCard label="Earned" value={`₹${earnings.today}`} icon="cash" accent={colors.success} />
        <StatCard label="This week" value={`₹${earnings.weekly}`} icon="calendar-week" />
        <StatCard label="This month" value={`₹${earnings.monthly}`} icon="calendar-month" />
        <StatCard
          label="Total"
          value={`₹${earnings.total.toLocaleString()}`}
          icon="wallet"
          accent={colors.primary}
        />
      </View>

      <Text variant="titleSmall" style={styles.sectionTitle}>
        Completed jobs
      </Text>

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
              <Text variant="titleSmall" style={{ color: colors.textPrimary, fontWeight: '700' }}>
                ₹{booking.price}
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
  stats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    marginBottom: 20,
    marginTop: 8,
  },
  sectionTitle: {
    color: '#1a1a1a',
    fontWeight: '600',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
});
