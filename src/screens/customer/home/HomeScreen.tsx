import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  CategoryScroller,
  CustomerScreen,
  OffersBanner,
  ProviderCard,
  SectionHeader,
} from '@/components/customer';
import { Avatar, SearchBar } from '@/components/ui';
import { MOCK_OFFERS, MOCK_PROVIDERS, MOCK_USER } from '@/constants/customer';
import { MOCK_IMAGES } from '@/constants/customer/images';
import { useAppTheme } from '@/hooks';
import type { HomeStackParamList } from '@/navigation/types/customer.types';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeMain'>;

export function HomeScreen({ navigation }: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const firstName = MOCK_USER.name.split(' ')[0];
  const insets = useSafeAreaInsets();

  return (
    <CustomerScreen edges={[]}>
      <LinearGradient
        colors={['#FFFBEB', '#F8F9FA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.heroGradient, { paddingTop: insets.top + 8 }]}
      >
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={{ flex: 1 }}>
              <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
                {greeting}
              </Text>
              <Text variant="headlineSmall" style={{ color: colors.textPrimary }}>
                Hi, {firstName}
              </Text>
            </View>
            <Pressable onPress={() => navigation.getParent()?.navigate('Profile')}>
              <Avatar source={{ uri: MOCK_IMAGES.userAvatar }} name={MOCK_USER.name} size="md" />
            </Pressable>
          </View>

          <Pressable
            style={[
              styles.locationChip,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <MaterialCommunityIcons name="map-marker" size={16} color={colors.primaryDark} />
            <Text
              variant="labelLarge"
              style={{ color: colors.textPrimary, flex: 1 }}
              numberOfLines={1}
            >
              {MOCK_USER.location}
            </Text>
            <MaterialCommunityIcons name="chevron-down" size={18} color={colors.textTertiary} />
          </Pressable>

          <Pressable onPress={() => navigation.navigate('Search')} style={styles.search}>
            <SearchBar
              placeholder="What do you need help with?"
              editable={false}
              pointerEvents="none"
            />
          </Pressable>
        </View>
      </LinearGradient>

      <View style={styles.quickRow}>
        {QUICK_ACTIONS.map((action) => (
          <Pressable
            key={action.label}
            onPress={() => navigation.navigate('ProviderListing', { categoryTitle: action.label })}
            style={[
              styles.quickChip,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <View style={[styles.quickIcon, { backgroundColor: `${colors.primary}14` }]}>
              <MaterialCommunityIcons name={action.icon} size={18} color={colors.primaryDark} />
            </View>
            <Text variant="labelMedium" style={{ color: colors.textPrimary }}>
              {action.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <SectionHeader
        title="Categories"
        actionLabel="See all"
        onAction={() => navigation.navigate('ProviderListing', {})}
      />
      <CategoryScroller
        onSelect={(id, title) =>
          navigation.navigate('ProviderListing', { categoryId: id, categoryTitle: title })
        }
      />

      <View style={styles.spacer} />

      <SectionHeader title="Top picks" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.hScroll}
      >
        {MOCK_PROVIDERS.slice(0, 4).map((p) => (
          <ProviderCard
            key={p.id}
            provider={p}
            layout="compact"
            onPress={() => navigation.navigate('ProviderProfile', { providerId: p.id })}
            onBook={() => navigation.navigate('Booking', { providerId: p.id })}
          />
        ))}
      </ScrollView>

      <View style={styles.spacer} />

      <SectionHeader
        title="Near you"
        actionLabel="View all"
        onAction={() => navigation.navigate('ProviderListing', {})}
      />
      <View style={styles.list}>
        {MOCK_PROVIDERS.map((p) => (
          <ProviderCard
            key={p.id}
            provider={p}
            onPress={() => navigation.navigate('ProviderProfile', { providerId: p.id })}
            onBook={() => navigation.navigate('Booking', { providerId: p.id })}
          />
        ))}
      </View>

      <View style={styles.spacer} />

      <SectionHeader title="Offers" />
      <OffersBanner
        title={MOCK_OFFERS[0].title}
        subtitle={MOCK_OFFERS[0].subtitle}
        code={MOCK_OFFERS[0].code}
      />

      <View style={{ height: 32 }} />
    </CustomerScreen>
  );
}

const QUICK_ACTIONS = [
  { label: 'Plumber', icon: 'pipe-wrench' as const },
  { label: 'Electrician', icon: 'flash' as const },
  { label: 'Cleaning', icon: 'broom' as const },
  { label: 'AC Repair', icon: 'air-conditioner' as const },
];

const styles = StyleSheet.create({
  heroGradient: {
    marginBottom: 8,
  },
  header: {
    paddingHorizontal: 20,
    gap: 14,
    paddingBottom: 8,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  locationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  search: {
    marginTop: 2,
  },
  quickRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  quickChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  quickIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: { height: 22 },
  hScroll: { paddingHorizontal: 20, gap: 12 },
  list: { paddingHorizontal: 20, gap: 10 },
});
