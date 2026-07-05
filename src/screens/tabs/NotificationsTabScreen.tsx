import { ScreenLayout } from '@/components/ScreenLayout';

export function NotificationsTabScreen() {
  return (
    <ScreenLayout
      title="Notifications"
      subtitle="Stay updated on bookings, offers, and account alerts."
      edges={['left', 'right']}
    />
  );
}
