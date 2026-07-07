import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type ProviderState = {
  isOnline: boolean;
};

const initialState: ProviderState = {
  isOnline: true,
};

const providerSlice = createSlice({
  name: 'provider',
  initialState,
  reducers: {
    setProviderOnline: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
  },
});

export const { setProviderOnline } = providerSlice.actions;
export const providerReducer = providerSlice.reducer;
