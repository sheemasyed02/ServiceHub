import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type CustomerUser = {
  name: string;
  phone: string;
  email: string;
  location: string;
};

type CustomerState = {
  user: CustomerUser;
};

const initialState: CustomerState = {
  user: {
    name: 'Alex Johnson',
    phone: '+91 98765 43210',
    email: 'alex@example.com',
    location: 'Koramangala, Bengaluru',
  },
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<CustomerUser>>) => {
      state.user = { ...state.user, ...action.payload };
    },
    hydrateUser: (state, action: PayloadAction<CustomerUser>) => {
      state.user = action.payload;
    },
  },
});

export const { updateUser, hydrateUser } = customerSlice.actions;
export const customerReducer = customerSlice.reducer;
