import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { dashboardScreenOptions, mainStackScreenOptions } from '@/navigation/config';
import {
  AdminDashboardScreen,
  CustomerDashboardScreen,
  ProviderDashboardScreen,
} from '@/screens/main';
import type { MainStackParamList } from '@/navigation/types';

import { MainTabs } from '../tabs/MainTabs';

const Stack = createNativeStackNavigator<MainStackParamList>();

export function MainStack() {
  return (
    <Stack.Navigator initialRouteName="MainTabs" screenOptions={mainStackScreenOptions}>
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen
        name="CustomerDashboard"
        component={CustomerDashboardScreen}
        options={{ ...dashboardScreenOptions, title: 'Customer Dashboard' }}
      />
      <Stack.Screen
        name="ProviderDashboard"
        component={ProviderDashboardScreen}
        options={{ ...dashboardScreenOptions, title: 'Provider Dashboard' }}
      />
      <Stack.Screen
        name="AdminDashboard"
        component={AdminDashboardScreen}
        options={{ ...dashboardScreenOptions, title: 'Admin Dashboard' }}
      />
    </Stack.Navigator>
  );
}
