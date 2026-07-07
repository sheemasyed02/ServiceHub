import type { RootState } from '@/store';
import type { Booking } from '@/types/customer';
import {
  bookingToJobRequest,
  isSameCalendarDay,
  isSameCalendarMonth,
  isWithinPastDays,
  parseBookingDate,
} from '@/utils/bookingHelpers';

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

  const now = new Date();
  const sumPrices = (items: Booking[]) => items.reduce((sum, b) => sum + b.price, 0);

  const completedOn = (predicate: (date: Date) => boolean) =>
    completed.filter((b) => {
      const date = parseBookingDate(b.date);
      return date ? predicate(date) : false;
    });

  const total = sumPrices(completed);
  const today = sumPrices(completedOn((date) => isSameCalendarDay(date, now)));
  const weekly = sumPrices(completedOn((date) => isWithinPastDays(date, 7, now)));
  const monthly = sumPrices(completedOn((date) => isSameCalendarMonth(date, now)));

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
