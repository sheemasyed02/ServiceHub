import { getProviderById } from '@/constants/customer';
import { getProviderImages } from '@/constants/customer/images';
import { useAppSelector } from '@/hooks';
import {
  selectBookingById,
  selectCustomerBookings,
  selectCustomerBookingsByStatus,
  selectProviderActiveBookings,
  selectProviderChatUnread,
  selectProviderBookings,
  selectProviderCompletedBookings,
  selectProviderEarnings,
  selectProviderJobById,
  selectProviderJobRequests,
  selectProviderPendingBookings,
  selectProviderThreads,
} from '@/store/selectors';
import type { ProviderUser } from '@/types/provider';

export function useAuth() {
  return useAppSelector((state) => state.auth);
}

export function useBooking(bookingId: string) {
  return useAppSelector((state) => selectBookingById(state, bookingId));
}

export function useCustomerBookings() {
  const customerId = useAppSelector((state) => state.auth.customerId);
  return useAppSelector((state) => selectCustomerBookings(state, customerId));
}

export function useCustomerBookingsByStatus(status: Parameters<typeof selectCustomerBookingsByStatus>[2]) {
  const customerId = useAppSelector((state) => state.auth.customerId);
  return useAppSelector((state) => selectCustomerBookingsByStatus(state, customerId, status));
}

export function useProviderPendingRequests() {
  const providerId = useAppSelector((state) => state.auth.providerId);
  if (!providerId) return [];
  return useAppSelector((state) => selectProviderJobRequests(state, providerId));
}

export function useProviderPendingBookings() {
  const providerId = useAppSelector((state) => state.auth.providerId);
  if (!providerId) return [];
  return useAppSelector((state) => selectProviderPendingBookings(state, providerId));
}

export function useProviderActiveBookings() {
  const providerId = useAppSelector((state) => state.auth.providerId);
  if (!providerId) return [];
  return useAppSelector((state) => selectProviderActiveBookings(state, providerId));
}

export function useProviderJob(jobId: string) {
  return useAppSelector((state) => selectProviderJobById(state, jobId));
}

export function useCurrentProviderProfile(): ProviderUser | null {
  const providerId = useAppSelector((state) => state.auth.providerId);
  const isOnline = useAppSelector((state) => state.provider.isOnline);
  const catalog = providerId ? getProviderById(providerId) : undefined;
  if (!catalog || !providerId) return null;

  const images = getProviderImages(providerId);

  return {
    id: providerId,
    name: catalog.name,
    phone: '+91 98765 43210',
    email: `${catalog.name.split(' ')[0].toLowerCase()}@servicehub.com`,
    address: 'Bengaluru',
    avatar: images?.avatar ?? 'https://i.pravatar.cc/150',
    profession: catalog.profession,
    experience: catalog.experience,
    rating: catalog.rating,
    reviewCount: catalog.reviewCount,
    completedJobs: catalog.completedJobs,
    languages: ['English', 'Hindi'],
    skills: catalog.skills,
    certificates: catalog.certificates,
    workingHours: catalog.workingHours,
    serviceAreas: ['Koramangala', 'HSR Layout', 'Indiranagar'],
    verified: catalog.verified,
    isOnline,
  };
}

export function useProviderBookings() {
  const providerId = useAppSelector((state) => state.auth.providerId);
  if (!providerId) return [];
  return useAppSelector((state) => selectProviderBookings(state, providerId));
}

export function useProviderCompletedBookings() {
  const providerId = useAppSelector((state) => state.auth.providerId);
  if (!providerId) return [];
  return useAppSelector((state) => selectProviderCompletedBookings(state, providerId));
}

export function useProviderEarnings() {
  const providerId = useAppSelector((state) => state.auth.providerId);
  return useAppSelector((state) =>
    providerId
      ? selectProviderEarnings(state, providerId)
      : { today: 0, weekly: 0, monthly: 0, total: 0, completedCount: 0, activeCount: 0 },
  );
}

export function useProviderChatThreads() {
  const providerId = useAppSelector((state) => state.auth.providerId);
  return useAppSelector((state) =>
    providerId ? selectProviderThreads(state, providerId) : [],
  );
}

export function useProviderChatUnread() {
  const providerId = useAppSelector((state) => state.auth.providerId);
  return useAppSelector((state) =>
    providerId ? selectProviderChatUnread(state, providerId) : 0,
  );
}
