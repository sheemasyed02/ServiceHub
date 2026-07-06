export const ROUTES = {
  DASHBOARD: '/',
  USERS: '/users',
  PROVIDERS: '/providers',
  PROVIDER_VERIFICATION: '/providers/verification',
  PROVIDER_DETAILS: '/providers/:id',
  BOOKINGS: '/bookings',
  BOOKING_DETAILS: '/bookings/:id',
  PAYMENTS: '/payments',
  REVIEWS: '/reviews',
  CATEGORIES: '/categories',
  REPORTS: '/reports',
  NOTIFICATIONS: '/notifications',
  DISPUTES: '/disputes',
  SUPPORT: '/support',
  SETTINGS: '/settings',
  PROFILE: '/profile',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
