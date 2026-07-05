import { ScreenLayout } from '@/components/ScreenLayout';

export function BookingsTabScreen() {
  return (
    <ScreenLayout
      title="Bookings"
      subtitle="View upcoming, active, and past service bookings."
      edges={['left', 'right']}
    />
  );
}
