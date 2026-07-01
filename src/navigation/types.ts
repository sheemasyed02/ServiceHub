import type { RootStackParamList } from '@/types';

export type { RootStackParamList };

declare global {
  namespace ReactNavigation {
    // Required for React Navigation typed hooks; extends param list at compile time.
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootStackParamList {}
  }
}
