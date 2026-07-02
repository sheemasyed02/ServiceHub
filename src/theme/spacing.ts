/**
 * 4pt base grid — consistent rhythm across layouts and components.
 */
export const spacing = {
  /** 4 */
  xxs: 4,
  /** 8 */
  xs: 8,
  /** 12 */
  sm: 12,
  /** 16 */
  md: 16,
  /** 20 */
  lg: 20,
  /** 24 */
  xl: 24,
  /** 32 */
  xxl: 32,
  /** 40 */
  xxxl: 40,
  /** 48 */
  huge: 48,
  /** 64 */
  massive: 64,
} as const;

export const borderRadius = {
  /** 6 — chips, small inputs */
  xs: 6,
  /** 10 — buttons, inputs */
  sm: 10,
  /** 14 — cards, modals */
  md: 14,
  /** 18 — large cards, sheets */
  lg: 18,
  /** 24 — hero cards, featured surfaces */
  xl: 24,
  /** 9999 — pills, avatars */
  full: 9999,
} as const;

export const layout = {
  screenPaddingHorizontal: spacing.xl,
  screenPaddingVertical: spacing.xl,
  sectionGap: spacing.xxl,
  cardPadding: spacing.lg,
  inputHeight: 52,
  buttonHeight: 48,
  buttonHeightSm: 40,
  buttonHeightLg: 56,
  iconSize: 24,
  iconSizeSm: 20,
  iconSizeLg: 28,
} as const;

export type AppSpacing = typeof spacing;
export type AppBorderRadius = typeof borderRadius;
export type AppLayout = typeof layout;
