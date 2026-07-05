import type { CustomerCategory } from '@/types/customer';

export const CUSTOMER_CATEGORIES: CustomerCategory[] = [
  { id: 'plumber', title: 'Plumber', icon: 'pipe-wrench' },
  { id: 'electrician', title: 'Electrician', icon: 'flash' },
  { id: 'carpenter', title: 'Carpenter', icon: 'hammer' },
  { id: 'painter', title: 'Painter', icon: 'format-paint' },
  { id: 'cleaner', title: 'Cleaner', icon: 'broom' },
  { id: 'ac-repair', title: 'AC Repair', icon: 'air-conditioner' },
  { id: 'appliance', title: 'Appliance Repair', icon: 'washing-machine' },
  { id: 'gardening', title: 'Gardening', icon: 'flower' },
  { id: 'pest', title: 'Pest Control', icon: 'bug' },
  { id: 'salon', title: 'Salon', icon: 'content-cut' },
];
