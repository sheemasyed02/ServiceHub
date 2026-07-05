import { ScreenLayout } from '@/components/ScreenLayout';
import { APP_NAME } from '@/constants';

export function HomeTabScreen() {
  return (
    <ScreenLayout
      title={APP_NAME}
      subtitle="Discover services, offers, and quick actions."
      edges={['left', 'right']}
    />
  );
}
