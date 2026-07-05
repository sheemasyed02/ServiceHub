import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { SERVICE_HUB_LOGO } from '@/constants';
import { useAppTheme } from '@/hooks';

export function ProviderBrandHeader() {
  const theme = useAppTheme();
  const { colors, spacing } = theme.tokens;

  return (
    <View style={[styles.wrap, { gap: spacing.sm, marginBottom: spacing.sm }]}>
      <View style={styles.row}>
        <Image source={SERVICE_HUB_LOGO} style={styles.logo} resizeMode="contain" />
        <View
          style={[
            styles.badge,
            { backgroundColor: colors.surfaceVariant, borderColor: colors.border },
          ]}
        >
          <MaterialCommunityIcons name="briefcase-outline" size={14} color={colors.textSecondary} />
          <Text variant="labelMedium" style={{ color: colors.textSecondary, fontWeight: '600' }}>
            Provider
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 44,
    height: 44,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
});
