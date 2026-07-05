/**
 * ServiceHub palette — gold accent on clean neutral surfaces.
 */
export const colors = {
  // Brand
  primary: '#C4A020',
  primaryDark: '#9A7B18',
  primaryLight: '#D4B84A',
  onPrimary: '#FFFFFF',
  primaryContainer: '#F4F4F5',
  onPrimaryContainer: '#1A1814',

  secondary: '#E09520',
  secondaryDark: '#B87618',
  secondaryLight: '#E8AB45',
  onSecondary: '#FFFFFF',
  secondaryContainer: '#F4F4F5',
  onSecondaryContainer: '#1A1814',

  // Surfaces
  background: '#F4F6FA',
  onBackground: '#111827',
  surface: '#FFFFFF',
  onSurface: '#111827',
  surfaceVariant: '#F3F4F6',
  onSurfaceVariant: '#6B7280',
  surfaceElevated: '#FFFFFF',
  surfaceDisabled: 'rgba(24, 24, 27, 0.06)',
  onSurfaceDisabled: 'rgba(24, 24, 27, 0.38)',

  // Input
  inputBackground: '#FFFFFF',
  inputBorder: '#E5E7EB',
  inputBorderFocus: '#C4A020',
  placeholder: '#71717A',

  // Semantic
  error: '#DC2626',
  onError: '#FFFFFF',
  errorContainer: '#FEF2F2',
  onErrorContainer: '#991B1B',

  success: '#16A34A',
  onSuccess: '#FFFFFF',
  successContainer: '#F0FDF4',
  onSuccessContainer: '#166534',

  warning: '#EA580C',
  onWarning: '#FFFFFF',
  warningContainer: '#FFF7ED',
  onWarningContainer: '#9A3412',

  // Borders & dividers
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  outline: '#D1D5DB',
  outlineVariant: '#E5E7EB',
  divider: '#F3F4F6',

  // Text hierarchy
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textInverse: '#FFFFFF',
  textLink: '#9A7B18',

  // Utility
  backdrop: 'rgba(24, 24, 27, 0.5)',
  shadow: '#18181B',
  overlay: 'rgba(24, 24, 27, 0.04)',
  scrim: 'rgba(24, 24, 27, 0.32)',

  inverseSurface: '#27272A',
  inverseOnSurface: '#FAFAFA',
  inversePrimary: '#D4B84A',

  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

export type AppColors = typeof colors;
export type ColorToken = keyof AppColors;
