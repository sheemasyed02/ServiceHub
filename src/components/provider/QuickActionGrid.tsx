import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useAppTheme } from '@/hooks';

type QuickAction = {
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress: () => void;
};

export type QuickActionGridProps = {
  actions: QuickAction[];
};

export function QuickActionGrid({ actions }: QuickActionGridProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <View style={styles.grid}>
      {actions.map((action) => (
        <Pressable
          key={action.label}
          onPress={action.onPress}
          style={[styles.item, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <View style={[styles.iconWrap, { backgroundColor: `${colors.primary}12` }]}>
            <MaterialCommunityIcons name={action.icon} size={22} color={colors.primaryDark} />
          </View>
          <Text variant="labelMedium" style={{ color: colors.textPrimary, marginTop: 8 }}>
            {action.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 20,
  },
  item: {
    width: '47%',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
