export const SERVICE_CATEGORIES = [
  'Home Cleaning',
  'Plumbing',
  'Electrical',
  'AC & Appliance Repair',
  'Carpentry',
  'Painting',
  'Pest Control',
  'Beauty & Wellness',
  'Moving & Packing',
  'Other',
] as const;

export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];
