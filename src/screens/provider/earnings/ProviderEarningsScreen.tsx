import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { ProviderScreen, StatCard, TransactionCard } from '@/components/provider';
import { PrimaryButton } from '@/components/ui';
import { MOCK_EARNINGS, MOCK_TRANSACTIONS } from '@/constants/provider';
import { useAppTheme } from '@/hooks';
import type { ProviderDashboardStackParamList } from '@/navigation/types/provider.types';

type Props = NativeStackScreenProps<ProviderDashboardStackParamList, 'Earnings'>;

export function ProviderEarningsScreen({ navigation }: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <ProviderScreen bottomPadding={40}>
      <View style={styles.stats}>
        <StatCard
          label="Today"
          value={`₹${MOCK_EARNINGS.today}`}
          icon="cash"
          accent={colors.success}
        />
        <StatCard label="This week" value={`₹${MOCK_EARNINGS.weekly}`} icon="calendar-week" />
        <StatCard label="This month" value={`₹${MOCK_EARNINGS.monthly}`} icon="calendar-month" />
        <StatCard
          label="Total"
          value={`₹${MOCK_EARNINGS.total.toLocaleString()}`}
          icon="wallet"
          accent={colors.primary}
        />
      </View>

      <View style={[styles.graph, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text variant="titleSmall" style={{ color: colors.textPrimary, fontWeight: '600' }}>
          Revenue overview
        </Text>
        <View style={[styles.graphPlaceholder, { borderColor: colors.border }]}>
          <Text variant="bodySmall" style={{ color: colors.textTertiary }}>
            Chart placeholder — connect analytics backend
          </Text>
        </View>
      </View>

      <PrimaryButton
        label="Withdraw earnings"
        onPress={() => {}}
        style={{ marginHorizontal: 20, marginBottom: 20 }}
      />

      <Text
        variant="titleSmall"
        style={{
          color: colors.textPrimary,
          fontWeight: '600',
          paddingHorizontal: 20,
          marginBottom: 12,
        }}
      >
        Recent transactions
      </Text>
      {MOCK_TRANSACTIONS.slice(0, 3).map((t) => (
        <View key={t.id} style={{ marginBottom: 10 }}>
          <TransactionCard transaction={t} onDownloadInvoice={() => {}} />
        </View>
      ))}

      <PrimaryButton
        label="View all transactions"
        tone="secondary"
        onPress={() => navigation.navigate('Transactions')}
        style={{ marginHorizontal: 20, marginTop: 8 }}
      />
    </ProviderScreen>
  );
}

const styles = StyleSheet.create({
  stats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  graph: {
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 20,
    gap: 12,
  },
  graphPlaceholder: {
    height: 160,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
