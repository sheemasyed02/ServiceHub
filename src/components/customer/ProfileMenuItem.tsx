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
};

export function ProfileMenuItem({ icon, label, value, danger, onPress }: ProfileMenuItemProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && { opacity: 0.7 }]}>
      <View style={[styles.iconWrap, { backgroundColor: colors.primaryContainer }]}>
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={danger ? colors.error : colors.primaryDark}
        />
      </View>
      <Text
        variant="bodyLarge"
        style={{ flex: 1, color: danger ? colors.error : colors.textPrimary, fontWeight: '500' }}
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
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
