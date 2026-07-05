import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppTheme } from '@/hooks';

export type AuthScreenLayoutProps = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  contentStyle?: ViewStyle;
};

export function AuthScreenLayout({
  children,
  title,
  subtitle,
  showBack = false,
  onBack,
  header,
  footer,
  contentStyle,
}: AuthScreenLayoutProps) {
  const theme = useAppTheme();
  const { colors, spacing } = theme.tokens;

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: colors.background }]}
      edges={['top', 'left', 'right']}
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
      >
        <ScrollView
          automaticallyAdjustKeyboardInsets
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="interactive"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scroll,
            { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl },
          ]}
        >
          {showBack ? <IconButton icon="arrow-left" onPress={onBack} style={styles.back} /> : null}

          {header}

          {(title || subtitle) && (
            <View style={{ gap: 4, marginBottom: spacing.md }}>
              {title ? (
                <Text
                  variant="headlineSmall"
                  style={{ color: colors.textPrimary, fontWeight: '700' }}
                >
                  {title}
                </Text>
              ) : null}
              {subtitle ? (
                <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
                  {subtitle}
                </Text>
              ) : null}
            </View>
          )}

          <View style={[styles.content, contentStyle]}>{children}</View>
          {footer}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    paddingTop: 8,
  },
  content: {
    gap: 14,
  },
  back: {
    alignSelf: 'flex-start',
    marginLeft: -8,
    marginBottom: 4,
  },
});
