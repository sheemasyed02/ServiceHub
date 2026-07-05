import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrimaryButton, SecondaryButton } from '@/components/ui';
import { APP_NAME, SERVICE_HUB_LOGO } from '@/constants';
import { useAppTheme } from '@/hooks';
import type { AuthStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

export function WelcomeScreen({ navigation }: Props) {
  const theme = useAppTheme();
  const { colors, spacing } = theme.tokens;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={[styles.scroll, { padding: spacing.xl }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Image source={SERVICE_HUB_LOGO} style={styles.logo} resizeMode="contain" />
          <Text variant="headlineSmall" style={{ color: colors.textPrimary, fontWeight: '700' }}>
            {APP_NAME}
          </Text>
          <Text variant="bodyMedium" style={{ color: colors.textSecondary, textAlign: 'center' }}>
            Book trusted services nearby
          </Text>
        </View>

        <View style={[styles.actions, { gap: spacing.sm }]}>
          <PrimaryButton
            label="I'm a Customer"
            onPress={() => navigation.navigate('CustomerRegister')}
          />
          <SecondaryButton
            label="I'm a Provider"
            onPress={() => navigation.navigate('ProviderRegister')}
            variant="outline"
          />
          <Pressable onPress={() => navigation.navigate('CustomerLogin')} style={styles.loginLink}>
            <Text variant="bodyMedium" style={{ color: colors.textSecondary, textAlign: 'center' }}>
              Have an account?{' '}
              <Text style={{ color: colors.primaryDark, fontWeight: '700' }}>Sign in</Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingTop: 48,
    paddingBottom: 24,
  },
  hero: {
    alignItems: 'center',
    gap: 12,
    marginBottom: 48,
  },
  logo: { width: 88, height: 88 },
  actions: { width: '100%' },
  loginLink: { paddingVertical: 12 },
});
