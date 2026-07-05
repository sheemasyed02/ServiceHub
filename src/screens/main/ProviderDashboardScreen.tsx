import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ScreenLayout } from '@/components/ScreenLayout';
import type { MainStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<MainStackParamList, 'ProviderDashboard'>;

export function ProviderDashboardScreen(_props: Props) {
  return (
    <ScreenLayout
      title="Provider Dashboard"
      subtitle="Manage services, availability, earnings, and customer requests."
    />
  );
}
