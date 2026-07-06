import { ScrollView, StyleSheet, View, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppTheme } from '@/hooks';

export type ProviderScreenProps = {
  children: React.ReactNode;
  scroll?: boolean;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  bottomPadding?: number;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  fixedHeader?: React.ReactNode;
};

export function ProviderScreen({
  children,
  scroll = true,
  style,
  contentStyle,
  bottomPadding = 100,
  edges = ['top', 'left', 'right'],
  fixedHeader,
}: ProviderScreenProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  if (fixedHeader) {
    return (
      <View style={[styles.safe, { backgroundColor: colors.background }, style]}>
        <SafeAreaView edges={['top', 'left', 'right']} style={{ backgroundColor: colors.background }}>
          {fixedHeader}
        </SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="never"
          contentContainerStyle={[styles.scroll, { paddingBottom: bottomPadding }, contentStyle]}
          style={styles.flex}
        >
          {children}
        </ScrollView>
      </View>
    );
  }

  if (!scroll) {
    return (
      <SafeAreaView
        style={[styles.safe, { backgroundColor: colors.background }, style]}
        edges={edges}
      >
        <View style={[styles.fill, contentStyle]}>{children}</View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: colors.background }, style]}
      edges={edges}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never"
        contentContainerStyle={[styles.scroll, { paddingBottom: bottomPadding }, contentStyle]}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  flex: { flex: 1 },
  fill: { flex: 1 },
  scroll: { flexGrow: 1 },
});
