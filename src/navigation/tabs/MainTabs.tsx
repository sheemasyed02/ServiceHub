import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FloatingTabBar } from '@/components/navigation/FloatingTabBar';
import { BookingsStack } from '@/navigation/stacks/BookingsStack';
import { ChatStack } from '@/navigation/stacks/ChatStack';
import { HomeStack } from '@/navigation/stacks/HomeStack';
import { NotificationsScreen } from '@/screens/customer';
import type { MainTabParamList } from '@/navigation/types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Bookings" component={BookingsStack} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Chat" component={ChatStack} />
    </Tab.Navigator>
  );
}
