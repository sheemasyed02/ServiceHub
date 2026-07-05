import { StyleSheet, View, type ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';

import { useAppTheme } from '@/hooks';

export type DividerProps = {
  label?: string;
  spacing?: number;
  style?: ViewStyle;
};

export function Divider({ label, spacing = 16, style }: DividerProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  if (!label) {
    return (
      <View
        style={[styles.line, { marginVertical: spacing, backgroundColor: colors.divider }, style]}
      />
    );
  }

  return (
    <View style={[styles.row, { marginVertical: spacing }, style]}>
      <View style={[styles.line, styles.flex, { backgroundColor: colors.divider }]} />
      <Text variant="labelMedium" style={{ color: colors.textTertiary, paddingHorizontal: 12 }}>
        {label}
      </Text>
      <View style={[styles.line, styles.flex, { backgroundColor: colors.divider }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  line: {
    height: 1,
  },
  flex: {
    flex: 1,
  },
});
