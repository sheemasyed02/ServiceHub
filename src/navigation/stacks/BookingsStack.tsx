import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { customerStackScreenOptions } from '@/navigation/config';
import { BookingDetailsScreen, LiveTrackingScreen, MyBookingsScreen } from '@/screens/customer';
import type { BookingsStackParamList } from '@/navigation/types/customer.types';

const Stack = createNativeStackNavigator<BookingsStackParamList>();

export function BookingsStack() {
  return (
    <Stack.Navigator screenOptions={customerStackScreenOptions}>
      <Stack.Screen
        name="MyBookings"
        component={MyBookingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BookingDetails"
        component={BookingDetailsScreen}
        options={{ title: 'Booking Details' }}
      />
      <Stack.Screen
        name="LiveTracking"
        component={LiveTrackingScreen}
        options={{ title: 'Live Tracking' }}
      />
    </Stack.Navigator>
  );
}
