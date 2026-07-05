import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ScreenLayout } from '@/components/ScreenLayout';
import type { MainStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<MainStackParamList, 'AdminDashboard'>;

export function AdminDashboardScreen(_props: Props) {
  return (
    <ScreenLayout
      title="Admin Dashboard"
      subtitle="Platform overview, user management, and operational insights."
    />
  );
}
