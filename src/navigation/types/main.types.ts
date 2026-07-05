import type { NavigatorScreenParams } from '@react-navigation/native';

import type { MainTabParamList } from './tabs.types';

export type MainStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
  CustomerDashboard: undefined;
  ProviderDashboard: undefined;
  AdminDashboard: undefined;
};
