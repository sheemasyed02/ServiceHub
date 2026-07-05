import type { NavigatorScreenParams } from '@react-navigation/native';

import type { AuthStackParamList } from './auth.types';
import type { MainStackParamList } from './main.types';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList> | undefined;
  Main: NavigatorScreenParams<MainStackParamList> | undefined;
};

export type { AuthStackParamList } from './auth.types';
export type {
  BookingsStackParamList,
  HomeStackParamList,
  ProfileStackParamList,
} from './customer.types';
export type { MainStackParamList } from './main.types';
export type { MainTabParamList } from './tabs.types';

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootStackParamList {}
  }
}
