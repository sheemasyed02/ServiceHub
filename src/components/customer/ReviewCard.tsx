import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { AppImage, Avatar, RatingStars } from '@/components/ui';
import { MOCK_IMAGES } from '@/constants/customer/images';
import { useAppTheme } from '@/hooks';
import type { CustomerReviewItem } from '@/constants/customer';

export type ReviewCardProps = {
  review: CustomerReviewItem;
};

export function ReviewCard({ review }: ReviewCardProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const photos = review.photoUrls ?? [];
  const authorAvatar =
    review.authorAvatar ?? MOCK_IMAGES.reviewers[review.id as keyof typeof MOCK_IMAGES.reviewers];

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.header}>
        <Avatar
          source={authorAvatar ? { uri: authorAvatar } : undefined}
          name={review.author}
          size="sm"
        />
        <View style={{ flex: 1 }}>
          <Text variant="bodyLarge" style={{ fontWeight: '600', color: colors.textPrimary }}>
            {review.author}
          </Text>
          <Text variant="bodySmall" style={{ color: colors.textTertiary }}>
            {review.date} · {review.service}
          </Text>
        </View>
        <RatingStars rating={review.rating} size={12} readonly />
      </View>

      <Text
        variant="bodyMedium"
        style={{ color: colors.textSecondary, lineHeight: 22, marginTop: 10 }}
      >
        {review.text}
      </Text>

      {photos.length > 0 ? (
        <View style={styles.photoRow}>
          {photos.map((uri) => (
            <AppImage key={uri} uri={uri} aspectRatio={1} radius={8} style={styles.photo} />
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  photoRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  photo: {
    width: 64,
    height: 64,
  },
});
