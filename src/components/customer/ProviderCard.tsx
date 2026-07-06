import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { AppImage, Avatar, RatingStars } from '@/components/ui';
import { getProviderImages } from '@/constants/customer/images';
import { useAppTheme } from '@/hooks';
import type { Provider } from '@/types/customer';

export type ProviderCardProps = {
  provider: Provider;
  layout?: 'list' | 'compact';
  onPress: () => void;
  onBook?: () => void;
  /** Hairline between rows inside an InsetGroup. */
  showDivider?: boolean;
};

export function ProviderCard({
  provider,
  layout = 'list',
  onPress,
  onBook,
  showDivider = false,
}: ProviderCardProps) {
  const theme = useAppTheme();
  const { colors, shadows } = theme.tokens;
  const images = getProviderImages(provider.id);
  const avatarSource = images?.avatar ? { uri: images.avatar } : undefined;

  if (layout === 'compact') {
    return (
      <Pressable onPress={onPress} style={styles.compactWrap}>
        <View style={[styles.compact, { backgroundColor: colors.surface }, shadows.sm]}>
          <AppImage
            uri={images?.cover ?? images?.avatar ?? MOCK_FALLBACK}
            aspectRatio={1.15}
            radius={0}
            style={styles.compactImage}
          />
          <View style={styles.compactBody}>
            <Text variant="labelLarge" numberOfLines={1} style={{ color: colors.textPrimary }}>
              {provider.name}
            </Text>
            <Text variant="bodySmall" numberOfLines={1} style={{ color: colors.textSecondary }}>
              {provider.profession}
            </Text>
            <View style={styles.compactMeta}>
              <RatingStars rating={provider.rating} size={12} readonly />
              <Text variant="labelSmall" style={{ color: colors.textTertiary }}>
                {provider.rating}
              </Text>
            </View>
            <Text variant="labelMedium" style={{ color: colors.textPrimary, marginTop: 4 }}>
              ₹{provider.priceFrom}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.row,
        showDivider && {
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: colors.divider,
        },
      ]}
    >
      <Avatar source={avatarSource} name={provider.name} size="md" />
      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text variant="bodyLarge" numberOfLines={1} style={{ color: colors.textPrimary, flex: 1 }}>
            {provider.name}
          </Text>
          {provider.verified ? (
            <MaterialCommunityIcons name="check-decagram" size={15} color={colors.primary} />
          ) : null}
        </View>
        <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
          {provider.profession} · {provider.distance}
        </Text>
        <View style={styles.meta}>
          <RatingStars rating={provider.rating} size={11} readonly />
          <Text variant="labelSmall" style={{ color: colors.textTertiary }}>
            {provider.rating}
          </Text>
          <Text variant="labelSmall" style={{ color: colors.textTertiary }}>
            ·
          </Text>
          <Text variant="labelSmall" style={{ color: colors.textPrimary }}>
            ₹{provider.priceFrom}+
          </Text>
        </View>
      </View>
      <Pressable onPress={onBook ?? onPress} hitSlop={12} style={styles.chevron}>
        <MaterialCommunityIcons name="chevron-right" size={22} color={colors.textTertiary} />
      </Pressable>
    </Pressable>
  );
}

const MOCK_FALLBACK = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  body: { flex: 1, gap: 2 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  chevron: { paddingLeft: 4 },
  compactWrap: { width: 152 },
  compact: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  compactImage: { width: '100%' },
  compactBody: { padding: 10, gap: 1 },
  compactMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
});
