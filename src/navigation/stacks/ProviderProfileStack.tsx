import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { customerStackScreenOptions } from '@/navigation/config';
import type { ProviderProfileStackParamList } from '@/navigation/types/provider.types';
import {
  AddServiceScreen,
  EditProviderProfileScreen,
  ProviderDocumentsScreen,
  ProviderHelpSupportScreen,
  ProviderProfileScreen,
  ProviderReviewsScreen,
  ProviderSettingsScreen,
  ServiceManagementScreen,
} from '@/screens/provider';

const Stack = createNativeStackNavigator<ProviderProfileStackParamList>();

export function ProviderProfileStack() {
  return (
    <Stack.Navigator screenOptions={customerStackScreenOptions}>
      <Stack.Screen
        name="ProfileMain"
        component={ProviderProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProviderProfileScreen}
        options={{ title: 'Edit Profile' }}
      />
      <Stack.Screen
        name="Documents"
        component={ProviderDocumentsScreen}
        options={{ title: 'Documents' }}
      />
      <Stack.Screen
        name="Reviews"
        component={ProviderReviewsScreen}
        options={{ title: 'Reviews' }}
      />
      <Stack.Screen
        name="ServiceManagement"
        component={ServiceManagementScreen}
        options={{ title: 'My Services' }}
      />
      <Stack.Screen
        name="AddService"
        component={AddServiceScreen}
        options={{ title: 'Add Service' }}
      />
      <Stack.Screen
        name="Settings"
        component={ProviderSettingsScreen}
        options={{ title: 'Settings' }}
      />
      <Stack.Screen
        name="HelpSupport"
        component={ProviderHelpSupportScreen}
        options={{ title: 'Help & Support' }}
      />
    </Stack.Navigator>
  );
}
