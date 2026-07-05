import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';

import { ProviderScreen, TransactionCard } from '@/components/provider';
import { MOCK_TRANSACTIONS } from '@/constants/provider';
import type { ProviderDashboardStackParamList } from '@/navigation/types/provider.types';

type Props = NativeStackScreenProps<ProviderDashboardStackParamList, 'Transactions'>;

export function ProviderTransactionsScreen(_props: Props) {
  return (
    <ProviderScreen bottomPadding={40}>
      {MOCK_TRANSACTIONS.map((t) => (
        <View key={t.id} style={{ marginBottom: 10 }}>
          <TransactionCard transaction={t} onDownloadInvoice={() => {}} />
        </View>
      ))}
    </ProviderScreen>
  );
}
