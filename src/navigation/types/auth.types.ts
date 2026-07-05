export type AuthStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  CustomerLogin: undefined;
  ProviderLogin: undefined;
  CustomerRegister: undefined;
  ProviderRegister: undefined;
  OTP:
    | {
        phone?: string;
        email?: string;
        flow?: 'register' | 'forgot';
        role?: 'customer' | 'provider';
      }
    | undefined;
  ForgotPassword: undefined;
  ResetPassword: { email?: string } | undefined;
};
