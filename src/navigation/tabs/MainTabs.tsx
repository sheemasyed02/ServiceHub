import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { ComponentProps } from 'react';

import { useAppTheme } from '@/hooks';
import {
  BookingsTabScreen,
  HomeTabScreen,
  NotificationsTabScreen,
  ProfileTabScreen,
} from '@/screens/tabs';
import type { MainTabParamList } from '@/navigation/types';

const Tab = createBottomTabNavigator<MainTabParamList>();

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

const tabIcons: Record<keyof MainTabParamList, IconName> = {
  Home: 'home-outline',
  Bookings: 'calendar-check-outline',
  Notifications: 'bell-outline',
  Profile: 'account-outline',
};

const tabIconsFocused: Record<keyof MainTabParamList, IconName> = {
  Home: 'home',
  Bookings: 'calendar-check',
  Notifications: 'bell',
  Profile: 'account',
};

export function MainTabs() {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.primaryDark,
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primaryDark,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarIcon: ({ focused, color, size }) => (
          <MaterialCommunityIcons
            name={focused ? tabIconsFocused[route.name] : tabIcons[route.name]}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeTabScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="Bookings" component={BookingsTabScreen} options={{ title: 'Bookings' }} />
      <Tab.Screen
        name="Notifications"
        component={NotificationsTabScreen}
        options={{ title: 'Notifications' }}
      />
      <Tab.Screen name="Profile" component={ProfileTabScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}
