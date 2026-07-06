import { useEffect, useRef } from 'react';

import { useAppDispatch } from '@/hooks';
import { loadCustomerUser } from '@/services/customerStorage';
import { loadAuth, loadBookings, saveAuth, saveBookings } from '@/services/appStorage';
import { hydrateAuth, hydrateBookings, hydrateUser, store } from '@/store';

export function AppStoreHydrator() {
  const dispatch = useAppDispatch();
  const hydrated = useRef(false);

  useEffect(() => {
    Promise.all([loadCustomerUser(), loadBookings(), loadAuth()]).then(([user, bookings, auth]) => {
      if (user) dispatch(hydrateUser(user));
      if (bookings?.length) dispatch(hydrateBookings(bookings));
      if (auth?.isAuthenticated) dispatch(hydrateAuth(auth));
      hydrated.current = true;
    });
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      if (!hydrated.current) return;
      const state = store.getState();
      saveBookings(state.bookings.items);
      saveAuth(state.auth);
    });
    return unsubscribe;
  }, []);

  return null;
}
