import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRef } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
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
};

export function ProviderCard({ provider, layout = 'list', onPress, onBook }: ProviderCardProps) {
  const theme = useAppTheme();
  const { colors, shadows } = theme.tokens;
  const images = getProviderImages(provider.id);
  const avatarSource = images?.avatar ? { uri: images.avatar } : undefined;
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scale, { toValue: 0.98, useNativeDriver: true, friction: 8 }).start();
  };
  const pressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 8 }).start();
  };

  if (layout === 'compact') {
    return (
      <Pressable onPress={onPress} onPressIn={pressIn} onPressOut={pressOut}>
        <Animated.View
          style={[
            styles.compact,
            { transform: [{ scale }], backgroundColor: colors.surface, borderColor: colors.border },
            shadows.sm,
          ]}
        >
          <AppImage
            uri={images?.cover ?? images?.avatar ?? MOCK_FALLBACK}
            aspectRatio={1.2}
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
            <Text variant="labelLarge" style={{ color: colors.primaryDark, marginTop: 6 }}>
              ₹{provider.priceFrom}
            </Text>
          </View>
        </Animated.View>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} onPressIn={pressIn} onPressOut={pressOut}>
      <Animated.View
        style={[
          styles.card,
          { transform: [{ scale }], backgroundColor: colors.surface, borderColor: colors.border },
          shadows.sm,
        ]}
      >
        <Avatar source={avatarSource} name={provider.name} size="lg" />
        <View style={styles.body}>
          <View style={styles.titleRow}>
            <Text
              variant="titleSmall"
              numberOfLines={1}
              style={{ color: colors.textPrimary, flex: 1 }}
            >
              {provider.name}
            </Text>
            {provider.verified ? (
              <MaterialCommunityIcons name="check-decagram" size={16} color={colors.primary} />
            ) : null}
          </View>
          <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
            {provider.profession} · {provider.experience}
          </Text>
          <View style={styles.meta}>
            <RatingStars rating={provider.rating} size={12} readonly />
            <Text variant="labelSmall" style={{ color: colors.textTertiary }}>
              {provider.rating} · {provider.distance}
            </Text>
          </View>
          <View style={styles.footer}>
            <Text variant="labelLarge" style={{ color: colors.textPrimary }}>
              ₹{provider.priceFrom}
              <Text variant="labelSmall" style={{ color: colors.textTertiary }}>
                {' '}
                onwards
              </Text>
            </Text>
            <Pressable
              onPress={onBook ?? onPress}
              hitSlop={8}
              style={[styles.bookBtn, { backgroundColor: colors.primary }]}
            >
              <Text variant="labelMedium" style={{ color: colors.onPrimary, fontWeight: '600' }}>
                Book
              </Text>
            </Pressable>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const MOCK_FALLBACK = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 14,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  body: { flex: 1, gap: 4 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  bookBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  compact: {
    width: 168,
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },
  compactImage: { width: '100%' },
  compactBody: { padding: 12, gap: 2 },
  compactMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
});
