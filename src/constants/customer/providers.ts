import type { Provider } from '@/types/customer';

import { MOCK_PROVIDERS } from './mockData';

/** Maps quick-action labels to category ids. */
export const QUICK_ACTION_CATEGORY_MAP: Record<string, string> = {
  Plumber: 'plumber',
  Electrician: 'electrician',
  Cleaning: 'cleaner',
  'AC Repair': 'ac-repair',
};

export function getProvidersByCategory(categoryId?: string): Provider[] {
  if (!categoryId) return MOCK_PROVIDERS;
  return MOCK_PROVIDERS.filter((p) => p.categoryId === categoryId);
}

export function getCategoryTitle(categoryId: string): string | undefined {
  const provider = MOCK_PROVIDERS.find((p) => p.categoryId === categoryId);
  if (provider) {
    const titles: Record<string, string> = {
      plumber: 'Plumber',
      electrician: 'Electrician',
      carpenter: 'Carpenter',
      painter: 'Painter',
      cleaner: 'Cleaner',
      'ac-repair': 'AC Repair',
      appliance: 'Appliance Repair',
      gardening: 'Gardening',
      pest: 'Pest Control',
      salon: 'Salon',
    };
    return titles[categoryId] ?? provider.profession;
  }
  return undefined;
}
