import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { customerStackScreenOptions } from '@/navigation/config';
import {
  BookingConfirmationScreen,
  BookingScreen,
  HomeScreen,
  ProviderListingScreen,
  ProviderProfileScreen,
  SearchScreen,
} from '@/screens/customer';
import { ProfileStack } from '@/navigation/stacks/ProfileStack';
import type { HomeStackParamList } from '@/navigation/types/customer.types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStack() {
  return (
    <Stack.Navigator screenOptions={customerStackScreenOptions}>
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Search" component={SearchScreen} options={{ title: 'Search' }} />
      <Stack.Screen
        name="ProviderListing"
        component={ProviderListingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProviderProfile"
        component={ProviderProfileScreen}
        options={{ title: 'Provider' }}
      />
      <Stack.Screen name="Booking" component={BookingScreen} options={{ title: 'Book Service' }} />
      <Stack.Screen
        name="BookingConfirmation"
        component={BookingConfirmationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileFlow"
        component={ProfileStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
