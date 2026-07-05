import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { SortSheet } from '@/components/bottom-sheets';
import { CustomerScreen, ReviewCard, SectionHeader } from '@/components/customer';
import { AppImage, PrimaryButton, RatingStars } from '@/components/ui';
import {
  MOCK_CUSTOMER_REVIEWS,
  OVERALL_RATING,
  REVIEW_BREAKDOWN,
  REVIEW_SORT_OPTIONS,
} from '@/constants/customer';
import { useAppTheme } from '@/hooks';

export function ReviewsScreen() {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const [sortId, setSortId] = useState('recent');
  const [sortOpen, setSortOpen] = useState(false);

  const totalReviews = REVIEW_BREAKDOWN.reduce((sum, item) => sum + item.count, 0);

  const reviews = useMemo(() => {
    const list = [...MOCK_CUSTOMER_REVIEWS];
    if (sortId === 'highest') return list.sort((a, b) => b.rating - a.rating);
    if (sortId === 'lowest') return list.sort((a, b) => a.rating - b.rating);
    if (sortId === 'photos') return list.filter((r) => r.photoUrls?.length);
    return list;
  }, [sortId]);

  const photoReviews = reviews.flatMap((r) => r.photoUrls ?? []).slice(0, 6);

  return (
    <CustomerScreen>
      <Text
        variant="titleLarge"
        style={{
          fontWeight: '600',
          color: colors.textPrimary,
          paddingHorizontal: 20,
          marginBottom: 16,
        }}
      >
        Reviews
      </Text>

      <View
        style={[styles.summary, { backgroundColor: colors.surface, borderColor: colors.border }]}
      >
        <View style={styles.overall}>
          <Text variant="headlineMedium" style={{ color: colors.textPrimary, fontWeight: '600' }}>
            {OVERALL_RATING}
          </Text>
          <RatingStars rating={OVERALL_RATING} size={16} readonly />
          <Text variant="bodySmall" style={{ color: colors.textTertiary, marginTop: 4 }}>
            {totalReviews} reviews
          </Text>
        </View>
        <View style={styles.breakdown}>
          {REVIEW_BREAKDOWN.map((row) => {
            const pct = totalReviews > 0 ? (row.count / totalReviews) * 100 : 0;
            return (
              <View key={row.stars} style={styles.breakdownRow}>
                <Text variant="labelSmall" style={{ color: colors.textTertiary, width: 20 }}>
                  {row.stars}
                </Text>
                <View style={[styles.barTrack, { backgroundColor: colors.surfaceVariant }]}>
                  <View
                    style={[styles.barFill, { width: `${pct}%`, backgroundColor: colors.primary }]}
                  />
                </View>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.toolbar}>
        <PrimaryButton
          label="Write review"
          size="sm"
          fullWidth={false}
          onPress={() => Alert.alert('Write Review', 'Review form coming soon.')}
          style={{ flex: 1 }}
        />
        <Pressable
          onPress={() => setSortOpen(true)}
          style={[styles.sortBtn, { borderColor: colors.border, backgroundColor: colors.surface }]}
        >
          <MaterialCommunityIcons name="sort" size={18} color={colors.textSecondary} />
        </Pressable>
      </View>

      {photoReviews.length > 0 ? (
        <>
          <SectionHeader title="Photos" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.photoStrip}
          >
            {photoReviews.map((uri) => (
              <AppImage key={uri} uri={uri} aspectRatio={1} radius={10} style={styles.photoTile} />
            ))}
          </ScrollView>
        </>
      ) : null}

      <SectionHeader title="All reviews" />
      <View style={{ gap: 10, marginBottom: 20 }}>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </View>

      <SortSheet
        visible={sortOpen}
        onClose={() => setSortOpen(false)}
        options={REVIEW_SORT_OPTIONS}
        selectedId={sortId}
        onChange={setSortId}
        onApply={() => undefined}
      />
    </CustomerScreen>
  );
}

const styles = StyleSheet.create({
  summary: {
    marginHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    flexDirection: 'row',
    gap: 20,
    marginBottom: 16,
  },
  overall: { alignItems: 'center', minWidth: 88 },
  breakdown: { flex: 1, gap: 6, justifyContent: 'center' },
  breakdownRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  barTrack: { flex: 1, height: 4, borderRadius: 999, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 999 },
  toolbar: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sortBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoStrip: {
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 16,
  },
  photoTile: {
    width: 72,
    height: 72,
  },
});
