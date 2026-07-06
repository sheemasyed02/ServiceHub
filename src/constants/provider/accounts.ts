/** Maps provider login email → catalog provider id (p1–p8). */
export const PROVIDER_ACCOUNT_MAP: Record<string, string> = {
  'rajesh@servicehub.com': 'p1',
  'suresh@servicehub.com': 'p2',
  'meera@servicehub.com': 'p3',
  'vikram@servicehub.com': 'p4',
  'anjali@servicehub.com': 'p5',
  'priya@servicehub.com': 'p6',
  'ramesh@servicehub.com': 'p7',
  'deepak@servicehub.com': 'p8',
  'salon@servicehub.com': 'p5',
};

export const DEFAULT_CUSTOMER_ID = 'cust-1';

export function resolveProviderIdFromEmail(email: string): string {
  const normalized = email.trim().toLowerCase();
  return PROVIDER_ACCOUNT_MAP[normalized] ?? 'p1';
}
