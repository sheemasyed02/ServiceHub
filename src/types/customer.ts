export type BookingStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

export type ProviderResponseStatus = 'pending' | 'accepted' | 'rejected';

export type CustomerCategory = {
  id: string;
  title: string;
  icon: string;
};

export type ProviderService = {
  id: string;
  name: string;
  price: number;
};

export type ProviderReview = {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
};

export type Provider = {
  id: string;
  name: string;
  profession: string;
  categoryId: string;
  experience: string;
  rating: number;
  reviewCount: number;
  completedJobs: number;
  distance: string;
  priceFrom: number;
  verified: boolean;
  about: string;
  skills: string[];
  certificates: string[];
  portfolio: string[];
  services: ProviderService[];
  workingHours: string;
  reviews: ProviderReview[];
  isFavorite?: boolean;
};

export type Booking = {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAvatar?: string;
  providerId: string;
  providerName: string;
  categoryId: string;
  service: string;
  date: string;
  time: string;
  status: BookingStatus;
  providerStatus: ProviderResponseStatus;
  price: number;
  address: string;
  description?: string;
  coupon?: string;
  otp?: string;
  estimatedArrival?: string;
  createdAt: string;
};

export type AppNotification = {
  id: string;
  title: string;
  message: string;
  time: string;
  section: 'today' | 'yesterday' | 'earlier';
  read: boolean;
};

export type SearchSuggestion = {
  id: string;
  label: string;
  type: 'recent' | 'popular' | 'category';
};
