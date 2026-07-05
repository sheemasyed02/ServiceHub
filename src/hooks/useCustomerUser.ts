import { useAppSelector } from '@/hooks';

export function useCustomerUser() {
  return useAppSelector((state) => state.customer.user);
}
