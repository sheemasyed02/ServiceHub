import { Pressable, StyleSheet, View, type ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';

import { useAppTheme } from '@/hooks';

export type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  inset?: boolean;
  style?: ViewStyle;
};

export function SectionHeader({
  title,
  actionLabel,
  onAction,
  inset = false,
  style,
}: SectionHeaderProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <View style={[styles.row, inset && styles.inset, style]}>
      <Text variant="titleSmall" style={{ color: colors.textPrimary, fontWeight: '600', flex: 1 }}>
        {title}
      </Text>
      {actionLabel && onAction ? (
        <Pressable onPress={onAction} hitSlop={8}>
          <Text variant="labelLarge" style={{ color: colors.primaryDark, fontWeight: '600' }}>
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 8,
    marginTop: 20,
    gap: 12,
  },
  inset: {
    paddingHorizontal: 4,
    marginTop: 0,
  },
});
