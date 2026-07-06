import { StyleSheet, View, type ViewStyle } from 'react-native';

import { useAppTheme } from '@/hooks';

export type SectionPanelProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  noPadding?: boolean;
};

/** Elevated app-style section container — avoids flat website-like rows. */
export function SectionPanel({ children, style, noPadding = false }: SectionPanelProps) {
  const theme = useAppTheme();
  const { colors, shadows } = theme.tokens;

  return (
    <View
      style={[
        styles.panel,
        {
          backgroundColor: colors.surface,
          borderColor: colors.borderLight,
          ...shadows.sm,
        },
        noPadding ? styles.noPad : null,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    overflow: 'hidden',
  },
  noPad: {
    padding: 0,
  },
});
