import type {
  CalendarBooking,
  EarningsSummary,
  FaqItem,
  JobRequest,
  ProviderDocument,
  ProviderNotification,
  ProviderReview,
  ProviderService,
  ProviderTransaction,
  ProviderUser,
  TimeSlot,
} from '@/types/provider';

export const MOCK_PROVIDER_USER: ProviderUser = {
  id: 'prov-1',
  name: 'Rajesh Kumar',
  phone: '+91 98765 43210',
  email: 'rajesh@servicehub.com',
  address: 'HSR Layout, Bengaluru',
  avatar: 'https://i.pravatar.cc/150?u=rajesh-provider',
  profession: 'Plumber',
  experience: '8 years',
  rating: 4.9,
  reviewCount: 214,
  completedJobs: 520,
  languages: ['English', 'Hindi', 'Kannada'],
  skills: ['Pipe Repair', 'Water Heater', 'Leak Fix', 'Bathroom Fitting'],
  certificates: ['Licensed Plumber', 'Safety Certified'],
  workingHours: 'Mon–Sat, 8 AM – 8 PM',
  serviceAreas: ['HSR Layout', 'Koramangala', 'BTM Layout', 'Indiranagar'],
  verified: true,
  isOnline: true,
};

export const MOCK_EARNINGS: EarningsSummary = {
  today: 2450,
  weekly: 12800,
  monthly: 48600,
  total: 342500,
};

export const MOCK_JOB_REQUESTS: JobRequest[] = [
  {
    id: 'jr1',
    bookingId: 'BK-2024-1847',
    customerId: 'c1',
    customerName: 'Alex Johnson',
    customerAvatar: 'https://i.pravatar.cc/150?u=alex-customer',
    customerPhone: '+91 91234 56789',
    service: 'Pipe Leak Fix',
    address: '42, 5th Cross, Koramangala, Bengaluru',
    distance: '1.2 km',
    duration: '45 min',
    estimatedEarnings: 499,
    status: 'pending',
    scheduledAt: 'Today, 2:30 PM',
    otp: '4829',
  },
  {
    id: 'jr2',
    bookingId: 'BK-2024-1848',
    customerId: 'c2',
    customerName: 'Priya Sharma',
    customerAvatar: 'https://i.pravatar.cc/150?u=priya-customer',
    customerPhone: '+91 99887 76655',
    service: 'Tap Repair',
    address: '18, 12th Main, HSR Layout, Bengaluru',
    distance: '0.8 km',
    duration: '30 min',
    estimatedEarnings: 299,
    status: 'pending',
    scheduledAt: 'Today, 4:00 PM',
    otp: '7153',
  },
  {
    id: 'jr3',
    bookingId: 'BK-2024-1845',
    customerId: 'c3',
    customerName: 'Amit Verma',
    customerAvatar: 'https://i.pravatar.cc/150?u=amit-customer',
    customerPhone: '+91 87654 32109',
    service: 'Bathroom Installation',
    address: '7, MG Road, Indiranagar, Bengaluru',
    distance: '3.4 km',
    duration: '2 hrs',
    estimatedEarnings: 2499,
    status: 'accepted',
    scheduledAt: 'Tomorrow, 10:00 AM',
    otp: '9031',
  },
];

export const MOCK_ACTIVE_JOB = MOCK_JOB_REQUESTS[2];

export const MOCK_PROVIDER_SERVICES: ProviderService[] = [
  {
    id: 'ps1',
    category: 'Plumbing',
    name: 'Tap Repair',
    description: 'Fix leaking or broken taps and faucets.',
    basePrice: 299,
    duration: '30 min',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
  {
    id: 'ps2',
    category: 'Plumbing',
    name: 'Pipe Leak Fix',
    description: 'Locate and repair pipe leaks.',
    basePrice: 499,
    duration: '45 min',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
  {
    id: 'ps3',
    category: 'Plumbing',
    name: 'Bathroom Installation',
    description: 'Full bathroom fixture installation.',
    basePrice: 2499,
    duration: '2 hrs',
    availableDays: ['Mon', 'Wed', 'Fri', 'Sat'],
  },
];

export const MOCK_DOCUMENTS: ProviderDocument[] = [
  {
    id: 'd1',
    type: 'aadhaar',
    title: 'Aadhaar Card',
    status: 'verified',
    uploadedAt: 'Jan 12, 2024',
  },
  { id: 'd2', type: 'pan', title: 'PAN Card', status: 'verified', uploadedAt: 'Jan 12, 2024' },
  {
    id: 'd3',
    type: 'license',
    title: 'Driving License',
    status: 'pending',
    uploadedAt: 'Feb 3, 2024',
  },
  {
    id: 'd4',
    type: 'skill',
    title: 'Skill Certificate',
    status: 'verified',
    uploadedAt: 'Jan 15, 2024',
  },
  { id: 'd5', type: 'police', title: 'Police Verification', status: 'not_uploaded' },
  { id: 'd6', type: 'bank', title: 'Bank Details', status: 'verified', uploadedAt: 'Jan 10, 2024' },
];

export const MOCK_TRANSACTIONS: ProviderTransaction[] = [
  {
    id: 't1',
    bookingId: 'BK-2024-1840',
    customerName: 'Neha Reddy',
    amount: 599,
    commission: 60,
    status: 'completed',
    date: 'Jul 4, 2026',
  },
  {
    id: 't2',
    bookingId: 'BK-2024-1838',
    customerName: 'Rahul Mehta',
    amount: 499,
    commission: 50,
    status: 'completed',
    date: 'Jul 3, 2026',
  },
  {
    id: 't3',
    bookingId: 'BK-2024-1835',
    customerName: 'Sneha Iyer',
    amount: 2499,
    commission: 250,
    status: 'pending',
    date: 'Jul 2, 2026',
  },
  {
    id: 't4',
    bookingId: 'BK-2024-1830',
    customerName: 'Karan Singh',
    amount: 299,
    commission: 30,
    status: 'completed',
    date: 'Jul 1, 2026',
  },
];

export const MOCK_PROVIDER_NOTIFICATIONS: ProviderNotification[] = [
  {
    id: 'n1',
    type: 'booking',
    title: 'New booking request',
    message: 'Alex Johnson requested Pipe Leak Fix for today at 2:30 PM.',
    time: '5 min ago',
    read: false,
  },
  {
    id: 'n2',
    type: 'payment',
    title: 'Payment received',
    message: '₹539 credited for booking BK-2024-1840.',
    time: '2 hrs ago',
    read: false,
  },
  {
    id: 'n3',
    type: 'verification',
    title: 'Document under review',
    message: 'Your Driving License is being verified.',
    time: '1 day ago',
    read: true,
  },
  {
    id: 'n4',
    type: 'announcement',
    title: 'Platform update',
    message: 'New earnings dashboard is now live for all providers.',
    time: '3 days ago',
    read: true,
  },
];

export const MOCK_PROVIDER_REVIEWS: ProviderReview[] = [
  {
    id: 'pr1',
    author: 'Priya S.',
    avatar: 'https://i.pravatar.cc/150?u=priya-review',
    rating: 5,
    text: 'Fixed the leak quickly and professionally. Very neat work.',
    date: '2 days ago',
    service: 'Pipe Leak Fix',
    photos: ['https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&q=80'],
  },
  {
    id: 'pr2',
    author: 'Amit K.',
    avatar: 'https://i.pravatar.cc/150?u=amit-review',
    rating: 5,
    text: 'On time and very tidy work. Would recommend.',
    date: '1 week ago',
    service: 'Tap Repair',
  },
  {
    id: 'pr3',
    author: 'Neha R.',
    avatar: 'https://i.pravatar.cc/150?u=neha-review',
    rating: 4,
    text: 'Good service overall. Slightly delayed but quality was great.',
    date: '2 weeks ago',
    service: 'Bathroom Installation',
    photos: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200&q=80',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200&q=80',
    ],
  },
];

export const MOCK_CALENDAR_BOOKINGS: CalendarBooking[] = [
  {
    id: 'cb1',
    customerName: 'Alex Johnson',
    service: 'Pipe Leak Fix',
    time: '2:30 PM',
    date: '2026-07-05',
  },
  {
    id: 'cb2',
    customerName: 'Priya Sharma',
    service: 'Tap Repair',
    time: '4:00 PM',
    date: '2026-07-05',
  },
  {
    id: 'cb3',
    customerName: 'Amit Verma',
    service: 'Bathroom Installation',
    time: '10:00 AM',
    date: '2026-07-06',
  },
];

export const MOCK_TIME_SLOTS: TimeSlot[] = [
  { id: 'ts1', label: '8:00 AM – 10:00 AM', available: true },
  { id: 'ts2', label: '10:00 AM – 12:00 PM', available: false },
  { id: 'ts3', label: '12:00 PM – 2:00 PM', available: true },
  { id: 'ts4', label: '2:00 PM – 4:00 PM', available: true },
  { id: 'ts5', label: '4:00 PM – 6:00 PM', available: false },
  { id: 'ts6', label: '6:00 PM – 8:00 PM', available: true },
];

export const MOCK_BLOCKED_DATES = ['2026-07-10', '2026-07-15', '2026-07-22'];

export const MOCK_PROVIDER_FAQS: FaqItem[] = [
  {
    id: 'f1',
    question: 'How do I accept a job request?',
    answer:
      'Go to the Jobs tab, review the request details, and tap Accept. You can also swipe right on a card.',
  },
  {
    id: 'f2',
    question: 'When do I receive payments?',
    answer: 'Payments are credited within 24 hours after the customer confirms service completion.',
  },
  {
    id: 'f3',
    question: 'How do I update my availability?',
    answer: 'Open the Calendar tab and use Add Availability to set your free time slots.',
  },
];

export function getJobRequestById(id: string): JobRequest | undefined {
  return MOCK_JOB_REQUESTS.find((j) => j.id === id);
}

export function getProviderServiceById(id: string): ProviderService | undefined {
  return MOCK_PROVIDER_SERVICES.find((s) => s.id === id);
}
