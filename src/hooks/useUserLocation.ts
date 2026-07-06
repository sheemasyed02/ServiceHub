import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

import type { AddressOption } from '@/components/bottom-sheets';
import { saveCustomerUser } from '@/services/customerStorage';
import { getCurrentPlace } from '@/services/locationService';
import { updateUser } from '@/store';
import type { CustomerUser } from '@/store';

import { useAppDispatch } from './useAppDispatch';
import { useCustomerUser } from './useCustomerUser';

function shortSavedLabel(address: AddressOption): string {
  const firstPart = address.address.split(',')[0]?.trim();
  if (address.label === 'Home' || address.label === 'Work') {
    return firstPart ? `${address.label} · ${firstPart}` : address.label;
  }
  return address.address.split(',').slice(0, 2).join(',').trim();
}

export function useUserLocation() {
  const user = useCustomerUser();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const persistLocation = useCallback(
    async (patch: Partial<CustomerUser>) => {
      const next = { ...user, ...patch };
      dispatch(updateUser(patch));
      await saveCustomerUser(next);
    },
    [dispatch, user],
  );

  const detectCurrentLocation = useCallback(async (): Promise<boolean> => {
    setLoading(true);
    try {
      const place = await getCurrentPlace();
      if (!place) {
        Alert.alert(
          'Location access',
          'Enable location permission to detect your area automatically.',
        );
        return false;
      }

      await persistLocation({
        location: place.label,
        locationFull: place.full,
        locationSource: 'gps',
        coords: place.coords,
      });
      return true;
    } catch {
      Alert.alert('Location error', 'Could not detect your location. Try again or pick a saved address.');
      return false;
    } finally {
      setLoading(false);
    }
  }, [persistLocation]);

  const selectSavedAddress = useCallback(
    async (address: AddressOption) => {
      await persistLocation({
        location: shortSavedLabel(address),
        locationFull: address.address,
        locationSource: 'saved',
        coords: undefined,
      });
    },
    [persistLocation],
  );

  return {
    user,
    loading,
    detectCurrentLocation,
    selectSavedAddress,
  };
}
