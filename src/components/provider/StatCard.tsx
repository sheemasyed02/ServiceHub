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
  const tint = accent ?? colors.primary;

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={[styles.iconWrap, { backgroundColor: `${tint}14` }]}>
        <MaterialCommunityIcons name={icon} size={20} color={tint} />
      </View>
      <Text variant="labelSmall" style={{ color: colors.textSecondary, marginTop: 10 }}>
        {label}
      </Text>
      <Text
        variant="titleMedium"
        style={{ color: colors.textPrimary, fontWeight: '700', marginTop: 2 }}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '47%',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
