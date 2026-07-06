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
  const { colors } = theme.tokens;

  return (
    <Pressable onPress={onPress} style={styles.wrap}>
      <View
        style={[
          styles.iconWrap,
          {
            backgroundColor: selected ? colors.primaryContainer : colors.surface,
          },
        ]}
      >
        <MaterialCommunityIcons
          name={category.icon as keyof typeof MaterialCommunityIcons.glyphMap}
          size={24}
          color={colors.primaryDark}
        />
      </View>
      <Text
        variant="labelSmall"
        numberOfLines={2}
        style={{
          color: colors.textPrimary,
          textAlign: 'center',
          lineHeight: 15,
          marginTop: 8,
        }}
      >
        {category.title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 76,
    alignItems: 'center',
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
