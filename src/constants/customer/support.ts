import type {
  AddressOption,
  CouponOption,
  FilterOption,
  SortOption,
} from '@/components/bottom-sheets';

import { MOCK_IMAGES } from './images';

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type CustomerReviewItem = {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  service: string;
  hasPhoto?: boolean;
  photoUrls?: string[];
  authorAvatar?: string;
};

export const MOCK_FAQS: FaqItem[] = [
  {
    id: 'f1',
    question: 'How do I book a service?',
    answer:
      'Browse categories, choose a provider, select a service, pick date & time, and confirm your booking.',
  },
  {
    id: 'f2',
    question: 'Can I cancel or reschedule?',
    answer:
      'Yes. Open My Bookings, select your booking, and tap Cancel or contact support to reschedule.',
  },
  {
    id: 'f3',
    question: 'How does payment work?',
    answer: 'Pay securely after service completion or use saved payment methods during checkout.',
  },
  {
    id: 'f4',
    question: 'What is the service OTP?',
    answer: 'A 4-digit code shared with your provider when they arrive to verify the booking.',
  },
];

export const MOCK_CUSTOMER_REVIEWS: CustomerReviewItem[] = [
  {
    id: 'cr1',
    author: 'Priya Sharma',
    rating: 5,
    date: 'Jul 2, 2026',
    text: 'Excellent plumbing service. Fixed the leak in under an hour and left everything clean.',
    service: 'Pipe Leak Fix',
    hasPhoto: true,
    photoUrls: [...MOCK_IMAGES.reviews.cr1],
    authorAvatar: MOCK_IMAGES.reviewers.cr1,
  },
  {
    id: 'cr2',
    author: 'Amit Verma',
    rating: 4,
    date: 'Jun 28, 2026',
    text: 'Good AC service. Took a bit longer than expected but the cooling is much better now.',
    service: 'AC Service',
    authorAvatar: MOCK_IMAGES.reviewers.cr2,
  },
  {
    id: 'cr3',
    author: 'Neha Reddy',
    rating: 5,
    date: 'Jun 20, 2026',
    text: 'Deep cleaning was thorough. Team was polite and professional throughout.',
    service: 'Home Cleaning',
    hasPhoto: true,
    photoUrls: [...MOCK_IMAGES.reviews.cr3],
    authorAvatar: MOCK_IMAGES.reviewers.cr3,
  },
  {
    id: 'cr4',
    author: 'Rahul Mehta',
    rating: 4,
    date: 'Jun 12, 2026',
    text: 'Electrician arrived on time. Wiring issue resolved quickly.',
    service: 'Switch Repair',
    authorAvatar: MOCK_IMAGES.reviewers.cr4,
  },
];

export const REVIEW_BREAKDOWN = [
  { stars: 5, count: 142 },
  { stars: 4, count: 48 },
  { stars: 3, count: 12 },
  { stars: 2, count: 5 },
  { stars: 1, count: 2 },
];

export const OVERALL_RATING = 4.8;

export const FILTER_OPTIONS: FilterOption[] = [
  { id: 'verified', label: 'Verified only' },
  { id: 'top-rated', label: 'Top rated (4.5+)' },
  { id: 'nearby', label: 'Within 3 km' },
  { id: 'available', label: 'Available today' },
  { id: 'budget', label: 'Budget friendly' },
];

export const SORT_OPTIONS: SortOption[] = [
  { id: 'rating', label: 'Top rated', description: 'Highest rated providers first' },
  { id: 'price-low', label: 'Price: Low to high' },
  { id: 'price-high', label: 'Price: High to low' },
  { id: 'distance', label: 'Nearest first' },
  { id: 'popular', label: 'Most booked' },
];

export const REVIEW_SORT_OPTIONS: SortOption[] = [
  { id: 'recent', label: 'Most recent' },
  { id: 'highest', label: 'Highest rating' },
  { id: 'lowest', label: 'Lowest rating' },
  { id: 'photos', label: 'With photos' },
];

export const BOOKING_DATES = [
  'Jul 8, 2026',
  'Jul 9, 2026',
  'Jul 10, 2026',
  'Jul 11, 2026',
  'Jul 12, 2026',
];

export const BOOKING_TIMES = ['9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '4:30 PM', '6:00 PM'];

export const SAVED_ADDRESSES: AddressOption[] = [
  {
    id: 'a1',
    label: 'Home',
    address: '42, 5th Block, Koramangala, Bengaluru',
    type: 'home',
  },
  {
    id: 'a2',
    label: 'Work',
    address: 'Tech Park, Outer Ring Road, Bengaluru',
    type: 'work',
  },
  {
    id: 'a3',
    label: 'Other',
    address: '12, Indiranagar 100ft Road, Bengaluru',
    type: 'other',
  },
];

export const COUPON_OPTIONS: CouponOption[] = [
  { code: 'COOL20', title: '20% off AC services', discount: '20% off' },
  { code: 'FIRST100', title: 'First booking discount', discount: '₹100 off' },
  { code: 'CLEAN15', title: '15% off cleaning', discount: '15% off' },
];
