import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ScreenLayout } from '@/components/ScreenLayout';
import type { MainStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<MainStackParamList, 'CustomerDashboard'>;

export function CustomerDashboardScreen(_props: Props) {
  return (
    <ScreenLayout
      title="Customer Dashboard"
      subtitle="Overview of your bookings, favorites, and service activity."
    />
  );
}
