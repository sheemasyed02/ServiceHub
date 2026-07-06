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
  const { colors, gradients, shadows } = theme.tokens;
  const user = useCustomerUser();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const firstName = user.name.split(' ')[0];

  const header = (
    <LinearGradient
      colors={gradients.hero}
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
            { backgroundColor: colors.surfaceElevated, borderColor: colors.borderLight, ...shadows.sm },
          ]}
        >
          <View style={[styles.locIcon, { backgroundColor: colors.primaryContainer }]}>
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
      <SectionHeader
        title="Categories"
        subtitle="Find the right service for your home"
        actionLabel="See all"
        onAction={() => navigation.navigate('ProviderListing', {})}
        style={styles.firstSection}
      />
      <CategoryScroller
        onSelect={(id, title) =>
          navigation.navigate('ProviderListing', { categoryId: id, categoryTitle: title })
        }
      />

      <SectionHeader title="Top picks" subtitle="Highly rated professionals" />
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

      <SectionHeader title="Offers" subtitle="Exclusive deals for you" />
      <OffersBanner
        title={MOCK_OFFERS[0].title}
        subtitle={MOCK_OFFERS[0].subtitle}
        code={MOCK_OFFERS[0].code}
      />

      <View style={{ height: 32 }} />
    </CustomerScreen>
  );
}

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
    borderWidth: 1,
  },
  locIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: { marginTop: 0 },
  firstSection: { marginTop: 14 },
  hScroll: { paddingHorizontal: 16, gap: 12, paddingBottom: 4 },
  list: { padding: 12, gap: 10 },
});
