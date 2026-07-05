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
};

export function CustomerScreen({
  children,
  scroll = true,
  style,
  contentStyle,
  bottomPadding = 88,
  edges = ['top', 'left', 'right'],
}: CustomerScreenProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

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
        contentContainerStyle={[styles.scroll, { paddingBottom: bottomPadding }, contentStyle]}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  fill: { flex: 1 },
  scroll: {
    flexGrow: 1,
  },
});
