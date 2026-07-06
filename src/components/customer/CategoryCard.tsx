import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useAppTheme } from '@/hooks';
import type { CustomerCategory } from '@/types/customer';

const CATEGORY_TINTS: Record<string, string> = {
  plumber: '#EFF6FF',
  electrician: '#FEF9C3',
  carpenter: '#FFF7ED',
  painter: '#FCE7F3',
  cleaner: '#ECFDF5',
  'ac-repair': '#E0F2FE',
  appliance: '#F3E8FF',
  gardening: '#DCFCE7',
  pest: '#FEE2E2',
  salon: '#FDF2F8',
};

export type CategoryCardProps = {
  category: CustomerCategory;
  selected?: boolean;
  onPress: () => void;
};

export function CategoryCard({ category, selected = false, onPress }: CategoryCardProps) {
  const theme = useAppTheme();
  const { colors, shadows } = theme.tokens;
  const tint = CATEGORY_TINTS[category.id] ?? colors.surfaceVariant;

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: selected ? `${colors.primary}16` : colors.surface,
        },
        shadows.sm,
      ]}
    >
      <View style={[styles.iconWrap, { backgroundColor: tint }]}>
        <MaterialCommunityIcons
          name={category.icon as keyof typeof MaterialCommunityIcons.glyphMap}
          size={22}
          color={colors.primaryDark}
        />
      </View>
      <Text
        variant="labelSmall"
        numberOfLines={2}
        style={{ color: colors.textPrimary, textAlign: 'center', lineHeight: 16 }}
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
