import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { Avatar, RatingStars } from '@/components/ui';
import { getProviderImages } from '@/constants/customer/images';
import { useAppTheme } from '@/hooks';
import type { Provider } from '@/types/customer';

export type SearchResultItemProps = {
  provider: Provider;
  onPress: () => void;
};

export function SearchResultItem({ provider, onPress }: SearchResultItemProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const images = getProviderImages(provider.id);

  return (
    <Pressable
      onPress={onPress}
      style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.border }]}
    >
      <Avatar
        source={images?.avatar ? { uri: images.avatar } : undefined}
        name={provider.name}
        size="md"
      />
      <View style={styles.info}>
        <Text variant="bodyLarge" style={{ fontWeight: '600', color: colors.textPrimary }}>
          {provider.name}
        </Text>
        <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
          {provider.profession} · {provider.distance}
        </Text>
        <RatingStars rating={provider.rating} size={12} readonly />
      </View>
      <View style={styles.price}>
        <Text variant="labelMedium" style={{ color: colors.textPrimary, fontWeight: '600' }}>
          ₹{provider.priceFrom}
        </Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textTertiary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    marginHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  price: {
    alignItems: 'flex-end',
  },
});
