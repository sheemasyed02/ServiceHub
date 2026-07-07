import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { InsetGroup } from '@/components/customer';
import { ProviderScreen } from '@/components/provider';
import { useAppTheme, useProviderCompletedBookings } from '@/hooks';
import type { ProviderDashboardStackParamList } from '@/navigation/types/provider.types';

type Props = NativeStackScreenProps<ProviderDashboardStackParamList, 'Transactions'>;

export function ProviderTransactionsScreen(_props: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const completed = useProviderCompletedBookings();

  const transactions = useMemo(
    () =>
      completed.map((booking) => ({
        id: booking.id,
        bookingId: booking.id,
        customerName: booking.customerName,
        amount: booking.price,
        commission: Math.round(booking.price * 0.1),
        status: 'completed' as const,
        date: booking.date,
      })),
    [completed],
  );

  return (
    <ProviderScreen bottomPadding={40}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={{ color: colors.textPrimary, fontWeight: '700' }}>
          Transactions
        </Text>
        <Text variant="bodyMedium" style={{ color: colors.textSecondary, marginTop: 4 }}>
          {transactions.length} completed payout{transactions.length === 1 ? '' : 's'}
        </Text>
      </View>

      {transactions.length === 0 ? (
        <Text variant="bodyMedium" style={{ color: colors.textSecondary, paddingHorizontal: 20 }}>
          Completed jobs will appear here as transactions.
        </Text>
      ) : (
        <InsetGroup>
          {transactions.map((tx, index) => (
            <View
              key={tx.id}
              style={[
                styles.row,
                index < transactions.length - 1 && {
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderBottomColor: colors.divider,
                },
              ]}
            >
              <View style={{ flex: 1 }}>
                <Text variant="labelSmall" style={{ color: colors.textTertiary }}>
                  {tx.bookingId}
                </Text>
                <Text variant="bodyLarge" style={{ color: colors.textPrimary, fontWeight: '600' }}>
                  {tx.customerName}
                </Text>
                <Text variant="bodySmall" style={{ color: colors.textSecondary, marginTop: 2 }}>
                  {tx.date} · Fee ₹{tx.commission}
                </Text>
              </View>
              <Text variant="titleSmall" style={{ color: colors.success, fontWeight: '700' }}>
                +₹{tx.amount}
              </Text>
            </View>
          ))}
        </InsetGroup>
      )}
    </ProviderScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
});
