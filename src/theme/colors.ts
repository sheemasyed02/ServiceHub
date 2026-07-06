/**
 * ServiceHub — warm ivory base with gold accent. Clean, professional, not muddy.
 */
export const colors = {
  // Brand
  primary: '#B8922A',
  primaryDark: '#8A6F18',
  primaryLight: '#D4AF45',
  onPrimary: '#FFFFFF',
  primaryContainer: '#F0E4C8',
  onPrimaryContainer: '#3D3018',

  secondary: '#6B6560',
  secondaryDark: '#524E4A',
  secondaryLight: '#8A8480',
  onSecondary: '#FFFFFF',
  secondaryContainer: '#EDE9E2',
  onSecondaryContainer: '#2C2A28',

  // Hero blends into page background
  heroStart: '#FAF3E3',
  heroEnd: '#F5F3EF',
  offerOverlayStart: 'rgba(184, 146, 42, 0.92)',
  offerOverlayEnd: 'rgba(45, 42, 38, 0.88)',

  // Surfaces — warm ivory page, crisp white cards
  background: '#F5F3EF',
  onBackground: '#2C2A28',
  surface: '#FFFFFF',
  onSurface: '#2C2A28',
  surfaceVariant: '#EDE9E2',
  onSurfaceVariant: '#6B6560',
  surfaceElevated: '#FFFFFF',
  surfaceMuted: '#E5E0D8',
  sectionTint: '#F0ECE6',
  surfaceDisabled: 'rgba(44, 42, 40, 0.06)',
  onSurfaceDisabled: 'rgba(44, 42, 40, 0.38)',

  // Input
  inputBackground: '#FFFFFF',
  inputBorder: '#DDD8D0',
  inputBorderFocus: '#B8922A',
  placeholder: '#9C968F',

  // Semantic
  error: '#C62828',
  onError: '#FFFFFF',
  errorContainer: '#FDECEC',
  onErrorContainer: '#7F1D1D',

  success: '#15803D',
  onSuccess: '#FFFFFF',
  successContainer: '#E8F5EC',
  onSuccessContainer: '#14532D',

  warning: '#C2410C',
  onWarning: '#FFFFFF',
  warningContainer: '#FFF1E8',
  onWarningContainer: '#7C2D12',

  // Borders & dividers
  border: '#DDD8D0',
  borderLight: '#EBE7E0',
  outline: '#C9C4BC',
  outlineVariant: '#DDD8D0',
  divider: '#EBE7E0',

  // Text hierarchy
  textPrimary: '#2C2A28',
  textSecondary: '#6B6560',
  textTertiary: '#9C968F',
  textInverse: '#FFFFFF',
  textLink: '#8A6F18',

  // Utility
  backdrop: 'rgba(44, 42, 40, 0.5)',
  shadow: '#2C2A28',
  overlay: 'rgba(44, 42, 40, 0.04)',
  scrim: 'rgba(44, 42, 40, 0.32)',

  inverseSurface: '#2C2A28',
  inverseOnSurface: '#F5F3EF',
  inversePrimary: '#D4AF45',

  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

export type AppColors = typeof colors;
export type ColorToken = keyof AppColors;
