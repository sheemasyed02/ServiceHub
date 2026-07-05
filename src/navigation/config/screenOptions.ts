import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { colors } from '@/theme/colors';

export const defaultStackScreenOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.surface,
  },
  headerTintColor: colors.primaryDark,
  headerTitleStyle: {
    fontWeight: '600',
  },
  headerShadowVisible: false,
  contentStyle: {
    backgroundColor: colors.background,
  },
};

export const authStackScreenOptions: NativeStackNavigationOptions = {
  ...defaultStackScreenOptions,
  headerShown: false,
};

export const mainStackScreenOptions: NativeStackNavigationOptions = {
  ...defaultStackScreenOptions,
};

export const dashboardScreenOptions: NativeStackNavigationOptions = {
  ...defaultStackScreenOptions,
  presentation: 'card',
};

export const customerStackScreenOptions: NativeStackNavigationOptions = {
  ...defaultStackScreenOptions,
  animation: 'slide_from_right',
};
