import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { APP_NAME } from '@/constants';
import { useAppTheme } from '@/hooks';

export function HomeScreen() {
  const theme = useAppTheme();
  const { colors, spacing } = theme.tokens;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.content, { padding: spacing.xl, gap: spacing.sm }]}>
        <Text variant="displaySmall" style={{ color: colors.primaryDark }}>
          {APP_NAME}
        </Text>
        <Text variant="bodyLarge" style={{ color: colors.textSecondary, textAlign: 'center' }}>
          Welcome to your service hub.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
