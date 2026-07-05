import { ScrollView, StyleSheet, View, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppTheme } from '@/hooks';

export type CustomerScreenProps = {
  children: React.ReactNode;
  scroll?: boolean;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  bottomPadding?: number;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  /** Header stays fixed below the status bar; only body scrolls. */
  fixedHeader?: React.ReactNode;
};

export function CustomerScreen({
  children,
  scroll = true,
  style,
  contentStyle,
  bottomPadding = 88,
  edges = ['top', 'left', 'right'],
  fixedHeader,
}: CustomerScreenProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  if (fixedHeader) {
    return (
      <View style={[styles.safe, { backgroundColor: colors.background }, style]}>
        <SafeAreaView
          edges={['top', 'left', 'right']}
          style={{ backgroundColor: colors.background }}
        >
          {fixedHeader}
        </SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="never"
          automaticallyAdjustContentInsets={false}
          bounces
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
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={[styles.scroll, { paddingBottom: bottomPadding }, contentStyle]}
        style={styles.flex}
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
