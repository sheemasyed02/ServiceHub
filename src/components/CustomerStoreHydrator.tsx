import { useEffect } from 'react';

import { useAppDispatch } from '@/hooks';
import { loadCustomerUser } from '@/services/customerStorage';
import { hydrateUser } from '@/store';

export function CustomerStoreHydrator() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    loadCustomerUser().then((user) => {
      if (user) dispatch(hydrateUser(user));
    });
  }, [dispatch]);

  return null;
}
