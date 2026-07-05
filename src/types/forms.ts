export type CustomerRegisterFormValues = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

export type ProviderRegisterFormValues = {
  fullName: string;
  phone: string;
  password: string;
  address: string;
  serviceCategory: string;
  yearsOfExperience: string;
};

export type ForgotPasswordFormValues = {
  email: string;
};

export type ResetPasswordFormValues = {
  password: string;
  confirmPassword: string;
};

export type OtpFormValues = {
  otp: string;
};

export type CustomerLoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type ProviderLoginFormValues = {
  email: string;
  password: string;
};

export type AuthOtpFlow = 'register' | 'forgot';
