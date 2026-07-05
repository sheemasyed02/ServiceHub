import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ProviderFloatingTabBar } from '@/components/navigation/ProviderFloatingTabBar';
import { ProviderCalendarStack } from '@/navigation/stacks/ProviderCalendarStack';
import { ProviderDashboardStack } from '@/navigation/stacks/ProviderDashboardStack';
import { ProviderJobsStack } from '@/navigation/stacks/ProviderJobsStack';
import { ProviderProfileStack } from '@/navigation/stacks/ProviderProfileStack';
import type { ProviderTabParamList } from '@/navigation/types/provider.types';

const Tab = createBottomTabNavigator<ProviderTabParamList>();

export function ProviderTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <ProviderFloatingTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Dashboard" component={ProviderDashboardStack} />
      <Tab.Screen name="Jobs" component={ProviderJobsStack} />
      <Tab.Screen name="Calendar" component={ProviderCalendarStack} />
      <Tab.Screen name="Profile" component={ProviderProfileStack} />
    </Tab.Navigator>
  );
}
