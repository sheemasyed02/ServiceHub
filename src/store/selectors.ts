import type { RootState } from '@/store';
import type { Booking } from '@/types/customer';
import { bookingToJobRequest } from '@/utils/bookingHelpers';

export function selectAllBookings(state: RootState): Booking[] {
  return state.bookings.items;
}

export function selectBookingById(state: RootState, id: string): Booking | undefined {
  return state.bookings.items.find((b) => b.id === id);
}

export function selectCustomerBookings(state: RootState, customerId: string): Booking[] {
  return state.bookings.items.filter((b) => b.customerId === customerId);
}

export function selectCustomerBookingsByStatus(
  state: RootState,
  customerId: string,
  status: Booking['status'],
): Booking[] {
  return state.bookings.items.filter((b) => b.customerId === customerId && b.status === status);
}

export function selectProviderPendingBookings(state: RootState, providerId: string): Booking[] {
  return state.bookings.items.filter(
    (b) => b.providerId === providerId && b.providerStatus === 'pending',
  );
}

export function selectProviderActiveBookings(state: RootState, providerId: string): Booking[] {
  return state.bookings.items.filter(
    (b) =>
      b.providerId === providerId &&
      b.providerStatus === 'accepted' &&
      (b.status === 'upcoming' || b.status === 'ongoing'),
  );
}

export function selectProviderJobRequests(state: RootState, providerId: string) {
  return selectProviderPendingBookings(state, providerId).map(bookingToJobRequest);
}

export function selectProviderJobById(state: RootState, jobId: string) {
  const booking = selectBookingById(state, jobId);
  return booking ? bookingToJobRequest(booking) : undefined;
}

export function selectProviderBookings(state: RootState, providerId: string): Booking[] {
  return state.bookings.items.filter((b) => b.providerId === providerId);
}

export function selectProviderCompletedBookings(state: RootState, providerId: string): Booking[] {
  return state.bookings.items.filter(
    (b) => b.providerId === providerId && b.status === 'completed',
  );
}

export function selectProviderEarnings(state: RootState, providerId: string) {
  const bookings = selectProviderBookings(state, providerId);
  const completed = bookings.filter((b) => b.status === 'completed');
  const active = bookings.filter(
    (b) =>
      b.providerStatus === 'accepted' && (b.status === 'upcoming' || b.status === 'ongoing'),
  );

  const total = completed.reduce((sum, b) => sum + b.price, 0);
  const today = completed.reduce((sum, b) => sum + b.price, 0);
  const weekly = total;
  const monthly = total;

  return {
    today,
    weekly,
    monthly,
    total,
    completedCount: completed.length,
    activeCount: active.length,
  };
}

export function selectProviderThreads(state: RootState, providerId: string) {
  return state.chats.threads.filter((t) => t.providerId === providerId);
}

export function selectProviderChatUnread(state: RootState, providerId: string) {
  return selectProviderThreads(state, providerId).reduce((sum, t) => sum + t.unreadCount, 0);
}
