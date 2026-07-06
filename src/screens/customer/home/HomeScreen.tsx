import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { LocationPickerSheet } from '@/components/bottom-sheets';
import {
  CategoryScroller,
  CustomerScreen,
  InsetGroup,
  OffersBanner,
  ProviderCard,
  SectionHeader,
} from '@/components/customer';
import { Avatar, SearchBar } from '@/components/ui';
import { MOCK_OFFERS, MOCK_PROVIDERS } from '@/constants/customer';
import { MOCK_IMAGES } from '@/constants/customer/images';
import { useAppTheme, useCustomerUser, useUserLocation } from '@/hooks';
import type { HomeStackParamList } from '@/navigation/types/customer.types';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeMain'>;

export function HomeScreen({ navigation }: Props) {
  const theme = useAppTheme();
  const { colors, gradients } = theme.tokens;
  const user = useCustomerUser();
  const { loading: locationLoading, detectCurrentLocation, selectSavedAddress } = useUserLocation();
  const [locationOpen, setLocationOpen] = useState(false);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const firstName = user.name.split(' ')[0];
  const nearYou = MOCK_PROVIDERS.slice(0, 3);

  useEffect(() => {
    if (!user.locationSource) {
      void detectCurrentLocation();
    }
  }, [detectCurrentLocation, user.locationSource]);

  const handleCurrentLocation = async () => {
    const ok = await detectCurrentLocation();
    if (ok) setLocationOpen(false);
  };

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
            <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
              {greeting}
            </Text>
            <Text variant="headlineSmall" style={{ color: colors.textPrimary, fontWeight: '700' }}>
              Hi, {firstName}
            </Text>
          </View>
          <Pressable onPress={() => navigation.navigate('ProfileFlow')}>
            <Avatar source={{ uri: MOCK_IMAGES.userAvatar }} name={user.name} size="md" />
          </Pressable>
        </View>

        <Pressable style={styles.locationRow} onPress={() => setLocationOpen(true)}>
          <MaterialCommunityIcons name="map-marker" size={18} color={colors.primaryDark} />
          {locationLoading ? (
            <ActivityIndicator size="small" color={colors.primary} style={{ flex: 1 }} />
          ) : (
            <View style={{ flex: 1 }}>
              <Text variant="bodyMedium" style={{ color: colors.textPrimary }} numberOfLines={1}>
                {user.location}
              </Text>
              {user.locationSource === 'gps' ? (
                <Text variant="labelSmall" style={{ color: colors.textTertiary }}>
                  Using current location
                </Text>
              ) : null}
            </View>
          )}
          <MaterialCommunityIcons name="chevron-down" size={20} color={colors.textTertiary} />
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Search')}>
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
    <>
      <CustomerScreen fixedHeader={header}>
        <SectionHeader
          title="Categories"
          actionLabel="See all"
          onAction={() => navigation.navigate('ProviderListing', {})}
          style={styles.firstSection}
        />
        <CategoryScroller
          onSelect={(id, title) =>
            navigation.navigate('ProviderListing', { categoryId: id, categoryTitle: title })
          }
        />

        <SectionHeader title="Top picks" />
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
          actionLabel="View all"
          onAction={() => navigation.navigate('ProviderListing', {})}
        />
        <InsetGroup>
          {nearYou.map((p, index) => (
            <ProviderCard
              key={p.id}
              provider={p}
              showDivider={index < nearYou.length - 1}
              onPress={() => navigation.navigate('ProviderProfile', { providerId: p.id })}
              onBook={() => navigation.navigate('Booking', { providerId: p.id })}
            />
          ))}
        </InsetGroup>

        <SectionHeader title="Offers" />
        <OffersBanner
          title={MOCK_OFFERS[0].title}
          subtitle={MOCK_OFFERS[0].subtitle}
          code={MOCK_OFFERS[0].code}
        />

        <View style={{ height: 32 }} />
      </CustomerScreen>

      <LocationPickerSheet
        visible={locationOpen}
        onClose={() => setLocationOpen(false)}
        loading={locationLoading}
        currentLabel={user.location}
        onUseCurrentLocation={handleCurrentLocation}
        onSelectAddress={selectSavedAddress}
      />
    </>
  );
}

const styles = StyleSheet.create({
  heroGradient: { paddingBottom: 4 },
  header: { paddingHorizontal: 16, gap: 14, paddingBottom: 14, paddingTop: 8 },
  headerTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  firstSection: { marginTop: 14 },
  hScroll: { paddingHorizontal: 16, gap: 12, paddingBottom: 4 },
});
