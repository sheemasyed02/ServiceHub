import { create } from 'axios';

import { API_BASE_URL } from '@/constants';

export const apiClient = create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});
