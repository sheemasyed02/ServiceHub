import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useAppTheme } from '@/hooks';

export type StatCardProps = {
  label: string;
  value: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  accent?: string;
};

export function StatCard({ label, value, icon, accent }: StatCardProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const tint = accent ?? colors.primaryDark;

  return (
    <View style={styles.card}>
      <MaterialCommunityIcons name={icon} size={18} color={tint} />
      <Text variant="labelSmall" style={{ color: colors.textTertiary, marginTop: 6 }}>
        {label}
      </Text>
      <Text variant="titleSmall" style={{ color: colors.textPrimary, fontWeight: '700', marginTop: 2 }}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '47%',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
});
