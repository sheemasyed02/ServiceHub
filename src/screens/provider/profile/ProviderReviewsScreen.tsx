import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { ProviderScreen } from '@/components/provider';
import { AppImage, Avatar, RatingStars } from '@/components/ui';
import { NoReviewsEmptyState } from '@/components/ui/empty-states';
import { MOCK_PROVIDER_REVIEWS, MOCK_PROVIDER_USER } from '@/constants/provider';
import { useAppTheme } from '@/hooks';
import type { ProviderProfileStackParamList } from '@/navigation/types/provider.types';

type Props = NativeStackScreenProps<ProviderProfileStackParamList, 'Reviews'>;

const RATING_DIST = [5, 4, 3, 2, 1];
const RATING_COUNTS = { 5: 180, 4: 24, 3: 7, 2: 2, 1: 1 };

export function ProviderReviewsScreen(_props: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const [sort, setSort] = useState<'recent' | 'rating'>('recent');
  const reviews = [...MOCK_PROVIDER_REVIEWS].sort((a, b) =>
    sort === 'rating' ? b.rating - a.rating : 0,
  );

  if (reviews.length === 0) {
    return (
      <ProviderScreen scroll={false}>
        <NoReviewsEmptyState style={{ flex: 1 }} />
      </ProviderScreen>
    );
  }

  const maxCount = Math.max(...Object.values(RATING_COUNTS));

  return (
    <ProviderScreen bottomPadding={40}>
      <View
        style={[styles.summary, { backgroundColor: colors.surface, borderColor: colors.border }]}
      >
        <Text variant="displaySmall" style={{ color: colors.textPrimary, fontWeight: '700' }}>
          {MOCK_PROVIDER_USER.rating}
        </Text>
        <RatingStars rating={MOCK_PROVIDER_USER.rating} size={20} readonly />
        <Text variant="bodySmall" style={{ color: colors.textSecondary, marginTop: 4 }}>
          {MOCK_PROVIDER_USER.reviewCount} reviews
        </Text>
      </View>

      <View style={styles.filters}>
        <FilterChip label="Recent" active={sort === 'recent'} onPress={() => setSort('recent')} />
        <FilterChip
          label="Highest rated"
          active={sort === 'rating'}
          onPress={() => setSort('rating')}
        />
      </View>

      <View style={[styles.dist, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        {RATING_DIST.map((star) => (
          <View key={star} style={styles.distRow}>
            <Text variant="labelSmall" style={{ color: colors.textSecondary, width: 24 }}>
              {star}★
            </Text>
            <View style={[styles.barBg, { backgroundColor: colors.surfaceVariant }]}>
              <View
                style={[
                  styles.barFill,
                  {
                    backgroundColor: colors.primary,
                    width: `${(RATING_COUNTS[star as keyof typeof RATING_COUNTS] / maxCount) * 100}%`,
                  },
                ]}
              />
            </View>
            <Text variant="labelSmall" style={{ color: colors.textTertiary, width: 28 }}>
              {RATING_COUNTS[star as keyof typeof RATING_COUNTS]}
            </Text>
          </View>
        ))}
      </View>

      {reviews.map((review) => (
        <View
          key={review.id}
          style={[styles.review, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <View style={styles.reviewHeader}>
            <Avatar source={{ uri: review.avatar }} name={review.author} size="sm" />
            <View style={{ flex: 1 }}>
              <Text variant="titleSmall" style={{ color: colors.textPrimary }}>
                {review.author}
              </Text>
              <Text variant="labelSmall" style={{ color: colors.textTertiary }}>
                {review.date} · {review.service}
              </Text>
            </View>
            <RatingStars rating={review.rating} size={12} readonly />
          </View>
          <Text variant="bodyMedium" style={{ color: colors.textSecondary, marginTop: 8 }}>
            {review.text}
          </Text>
          {review.photos?.length ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
              {review.photos.map((uri) => (
                <AppImage key={uri} uri={uri} aspectRatio={1} radius={8} style={styles.photo} />
              ))}
            </ScrollView>
          ) : null}
        </View>
      ))}
    </ProviderScreen>
  );
}

function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        active
          ? { backgroundColor: `${colors.primary}18`, borderColor: colors.primary }
          : { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <Text
        variant="labelMedium"
        style={{ color: active ? colors.primaryDark : colors.textSecondary }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  summary: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 16,
  },
  filters: { flexDirection: 'row', gap: 8, paddingHorizontal: 20, marginBottom: 16 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  dist: {
    marginHorizontal: 20,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 16,
    gap: 8,
  },
  distRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  barBg: { flex: 1, height: 6, borderRadius: 3, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 3 },
  review: { marginHorizontal: 20, padding: 14, borderRadius: 14, borderWidth: 1, marginBottom: 10 },
  reviewHeader: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  photo: { width: 72, marginRight: 8 },
});
