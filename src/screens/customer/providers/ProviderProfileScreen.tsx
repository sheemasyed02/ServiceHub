import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { CustomerScreen } from '@/components/customer';
import { AppImage, Avatar, PrimaryButton, RatingStars, SecondaryButton } from '@/components/ui';
import { getProviderById } from '@/constants/customer';
import { getProviderImages } from '@/constants/customer/images';
import { useAppTheme } from '@/hooks';
import type { HomeStackParamList } from '@/navigation/types/customer.types';

type Props = NativeStackScreenProps<HomeStackParamList, 'ProviderProfile'>;

export function ProviderProfileScreen({ navigation, route }: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const provider = getProviderById(route.params.providerId);
  const images = provider ? getProviderImages(provider.id) : undefined;

  if (!provider) {
    return (
      <CustomerScreen>
        <Text style={{ padding: 20 }}>Provider not found.</Text>
      </CustomerScreen>
    );
  }

  return (
    <CustomerScreen>
      {images?.cover ? (
        <AppImage uri={images.cover} aspectRatio={2.2} radius={0} style={styles.cover} />
      ) : null}

      <View style={styles.hero}>
        <Avatar
          source={images?.avatar ? { uri: images.avatar } : undefined}
          name={provider.name}
          size="xl"
        />
        <View style={styles.heroInfo}>
          <View style={styles.nameRow}>
            <Text variant="titleLarge" style={{ fontWeight: '600', color: colors.textPrimary }}>
              {provider.name}
            </Text>
            {provider.verified ? (
              <MaterialCommunityIcons name="check-decagram" size={18} color={colors.primary} />
            ) : null}
          </View>
          <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
            {provider.profession} · {provider.experience}
          </Text>
          <View style={styles.ratingRow}>
            <RatingStars rating={provider.rating} size={14} readonly />
            <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
              {provider.rating} · {provider.reviewCount} reviews
            </Text>
          </View>
        </View>
      </View>

      <SectionBlock title="About">
        <Text variant="bodyMedium" style={{ color: colors.textSecondary, lineHeight: 22 }}>
          {provider.about}
        </Text>
      </SectionBlock>

      <SectionBlock title="Services">
        {provider.services.map((service) => (
          <View key={service.id} style={[styles.serviceRow, { borderBottomColor: colors.border }]}>
            <Text variant="bodyMedium" style={{ color: colors.textPrimary, flex: 1 }}>
              {service.name}
            </Text>
            <Text variant="bodyMedium" style={{ color: colors.textPrimary, fontWeight: '600' }}>
              ₹{service.price}
            </Text>
          </View>
        ))}
      </SectionBlock>

      {images?.portfolio?.length ? (
        <SectionBlock title="Work photos">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
          >
            {images.portfolio.map((uri) => (
              <AppImage
                key={uri}
                uri={uri}
                aspectRatio={1}
                radius={10}
                style={styles.portfolioItem}
              />
            ))}
          </ScrollView>
        </SectionBlock>
      ) : null}

      <SectionBlock title="Skills">
        <View style={styles.chips}>
          {provider.skills.map((skill) => (
            <View
              key={skill}
              style={[
                styles.chip,
                { backgroundColor: colors.surfaceVariant, borderColor: colors.border },
              ]}
            >
              <Text variant="labelMedium" style={{ color: colors.textSecondary }}>
                {skill}
              </Text>
            </View>
          ))}
        </View>
      </SectionBlock>

      <SectionBlock title="Reviews">
        {provider.reviews.map((review) => (
          <View key={review.id} style={[styles.review, { borderColor: colors.border }]}>
            <Text variant="bodyMedium" style={{ fontWeight: '600', color: colors.textPrimary }}>
              {review.author}
            </Text>
            <RatingStars rating={review.rating} size={12} readonly />
            <Text variant="bodySmall" style={{ color: colors.textSecondary, marginTop: 6 }}>
              {review.text}
            </Text>
          </View>
        ))}
      </SectionBlock>

      <View
        style={[styles.footer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}
      >
        <View>
          <Text variant="labelSmall" style={{ color: colors.textTertiary }}>
            From
          </Text>
          <Text variant="titleMedium" style={{ color: colors.textPrimary, fontWeight: '600' }}>
            ₹{provider.priceFrom}
          </Text>
        </View>
        <SecondaryButton
          label="Message"
          variant="outline"
          fullWidth={false}
          onPress={() => undefined}
          style={{ minWidth: 96 }}
        />
        <PrimaryButton
          label="Book"
          fullWidth={false}
          onPress={() => navigation.navigate('Booking', { providerId: provider.id })}
          style={{ minWidth: 96 }}
        />
      </View>
    </CustomerScreen>
  );
}

function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <View style={styles.block}>
      <Text
        variant="titleSmall"
        style={{ color: colors.textPrimary, fontWeight: '600', marginBottom: 10 }}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  cover: { width: '100%' },
  hero: {
    flexDirection: 'row',
    gap: 14,
    padding: 20,
    marginTop: -24,
  },
  heroInfo: { flex: 1, gap: 4, paddingTop: 8 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  block: { paddingHorizontal: 20, marginBottom: 22 },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  portfolioItem: { width: 100, height: 100 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  review: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 16,
    borderTopWidth: 1,
    marginTop: 8,
  },
});
