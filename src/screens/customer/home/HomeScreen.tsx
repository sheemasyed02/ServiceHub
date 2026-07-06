import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import {
  CategoryScroller,
  CustomerScreen,
  OffersBanner,
  ProviderCard,
  SectionHeader,
  SectionPanel,
} from '@/components/customer';
import { Avatar, SearchBar } from '@/components/ui';
import { MOCK_OFFERS, MOCK_PROVIDERS } from '@/constants/customer';
import { MOCK_IMAGES } from '@/constants/customer/images';
import { useAppTheme, useCustomerUser } from '@/hooks';
import type { HomeStackParamList } from '@/navigation/types/customer.types';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeMain'>;

export function HomeScreen({ navigation }: Props) {
  const theme = useAppTheme();
  const { colors, shadows } = theme.tokens;
  const user = useCustomerUser();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const firstName = user.name.split(' ')[0];

  const header = (
    <LinearGradient
      colors={['#FFF4D6', '#E8EBF2']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.heroGradient}
    >
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={{ flex: 1 }}>
            <Text variant="bodySmall" style={{ color: colors.textSecondary, fontWeight: '600' }}>
              {greeting}
            </Text>
            <Text variant="headlineSmall" style={{ color: colors.textPrimary, fontWeight: '800' }}>
              Hi, {firstName}
            </Text>
          </View>
          <Pressable onPress={() => navigation.getParent()?.navigate('Profile')}>
            <Avatar source={{ uri: MOCK_IMAGES.userAvatar }} name={user.name} size="md" />
          </Pressable>
        </View>

        <Pressable
          style={[
            styles.locationChip,
            { backgroundColor: colors.surface, ...shadows.sm },
          ]}
        >
          <View style={[styles.locIcon, { backgroundColor: `${colors.primary}18` }]}>
            <MaterialCommunityIcons name="map-marker" size={16} color={colors.primaryDark} />
          </View>
          <Text
            variant="labelLarge"
            style={{ color: colors.textPrimary, flex: 1, fontWeight: '600' }}
            numberOfLines={1}
          >
            {user.location}
          </Text>
          <MaterialCommunityIcons name="chevron-down" size={18} color={colors.textTertiary} />
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Search')} style={styles.search}>
          <SearchBar
            placeholder="What do you need help with?"
            editable={false}
            pointerEvents="none"
            dense
          />
        </Pressable>
      </View>
    </LinearGradient>
  );

  return (
    <CustomerScreen fixedHeader={header}>
      <SectionPanel style={styles.quickPanel} noPadding>
        <View style={styles.quickGrid}>
          {QUICK_ACTIONS.map((action) => (
            <Pressable
              key={action.label}
              onPress={() =>
                navigation.navigate('ProviderListing', {
                  categoryId: action.categoryId,
                  categoryTitle: action.label,
                })
              }
              style={[styles.quickTile, { backgroundColor: action.tint }]}
            >
              <View style={[styles.quickIcon, { backgroundColor: colors.surface, ...shadows.xs }]}>
                <MaterialCommunityIcons name={action.icon} size={20} color={colors.primaryDark} />
              </View>
              <Text variant="labelMedium" style={{ color: colors.textPrimary, fontWeight: '700' }}>
                {action.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </SectionPanel>

      <SectionHeader
        title="Categories"
        subtitle="Browse by service type"
        actionLabel="See all"
        onAction={() => navigation.navigate('ProviderListing', {})}
      />
      <CategoryScroller
        onSelect={(id, title) =>
          navigation.navigate('ProviderListing', { categoryId: id, categoryTitle: title })
        }
      />

      <SectionHeader title="Top picks" subtitle="Highly rated near you" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.hScroll}
      >
        {MOCK_PROVIDERS.slice(0, 5).map((p) => (
          <ProviderCard
            key={p.id}
            provider={p}
            layout="compact"
            onPress={() => navigation.navigate('ProviderProfile', { providerId: p.id })}
            onBook={() => navigation.navigate('Booking', { providerId: p.id })}
          />
        ))}
      </ScrollView>

      <SectionHeader
        title="Near you"
        subtitle="Available providers nearby"
        actionLabel="View all"
        onAction={() => navigation.navigate('ProviderListing', {})}
      />
      <SectionPanel noPadding>
        <View style={styles.list}>
          {MOCK_PROVIDERS.slice(0, 3).map((p) => (
            <ProviderCard
              key={p.id}
              provider={p}
              onPress={() => navigation.navigate('ProviderProfile', { providerId: p.id })}
              onBook={() => navigation.navigate('Booking', { providerId: p.id })}
            />
          ))}
        </View>
      </SectionPanel>

      <SectionHeader title="Offers" subtitle="Save on your next booking" />
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
  { label: 'Plumber', icon: 'pipe-wrench' as const, categoryId: 'plumber', tint: '#DBEAFE' },
  { label: 'Electrician', icon: 'flash' as const, categoryId: 'electrician', tint: '#FEF08A' },
  { label: 'Cleaning', icon: 'broom' as const, categoryId: 'cleaner', tint: '#BBF7D0' },
  { label: 'Salon', icon: 'content-cut' as const, categoryId: 'salon', tint: '#FBCFE8' },
];

const styles = StyleSheet.create({
  heroGradient: { paddingBottom: 4 },
  header: { paddingHorizontal: 16, gap: 12, paddingBottom: 14, paddingTop: 8 },
  headerTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  locationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 16,
  },
  locIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: { marginTop: 0 },
  quickPanel: {
    marginTop: 16,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    gap: 10,
  },
  quickTile: {
    width: '47%',
    borderRadius: 16,
    padding: 14,
    gap: 10,
  },
  quickIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hScroll: { paddingHorizontal: 16, gap: 12, paddingBottom: 4 },
  list: { padding: 12, gap: 10 },
});
