import { StyleSheet, View, type ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppTheme } from '@/hooks';

type ScreenLayoutProps = {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  contentStyle?: ViewStyle;
  edges?: ('top' | 'right' | 'bottom' | 'left')[];
};

export function ScreenLayout({
  title,
  subtitle,
  children,
  contentStyle,
  edges = ['top', 'left', 'right'],
}: ScreenLayoutProps) {
  const theme = useAppTheme();
  const { colors, spacing } = theme.tokens;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={edges}>
      <View style={[styles.content, { padding: spacing.xl, gap: spacing.md }, contentStyle]}>
        <View style={{ gap: spacing.xs }}>
          <Text variant="headlineMedium" style={{ color: colors.primaryDark }}>
            {title}
          </Text>
          {subtitle ? (
            <Text variant="bodyLarge" style={{ color: colors.textSecondary }}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        {children}
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
  },
});
