import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { ProviderFloatingTabBar } from '@/components/navigation/ProviderFloatingTabBar';
import { ProviderCalendarStack } from '@/navigation/stacks/ProviderCalendarStack';
import { ProviderChatStack } from '@/navigation/stacks/ProviderChatStack';
import { ProviderDashboardStack } from '@/navigation/stacks/ProviderDashboardStack';
import { ProviderJobsStack } from '@/navigation/stacks/ProviderJobsStack';
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
      <Tab.Screen
        name="Chat"
        component={ProviderChatStack}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'ChatList';
          return {
            tabBarStyle: routeName === 'ChatConversation' ? { display: 'none' } : undefined,
          };
        }}
      />
    </Tab.Navigator>
  );
}
