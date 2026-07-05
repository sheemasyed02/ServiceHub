import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { APP_NAME, SERVICE_HUB_LOGO } from '@/constants';
import { useAppTheme } from '@/hooks';

export function WelcomeHero() {
  const theme = useAppTheme();
  const { colors, spacing } = theme.tokens;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          paddingVertical: spacing.xxl,
          paddingHorizontal: spacing.xl,
        },
      ]}
    >
      <Image source={SERVICE_HUB_LOGO} style={styles.logo} resizeMode="contain" />
      <Text variant="titleMedium" style={{ color: colors.primaryDark, fontWeight: '700' }}>
        {APP_NAME}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 100,
    height: 100,
  },
});
