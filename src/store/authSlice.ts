import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { DEFAULT_CUSTOMER_ID } from '@/constants/provider/accounts';

export type AuthRole = 'customer' | 'provider';

export type AuthState = {
  isAuthenticated: boolean;
  role: AuthRole | null;
  customerId: string;
  providerId: string | null;
};

type AuthStateInternal = AuthState;

const initialState: AuthStateInternal = {
  isAuthenticated: false,
  role: null,
  customerId: DEFAULT_CUSTOMER_ID,
  providerId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAsCustomer: (state, action: PayloadAction<{ customerId?: string } | undefined>) => {
      state.isAuthenticated = true;
      state.role = 'customer';
      state.customerId = action.payload?.customerId ?? DEFAULT_CUSTOMER_ID;
      state.providerId = null;
    },
    loginAsProvider: (state, action: PayloadAction<{ providerId: string }>) => {
      state.isAuthenticated = true;
      state.role = 'provider';
      state.providerId = action.payload.providerId;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.role = null;
      state.providerId = null;
    },
    hydrateAuth: (state, action: PayloadAction<AuthState>) => action.payload,
  },
});

export const { loginAsCustomer, loginAsProvider, logout, hydrateAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
