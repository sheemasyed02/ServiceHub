export type EntityStatus = 'active' | 'inactive' | 'suspended' | 'pending';

export type VerificationStatus = 'verified' | 'pending' | 'rejected' | 'changes_requested';

export type BookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

export type PaymentStatus = 'paid' | 'pending' | 'failed' | 'refunded';

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  bookings: number;
  status: EntityStatus;
  joinedAt: string;
};

export type Provider = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  category: string;
  verificationStatus: VerificationStatus;
  submittedAt: string;
  isOnline: boolean;
  rating: number;
  jobsCompleted: number;
  revenue: number;
  status: EntityStatus;
  address: string;
  experience: string;
  skills: string[];
  certificates: string[];
  documents: {
    aadhaar: string;
    pan: string;
    selfie: string;
    policeVerification: VerificationStatus;
    bankDetails: string;
  };
};

export type Booking = {
  id: string;
  customer: string;
  customerId: string;
  provider: string;
  providerId: string;
  service: string;
  amount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  date: string;
  location: string;
  otp: string;
  timeline: { label: string; time: string; done: boolean }[];
};

export type Payment = {
  id: string;
  bookingId: string;
  customer: string;
  provider: string;
  amount: number;
  commission: number;
  status: PaymentStatus;
  date: string;
};

export type Review = {
  id: string;
  rating: number;
  customer: string;
  provider: string;
  review: string;
  reportCount: number;
  status: 'visible' | 'hidden' | 'flagged';
  date: string;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: EntityStatus;
};

export type NotificationItem = {
  id: string;
  title: string;
  type: 'announcement' | 'push' | 'email';
  audience: string;
  scheduledAt: string;
  status: 'draft' | 'scheduled' | 'sent';
};

export type Dispute = {
  id: string;
  bookingId: string;
  customer: string;
  provider: string;
  reason: string;
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  createdAt: string;
};

export type SupportTicket = {
  id: string;
  user: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  assignedAdmin: string;
  createdAt: string;
};

export type Activity = {
  id: string;
  message: string;
  time: string;
  type: 'user' | 'provider' | 'booking' | 'payment';
};

export type ChartPoint = {
  label: string;
  value: number;
};
