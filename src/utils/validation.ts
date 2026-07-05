export const PHONE_PATTERN = /^[+]?[\d\s-]{10,15}$/;

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validationRules = {
  fullName: {
    required: 'Full name is required',
    minLength: { value: 2, message: 'Enter your full name' },
  },
  email: {
    required: 'Email is required',
    pattern: {
      value: EMAIL_PATTERN,
      message: 'Enter a valid email address',
    },
  },
  phone: {
    required: 'Phone number is required',
    pattern: {
      value: PHONE_PATTERN,
      message: 'Enter a valid phone number',
    },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters',
    },
  },
  terms: {
    validate: (value: boolean) => value || 'You must accept the terms to continue',
  },
  address: {
    required: 'Address is required',
    minLength: { value: 5, message: 'Enter your full address' },
  },
  serviceCategory: {
    required: 'Service category is required',
  },
  yearsOfExperience: {
    required: 'Years of experience is required',
    pattern: {
      value: /^\d+$/,
      message: 'Enter a valid number',
    },
    validate: (value: string) => {
      const years = Number(value);
      if (Number.isNaN(years) || years < 0 || years > 60) {
        return 'Enter years between 0 and 60';
      }
      return true;
    },
  },
} as const;

export type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong';

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return 'weak';

  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 2) return 'weak';
  if (score === 3) return 'fair';
  if (score === 4) return 'good';
  return 'strong';
}

export function validateConfirmPassword(password: string, confirmPassword: string) {
  return password === confirmPassword || 'Passwords do not match';
}
