import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useAppTheme } from '@/hooks';

export type ProviderSectionHeaderProps = {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  style?: import('react-native').ViewStyle;
};

export function ProviderSectionHeader({
  title,
  actionLabel,
  onAction,
  style,
}: ProviderSectionHeaderProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <View style={[styles.row, style]}>
      <Text variant="titleSmall" style={{ color: colors.textPrimary, fontWeight: '600' }}>
        {title}
      </Text>
      {actionLabel && onAction ? (
        <Pressable onPress={onAction} hitSlop={8}>
          <Text variant="labelMedium" style={{ color: colors.primaryDark, fontWeight: '500' }}>
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
});
