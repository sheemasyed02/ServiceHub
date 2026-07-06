import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useAppTheme } from '@/hooks';
import type { CustomerCategory } from '@/types/customer';

export type CategoryCardProps = {
  category: CustomerCategory;
  selected?: boolean;
  onPress: () => void;
};

export function CategoryCard({ category, selected = false, onPress }: CategoryCardProps) {
  const theme = useAppTheme();
  const { colors, shadows } = theme.tokens;

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: selected ? colors.primaryContainer : colors.surfaceElevated,
          borderColor: selected ? colors.primary : colors.borderLight,
        },
        shadows.sm,
      ]}
    >
      <View
        style={[
          styles.iconWrap,
          {
            backgroundColor: selected ? `${colors.primary}22` : colors.surfaceVariant,
          },
        ]}
      >
        <MaterialCommunityIcons
          name={category.icon as keyof typeof MaterialCommunityIcons.glyphMap}
          size={22}
          color={colors.primaryDark}
        />
      </View>
      <Text
        variant="labelSmall"
        numberOfLines={2}
        style={{
          color: colors.textPrimary,
          textAlign: 'center',
          lineHeight: 16,
          fontWeight: '600',
        }}
      >
        {category.title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 88,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    gap: 10,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
