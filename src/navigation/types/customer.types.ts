export type HomeStackParamList = {
  HomeMain: undefined;
  Search: undefined;
  ProviderListing: { categoryId?: string; categoryTitle?: string } | undefined;
  ProviderProfile: { providerId: string };
  Booking: { providerId: string; serviceId?: string };
  BookingConfirmation: { bookingId: string };
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
