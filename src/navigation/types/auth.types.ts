export type AuthStackParamList = {
  Welcome: undefined;
  CustomerLogin: undefined;
  ProviderLogin: undefined;
  Register: undefined;
  OTP: { phone?: string; email?: string } | undefined;
  ForgotPassword: undefined;
};
