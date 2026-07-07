import type { Booking } from '@/types/customer';
import type { JobRequest, JobRequestStatus } from '@/types/provider';

export function parseBookingDate(dateStr: string): Date | null {
  const ts = Date.parse(dateStr.replace(/,/g, ''));
  return Number.isNaN(ts) ? null : new Date(ts);
}

export function bookingDateKey(booking: Booking): string {
  const date = parseBookingDate(booking.date);
  if (!date) return '';
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function isSameCalendarDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isWithinPastDays(date: Date, days: number, reference = new Date()): boolean {
  const start = new Date(reference);
  start.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  const diffMs = start.getTime() - target.getTime();
  return diffMs >= 0 && diffMs <= days * 24 * 60 * 60 * 1000;
}

export function isSameCalendarMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

export function generateBookingId(): string {
  return `BK-${Date.now().toString(36).toUpperCase()}`;
}

export function generateOtp(): string {
  return String(Math.floor(1000 + Math.random() * 9000));
}

export function bookingToJobRequest(booking: Booking): JobRequest {
  return {
    id: booking.id,
    bookingId: booking.id,
    customerId: booking.customerId,
    customerName: booking.customerName,
    customerAvatar: booking.customerAvatar ?? '',
    customerPhone: booking.customerPhone,
    service: booking.service,
    address: booking.address,
    distance: '—',
    duration: '45 min',
    estimatedEarnings: booking.price,
    status: mapBookingToJobStatus(booking),
    scheduledAt: `${booking.date}, ${booking.time}`,
    otp: booking.otp,
  };
}

export function mapBookingToJobStatus(booking: Booking): JobRequestStatus {
  if (booking.providerStatus === 'rejected') return 'rejected';
  if (booking.providerStatus === 'pending') return 'pending';
  if (booking.status === 'completed') return 'completed';
  if (booking.status === 'ongoing') return 'active';
  if (booking.providerStatus === 'accepted') return 'accepted';
  return 'pending';
}
