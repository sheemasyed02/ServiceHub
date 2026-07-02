/**
 * ServiceHub color palette — warm gold accent on a clean light surface.
 */
export const colors = {
  // Brand
  primary: '#CCAA27',
  primaryDark: '#A88A1F',
  primaryLight: '#E4C84E',
  onPrimary: '#1A1600',
  primaryContainer: '#FBF6E0',
  onPrimaryContainer: '#3D3200',

  secondary: '#EBA225',
  secondaryDark: '#C8871A',
  secondaryLight: '#F5C05A',
  onSecondary: '#1A1200',
  secondaryContainer: '#FDF2DC',
  onSecondaryContainer: '#3D2800',

  // Surfaces
  background: '#F9F8F5',
  onBackground: '#1A1814',
  surface: '#FFFFFF',
  onSurface: '#1A1814',
  surfaceVariant: '#F2F0EA',
  onSurfaceVariant: '#5C574F',
  surfaceElevated: '#FFFFFF',
  surfaceDisabled: 'rgba(26, 24, 20, 0.08)',
  onSurfaceDisabled: 'rgba(26, 24, 20, 0.38)',

  // Semantic
  error: '#C62828',
  onError: '#FFFFFF',
  errorContainer: '#FFEBEE',
  onErrorContainer: '#5F1212',

  success: '#2E7D32',
  onSuccess: '#FFFFFF',
  successContainer: '#E8F5E9',
  onSuccessContainer: '#1B5E20',

  warning: '#ED6C02',
  onWarning: '#FFFFFF',
  warningContainer: '#FFF3E0',
  onWarningContainer: '#7C3A00',

  // Borders & dividers
  border: '#E5E1D6',
  borderLight: '#F0EDE6',
  outline: '#C9C4B8',
  outlineVariant: '#E8E4DB',
  divider: '#EBE8E0',

  // Text hierarchy
  textPrimary: '#1A1814',
  textSecondary: '#5C574F',
  textTertiary: '#8A8478',
  textInverse: '#FFFFFF',
  textLink: '#A88A1F',

  // Utility
  backdrop: 'rgba(26, 24, 20, 0.52)',
  shadow: '#1A1814',
  overlay: 'rgba(26, 24, 20, 0.06)',
  scrim: 'rgba(26, 24, 20, 0.32)',

  // Inverse (snackbars, tooltips)
  inverseSurface: '#2C2924',
  inverseOnSurface: '#F5F3EE',
  inversePrimary: '#E4C84E',

  // Pure
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

export type AppColors = typeof colors;
export type ColorToken = keyof AppColors;
