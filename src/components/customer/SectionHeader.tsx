import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useAppTheme } from '@/hooks';

export type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function SectionHeader({ title, actionLabel, onAction }: SectionHeaderProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <View style={styles.row}>
      <View style={styles.titleWrap}>
        <View style={[styles.accent, { backgroundColor: colors.primary }]} />
        <Text variant="titleSmall" style={{ color: colors.textPrimary, fontWeight: '700' }}>
          {title}
        </Text>
      </View>
      {actionLabel && onAction ? (
        <Pressable onPress={onAction} hitSlop={8}>
          <Text variant="labelMedium" style={{ color: colors.primaryDark, fontWeight: '600' }}>
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
    marginBottom: 12,
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  accent: {
    width: 4,
    height: 18,
    borderRadius: 2,
  },
});
