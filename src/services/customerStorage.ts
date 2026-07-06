import AsyncStorage from '@react-native-async-storage/async-storage';

import type { CustomerUser } from '@/store';

const USER_KEY = '@servicehub/customer/user';

export async function loadCustomerUser(): Promise<CustomerUser | null> {
  try {
    const raw = await AsyncStorage.getItem(USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CustomerUser;
  } catch {
    return null;
  }
}

export async function saveCustomerUser(user: CustomerUser): Promise<void> {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch {
    // ignore write failures in demo app
  }
}
