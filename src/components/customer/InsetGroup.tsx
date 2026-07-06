import { StyleSheet, View, type ViewStyle } from 'react-native';

import { useAppTheme } from '@/hooks';

export type InsetGroupProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

/** iOS-style inset grouped block — one surface, no nested card chrome. */
export function InsetGroup({ children, style }: InsetGroupProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <View style={[styles.group, { backgroundColor: colors.surface }, style]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  group: {
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
  },
});
