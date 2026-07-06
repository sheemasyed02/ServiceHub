import type { Booking } from '@/types/customer';
import type { JobRequest, JobRequestStatus } from '@/types/provider';

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
