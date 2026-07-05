import type { NavigatorScreenParams } from '@react-navigation/native';

import type { MainTabParamList } from './tabs.types';
import type { ProviderTabParamList } from './provider.types';

export type MainStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
  ProviderTabs: NavigatorScreenParams<ProviderTabParamList> | undefined;
  CustomerDashboard: undefined;
  AdminDashboard: undefined;
};
