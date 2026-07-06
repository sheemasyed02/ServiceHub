import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { customerStackScreenOptions } from '@/navigation/config';
import { ProviderProfileStack } from '@/navigation/stacks/ProviderProfileStack';
import type { ProviderDashboardStackParamList } from '@/navigation/types/provider.types';
import {
  ProviderDashboardScreen,
  ProviderDocumentsScreen,
  ProviderEarningsScreen,
  ProviderHelpSupportScreen,
  ProviderNotificationsScreen,
  ProviderSettingsScreen,
  ProviderTransactionsScreen,
} from '@/screens/provider';

const Stack = createNativeStackNavigator<ProviderDashboardStackParamList>();

export function ProviderDashboardStack() {
  return (
    <Stack.Navigator screenOptions={customerStackScreenOptions}>
      <Stack.Screen
        name="DashboardMain"
        component={ProviderDashboardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Earnings"
        component={ProviderEarningsScreen}
        options={{ title: 'Earnings' }}
      />
      <Stack.Screen
        name="Transactions"
        component={ProviderTransactionsScreen}
        options={{ title: 'Transactions' }}
      />
      <Stack.Screen
        name="Notifications"
        component={ProviderNotificationsScreen}
        options={{ title: 'Notifications' }}
      />
      <Stack.Screen
        name="HelpSupport"
        component={ProviderHelpSupportScreen}
        options={{ title: 'Help & Support' }}
      />
      <Stack.Screen
        name="Settings"
        component={ProviderSettingsScreen}
        options={{ title: 'Settings' }}
      />
      <Stack.Screen
        name="Documents"
        component={ProviderDocumentsScreen}
        options={{ title: 'Documents' }}
      />
      <Stack.Screen
        name="ProfileFlow"
        component={ProviderProfileStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
