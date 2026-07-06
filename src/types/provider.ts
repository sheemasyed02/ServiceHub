export type VerificationStatus = 'verified' | 'pending' | 'rejected' | 'not_uploaded';

export type JobRequestStatus = 'pending' | 'accepted' | 'rejected' | 'active' | 'completed';

export type TransactionStatus = 'completed' | 'pending' | 'failed';

export type ProviderUser = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  avatar: string;
  profession: string;
  experience: string;
  rating: number;
  reviewCount: number;
  completedJobs: number;
  languages: string[];
  skills: string[];
  certificates: string[];
  workingHours: string;
  serviceAreas: string[];
  verified: boolean;
  isOnline: boolean;
};

export type JobRequest = {
  id: string;
  bookingId: string;
  customerId: string;
  customerName: string;
  customerAvatar: string;
  customerPhone: string;
  service: string;
  address: string;
  distance: string;
  duration: string;
  estimatedEarnings: number;
  status: JobRequestStatus;
  scheduledAt: string;
  otp?: string;
};

export type ProviderService = {
  id: string;
  category: string;
  name: string;
  description: string;
  basePrice: number;
  duration: string;
  availableDays: string[];
};

export type ProviderDocument = {
  id: string;
  type: string;
  title: string;
  status: VerificationStatus;
  uploadedAt?: string;
};

export type ProviderTransaction = {
  id: string;
  bookingId: string;
  customerName: string;
  amount: number;
  commission: number;
  status: TransactionStatus;
  date: string;
};

export type ProviderNotification = {
  id: string;
  type: 'booking' | 'payment' | 'verification' | 'announcement';
  title: string;
  message: string;
  time: string;
  read: boolean;
};

export type ProviderReview = {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
  photos?: string[];
  service: string;
};

export type CalendarBooking = {
  id: string;
  customerName: string;
  service: string;
  time: string;
  date: string;
};

export type TimeSlot = {
  id: string;
  label: string;
  available: boolean;
};

export type EarningsSummary = {
  today: number;
  weekly: number;
  monthly: number;
  total: number;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};
