import AsyncStorage from '@react-native-async-storage/async-storage';

import type { AuthState } from '@/store/authSlice';
import type { Booking } from '@/types/customer';

const BOOKINGS_KEY = '@servicehub/bookings';
const AUTH_KEY = '@servicehub/auth';

export async function loadBookings(): Promise<Booking[] | null> {
  try {
    const raw = await AsyncStorage.getItem(BOOKINGS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Booking[];
  } catch {
    return null;
  }
}

export async function saveBookings(bookings: Booking[]): Promise<void> {
  try {
    await AsyncStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  } catch {
    // ignore
  }
}

export async function loadAuth(): Promise<AuthState | null> {
  try {
    const raw = await AsyncStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthState;
  } catch {
    return null;
  }
}

export async function saveAuth(auth: AuthState): Promise<void> {
  try {
    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(auth));
  } catch {
    // ignore
  }
}

export async function clearAuth(): Promise<void> {
  try {
    await AsyncStorage.removeItem(AUTH_KEY);
  } catch {
    // ignore
  }
}
