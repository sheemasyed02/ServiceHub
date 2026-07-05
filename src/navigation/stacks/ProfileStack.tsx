import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { customerStackScreenOptions } from '@/navigation/config';
import {
  ProfileScreen,
  ReviewsScreen,
  SettingsScreen,
  HelpSupportScreen,
} from '@/screens/customer';
import type { ProfileStackParamList } from '@/navigation/types/customer.types';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={customerStackScreenOptions}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      <Stack.Screen
        name="HelpSupport"
        component={HelpSupportScreen}
        options={{ title: 'Help & Support' }}
      />
      <Stack.Screen name="Reviews" component={ReviewsScreen} options={{ title: 'Reviews' }} />
    </Stack.Navigator>
  );
}
