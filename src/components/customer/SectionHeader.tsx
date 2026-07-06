import { Pressable, StyleSheet, View, type ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';

import { useAppTheme } from '@/hooks';

export type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  inset?: boolean;
  style?: ViewStyle;
};

export function SectionHeader({
  title,
  subtitle,
  actionLabel,
  onAction,
  inset = false,
  style,
}: SectionHeaderProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <View style={[styles.row, inset && styles.inset, style]}>
      <View style={styles.titleWrap}>
        <Text variant="titleMedium" style={{ color: colors.textPrimary, fontWeight: '800' }}>
          {title}
        </Text>
        {subtitle ? (
          <Text variant="bodySmall" style={{ color: colors.textSecondary, marginTop: 3 }}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {actionLabel && onAction ? (
        <Pressable
          onPress={onAction}
          hitSlop={8}
          style={[styles.actionBtn, { backgroundColor: colors.primaryContainer }]}
        >
          <Text variant="labelMedium" style={{ color: colors.primaryDark, fontWeight: '700' }}>
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
    paddingHorizontal: 16,
    marginBottom: 14,
    gap: 12,
  },
  inset: {
    paddingHorizontal: 0,
    marginBottom: 12,
  },
  titleWrap: {
    flex: 1,
    gap: 0,
  },
  actionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
});
