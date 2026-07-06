import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './authSlice';
import { bookingsReducer } from './bookingsSlice';
import { chatsReducer } from './chatsSlice';
import { customerReducer } from './customerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bookings: bookingsReducer,
    chats: chatsReducer,
    customer: customerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { updateUser, hydrateUser } from './customerSlice';
export type { CustomerUser } from './customerSlice';
export { loginAsCustomer, loginAsProvider, logout, hydrateAuth } from './authSlice';
export type { AuthState, AuthRole } from './authSlice';
export {
  hydrateBookings,
  createBooking,
  acceptBooking,
  rejectBooking,
  startBooking,
  completeBooking,
  cancelBooking,
} from './bookingsSlice';
export { sendMessage, markThreadRead } from './chatsSlice';
