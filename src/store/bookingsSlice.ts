import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Booking, BookingStatus, ProviderResponseStatus } from '@/types/customer';
import { generateBookingId, generateOtp } from '@/utils/bookingHelpers';

import { createSeedBookings } from '@/constants/shared/seedBookings';

export type CreateBookingPayload = {
  id?: string;
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
  price: number;
  address: string;
  description?: string;
  coupon?: string;
};

type BookingsState = {
  items: Booking[];
};

const initialState: BookingsState = {
  items: createSeedBookings(),
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    hydrateBookings: (state, action: PayloadAction<Booking[]>) => {
      state.items = action.payload;
    },
    createBooking: (state, action: PayloadAction<CreateBookingPayload>) => {
      const payload = action.payload;
      const booking: Booking = {
        id: payload.id ?? generateBookingId(),
        ...payload,
        status: 'upcoming',
        providerStatus: 'pending',
        otp: generateOtp(),
        estimatedArrival: '15 min',
        createdAt: new Date().toISOString(),
      };
      state.items.unshift(booking);
    },
    acceptBooking: (state, action: PayloadAction<string>) => {
      const booking = state.items.find((b) => b.id === action.payload);
      if (booking) {
        booking.providerStatus = 'accepted';
      }
    },
    rejectBooking: (state, action: PayloadAction<string>) => {
      const booking = state.items.find((b) => b.id === action.payload);
      if (booking) {
        booking.providerStatus = 'rejected';
        booking.status = 'cancelled';
      }
    },
    startBooking: (state, action: PayloadAction<string>) => {
      const booking = state.items.find((b) => b.id === action.payload);
      if (booking) {
        booking.status = 'ongoing';
        booking.providerStatus = 'accepted';
      }
    },
    completeBooking: (state, action: PayloadAction<string>) => {
      const booking = state.items.find((b) => b.id === action.payload);
      if (booking) {
        booking.status = 'completed';
      }
    },
    cancelBooking: (state, action: PayloadAction<string>) => {
      const booking = state.items.find((b) => b.id === action.payload);
      if (booking) {
        booking.status = 'cancelled';
      }
    },
    updateBookingStatus: (
      state,
      action: PayloadAction<{
        id: string;
        status?: BookingStatus;
        providerStatus?: ProviderResponseStatus;
      }>,
    ) => {
      const booking = state.items.find((b) => b.id === action.payload.id);
      if (!booking) return;
      if (action.payload.status) booking.status = action.payload.status;
      if (action.payload.providerStatus) booking.providerStatus = action.payload.providerStatus;
    },
  },
});

export const {
  hydrateBookings,
  createBooking,
  acceptBooking,
  rejectBooking,
  startBooking,
  completeBooking,
  cancelBooking,
  updateBookingStatus,
} = bookingsSlice.actions;

export const bookingsReducer = bookingsSlice.reducer;
