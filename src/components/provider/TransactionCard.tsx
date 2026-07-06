import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useAppTheme } from '@/hooks';
import type { ProviderTransaction } from '@/types/provider';

const STATUS_COLORS = {
  completed: 'success',
  pending: 'warning',
  failed: 'error',
} as const;

export type TransactionCardProps = {
  transaction: ProviderTransaction;
  onDownloadInvoice: () => void;
};

export function TransactionCard({ transaction, onDownloadInvoice }: TransactionCardProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const statusColor = colors[STATUS_COLORS[transaction.status]];

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.top}>
        <View>
          <Text variant="labelSmall" style={{ color: colors.textTertiary }}>
            {transaction.bookingId}
          </Text>
          <Text variant="titleSmall" style={{ color: colors.textPrimary, marginTop: 2 }}>
            {transaction.customerName}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text variant="titleSmall" style={{ color: colors.textPrimary, fontWeight: '700' }}>
            ₹{transaction.amount}
          </Text>
          <Text variant="labelSmall" style={{ color: colors.textSecondary }}>
            Fee ₹{transaction.commission}
          </Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.statusRow}>
          <View style={[styles.dot, { backgroundColor: statusColor }]} />
          <Text variant="labelSmall" style={{ color: statusColor, textTransform: 'capitalize' }}>
            {transaction.status}
          </Text>
          <Text variant="labelSmall" style={{ color: colors.textTertiary }}>
            · {transaction.date}
          </Text>
        </View>
        <Pressable onPress={onDownloadInvoice} style={styles.download}>
          <MaterialCommunityIcons name="download-outline" size={16} color={colors.primaryDark} />
          <Text variant="labelSmall" style={{ color: colors.primaryDark, fontWeight: '600' }}>
            Invoice
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    gap: 12,
  },
  top: { flexDirection: 'row', justifyContent: 'space-between' },
  bottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  download: { flexDirection: 'row', alignItems: 'center', gap: 4 },
});
