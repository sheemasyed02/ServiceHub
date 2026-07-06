import type { NavigatorScreenParams } from '@react-navigation/native';

export type ChatStackParamList = {
  ChatList: undefined;
  ChatConversation: { threadId: string };
};

export type HomeStackParamList = {
  HomeMain: undefined;
  Search: undefined;
  ProviderListing: { categoryId?: string; categoryTitle?: string } | undefined;
  ProviderProfile: { providerId: string };
  Booking: { providerId: string; serviceId?: string };
  BookingConfirmation: { bookingId: string };
  ProfileFlow: NavigatorScreenParams<ProfileStackParamList> | undefined;
};

export type BookingsStackParamList = {
  MyBookings: undefined;
  BookingDetails: { bookingId: string };
  LiveTracking: { bookingId: string };
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  EditProfile: undefined;
  Settings: undefined;
  HelpSupport: undefined;
  Reviews: undefined;
};
