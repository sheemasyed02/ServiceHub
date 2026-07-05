import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useRef } from 'react';
import { ActivityIndicator, Animated, Image, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { APP_NAME, SERVICE_HUB_LOGO } from '@/constants';
import { useAppTheme } from '@/hooks';
import type { AuthStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Splash'>;

const SPLASH_DURATION_MS = 2000;

export function SplashScreen({ navigation }: Props) {
  const theme = useAppTheme();
  const { colors, spacing } = theme.tokens;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    const timer = setTimeout(() => navigation.replace('Welcome'), SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, [fade, navigation]);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <Animated.View style={[styles.content, { opacity: fade }]}>
        <Image source={SERVICE_HUB_LOGO} style={styles.logo} resizeMode="contain" />
        <Text variant="headlineMedium" style={{ color: colors.textPrimary, fontWeight: '700' }}>
          {APP_NAME}
        </Text>
        <ActivityIndicator size="small" color={colors.primary} style={{ marginTop: spacing.lg }} />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  logo: {
    width: 96,
    height: 96,
  },
});
