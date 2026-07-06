import { getProviderById } from '@/constants/customer';
import { getProviderImages } from '@/constants/customer/images';
import { useAppSelector } from '@/hooks';
import {
  selectBookingById,
  selectCustomerBookings,
  selectCustomerBookingsByStatus,
  selectProviderActiveBookings,
  selectProviderJobById,
  selectProviderJobRequests,
  selectProviderPendingBookings,
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
    isOnline: true,
  };
}
