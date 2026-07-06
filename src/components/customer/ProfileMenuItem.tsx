import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useAppTheme } from '@/hooks';

export type ProfileMenuItemProps = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  value?: string;
  danger?: boolean;
  onPress: () => void;
  showDivider?: boolean;
};

export function ProfileMenuItem({
  icon,
  label,
  value,
  danger,
  onPress,
  showDivider = false,
}: ProfileMenuItemProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        pressed && { opacity: 0.65 },
        showDivider && {
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: colors.divider,
        },
      ]}
    >
      <MaterialCommunityIcons
        name={icon}
        size={22}
        color={danger ? colors.error : colors.textSecondary}
        style={styles.icon}
      />
      <Text
        variant="bodyLarge"
        style={{ flex: 1, color: danger ? colors.error : colors.textPrimary }}
      >
        {label}
      </Text>
      {value ? (
        <Text variant="bodySmall" style={{ color: colors.textTertiary }}>
          {value}
        </Text>
      ) : null}
      <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textTertiary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 13,
    paddingHorizontal: 16,
    minHeight: 48,
  },
  icon: {
    width: 24,
    textAlign: 'center',
  },
});
