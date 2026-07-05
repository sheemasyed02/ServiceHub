import type { AppNotification, Booking, Provider, SearchSuggestion } from '@/types/customer';

export const MOCK_USER = {
  name: 'Alex Johnson',
  phone: '+91 98765 43210',
  email: 'alex@example.com',
  location: 'Koramangala, Bengaluru',
};

export const MOCK_PROVIDERS: Provider[] = [
  {
    id: 'p1',
    name: 'Rajesh Kumar',
    profession: 'Plumber',
    experience: '8 years',
    rating: 4.9,
    reviewCount: 214,
    completedJobs: 520,
    distance: '1.2 km',
    priceFrom: 299,
    verified: true,
    about:
      'Licensed plumber specializing in residential repairs, pipe fitting, and bathroom installations.',
    skills: ['Pipe Repair', 'Water Heater', 'Leak Fix', 'Bathroom Fitting'],
    certificates: ['Licensed Plumber', 'Safety Certified'],
    portfolio: ['portfolio-1', 'portfolio-2', 'portfolio-3'],
    services: [
      { id: 's1', name: 'Tap Repair', price: 299 },
      { id: 's2', name: 'Pipe Leak Fix', price: 499 },
      { id: 's3', name: 'Bathroom Installation', price: 2499 },
    ],
    workingHours: 'Mon–Sat, 8 AM – 8 PM',
    reviews: [
      {
        id: 'r1',
        author: 'Priya S.',
        rating: 5,
        text: 'Fixed the leak quickly and professionally.',
        date: '2 days ago',
      },
      {
        id: 'r2',
        author: 'Amit K.',
        rating: 5,
        text: 'On time and very tidy work.',
        date: '1 week ago',
      },
    ],
  },
  {
    id: 'p2',
    name: 'Suresh Patel',
    profession: 'Electrician',
    experience: '6 years',
    rating: 4.8,
    reviewCount: 178,
    completedJobs: 410,
    distance: '2.4 km',
    priceFrom: 349,
    verified: true,
    about: 'Expert in home wiring, switchboard repair, and appliance electrical work.',
    skills: ['Wiring', 'Switchboard', 'Fan Install', 'MCB Repair'],
    certificates: ['Electrical License'],
    portfolio: ['portfolio-1', 'portfolio-2'],
    services: [
      { id: 's4', name: 'Switch Repair', price: 349 },
      { id: 's5', name: 'Wiring Check', price: 599 },
    ],
    workingHours: 'Mon–Sun, 9 AM – 9 PM',
    reviews: [
      {
        id: 'r3',
        author: 'Neha R.',
        rating: 5,
        text: 'Great service, very knowledgeable.',
        date: '3 days ago',
      },
    ],
  },
  {
    id: 'p3',
    name: 'Meera Sharma',
    profession: 'Home Cleaner',
    experience: '5 years',
    rating: 4.7,
    reviewCount: 132,
    completedJobs: 680,
    distance: '0.8 km',
    priceFrom: 499,
    verified: true,
    about: 'Deep cleaning specialist for apartments and villas with eco-friendly products.',
    skills: ['Deep Clean', 'Kitchen', 'Sofa Clean', 'Move-in Clean'],
    certificates: ['Hygiene Certified'],
    portfolio: ['portfolio-1'],
    services: [
      { id: 's6', name: '1 BHK Deep Clean', price: 1499 },
      { id: 's7', name: '2 BHK Deep Clean', price: 2199 },
    ],
    workingHours: 'Mon–Sat, 7 AM – 7 PM',
    reviews: [],
  },
  {
    id: 'p4',
    name: 'Vikram Singh',
    profession: 'AC Technician',
    experience: '10 years',
    rating: 4.9,
    reviewCount: 256,
    completedJobs: 890,
    distance: '3.1 km',
    priceFrom: 399,
    verified: true,
    about: 'AC installation, servicing, and gas refill for all major brands.',
    skills: ['AC Service', 'Gas Refill', 'Installation', 'Repair'],
    certificates: ['HVAC Certified', 'Brand Authorized'],
    portfolio: ['portfolio-1', 'portfolio-2', 'portfolio-3', 'portfolio-4'],
    services: [
      { id: 's8', name: 'AC Service', price: 599 },
      { id: 's9', name: 'Gas Refill', price: 2499 },
    ],
    workingHours: 'Mon–Sun, 8 AM – 10 PM',
    reviews: [
      {
        id: 'r4',
        author: 'Rahul M.',
        rating: 5,
        text: 'AC works like new after service.',
        date: '5 days ago',
      },
    ],
  },
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'BK-1024',
    providerId: 'p1',
    providerName: 'Rajesh Kumar',
    service: 'Pipe Leak Fix',
    date: 'Jul 8, 2026',
    time: '10:30 AM',
    status: 'upcoming',
    price: 499,
    address: '42, 5th Block, Koramangala',
    otp: '4829',
    estimatedArrival: '15 min',
  },
  {
    id: 'BK-1023',
    providerId: 'p4',
    providerName: 'Vikram Singh',
    service: 'AC Service',
    date: 'Jul 5, 2026',
    time: '2:00 PM',
    status: 'ongoing',
    price: 599,
    address: '42, 5th Block, Koramangala',
    otp: '7391',
    estimatedArrival: '8 min',
  },
  {
    id: 'BK-1020',
    providerId: 'p3',
    providerName: 'Meera Sharma',
    service: '2 BHK Deep Clean',
    date: 'Jun 28, 2026',
    time: '9:00 AM',
    status: 'completed',
    price: 2199,
    address: '42, 5th Block, Koramangala',
  },
  {
    id: 'BK-1018',
    providerId: 'p2',
    providerName: 'Suresh Patel',
    service: 'Switch Repair',
    date: 'Jun 20, 2026',
    time: '4:30 PM',
    status: 'cancelled',
    price: 349,
    address: '42, 5th Block, Koramangala',
  },
];

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    title: 'Provider on the way',
    message: 'Vikram Singh is heading to your location. ETA 8 min.',
    time: '10:42 AM',
    section: 'today',
    read: false,
  },
  {
    id: 'n2',
    title: 'Booking confirmed',
    message: 'Your plumbing service with Rajesh Kumar is confirmed for Jul 8.',
    time: '9:15 AM',
    section: 'today',
    read: false,
  },
  {
    id: 'n3',
    title: 'Special offer',
    message: 'Get 20% off on your next AC service. Use code COOL20.',
    time: '6:30 PM',
    section: 'yesterday',
    read: true,
  },
  {
    id: 'n4',
    title: 'Rate your service',
    message: 'How was your cleaning service with Meera Sharma?',
    time: 'Jun 28',
    section: 'earlier',
    read: true,
  },
];

export const MOCK_SEARCH: SearchSuggestion[] = [
  { id: 'rs1', label: 'Plumber near me', type: 'recent' },
  { id: 'rs2', label: 'AC repair', type: 'recent' },
  { id: 'ps1', label: 'Electrician', type: 'popular' },
  { id: 'ps2', label: 'Home cleaning', type: 'popular' },
  { id: 'ps3', label: 'Pest control', type: 'popular' },
  { id: 'cs1', label: 'Salon at home', type: 'category' },
  { id: 'cs2', label: 'Gardening', type: 'category' },
];

export const MOCK_OFFERS = [
  { id: 'o1', title: 'Summer Special', subtitle: '20% off AC services', code: 'COOL20' },
  { id: 'o2', title: 'First Booking', subtitle: 'Flat ₹100 off', code: 'FIRST100' },
];

export function getProviderById(id: string): Provider | undefined {
  return MOCK_PROVIDERS.find((p) => p.id === id);
}

export function getBookingById(id: string): Booking | undefined {
  return MOCK_BOOKINGS.find((b) => b.id === id);
}
