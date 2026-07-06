import { Platform, type ViewStyle } from 'react-native';
import { MD3LightTheme, type MD3Theme } from 'react-native-paper';

import { colors } from './colors';
import { gradients } from './gradients';
import { borderRadius, layout, spacing } from './spacing';
import { paperFonts, typography } from './typography';

type ShadowStyle = Pick<
  ViewStyle,
  | 'shadowColor'
  | 'shadowOffset'
  | 'shadowOpacity'
  | 'shadowRadius'
  | 'elevation'
  | 'borderWidth'
  | 'borderColor'
>;

const createShadow = (
  elevation: number,
  offsetY: number,
  opacity: number,
  radius: number,
): ShadowStyle =>
  Platform.select({
    ios: {
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: offsetY },
      shadowOpacity: opacity,
      shadowRadius: radius,
    },
    android: {
      elevation,
    },
    default: {
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: offsetY },
      shadowOpacity: opacity,
      shadowRadius: radius,
      elevation,
    },
  }) as ShadowStyle;

/** Layered elevation system — subtle depth without heavy drop shadows. */
export const shadows = {
  none: createShadow(0, 0, 0, 0),
  xs: createShadow(1, 1, 0.05, 3),
  sm: createShadow(2, 2, 0.07, 6),
  md: createShadow(4, 3, 0.09, 10),
  lg: createShadow(6, 6, 0.11, 16),
  xl: createShadow(10, 8, 0.13, 22),
} as const;

/** MD3 surface tints for Paper elevation levels. */
const elevationSurfaces = {
  level0: colors.surface,
  level1: colors.surface,
  level2: colors.surfaceVariant,
  level3: colors.surfaceVariant,
  level4: colors.surfaceVariant,
  level5: colors.surfaceVariant,
};

/** Button style presets — use with Paper Button or custom Pressable. */
export const buttonStyles = {
  base: {
    borderRadius: borderRadius.sm,
    minHeight: layout.buttonHeight,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
  },
  contained: {
    backgroundColor: colors.primary,
    ...shadows.sm,
  },
  containedPressed: {
    backgroundColor: colors.primaryDark,
    ...shadows.none,
  },
  containedSecondary: {
    backgroundColor: colors.secondary,
    ...shadows.sm,
  },
  outlined: {
    backgroundColor: colors.transparent,
    borderWidth: 1.5,
    borderColor: colors.outline,
  },
  outlinedPrimary: {
    backgroundColor: colors.transparent,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  text: {
    backgroundColor: colors.transparent,
    paddingHorizontal: spacing.md,
  },
  disabled: {
    backgroundColor: colors.surfaceDisabled,
    ...shadows.none,
  },
  sm: {
    minHeight: layout.buttonHeightSm,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.xs,
  },
  lg: {
    minHeight: layout.buttonHeightLg,
    paddingHorizontal: spacing.xxl,
    borderRadius: borderRadius.md,
  },
  label: {
    color: colors.onPrimary,
    fontWeight: '600' as const,
    fontSize: 15,
    letterSpacing: 0.25,
  },
  labelOutlined: {
    color: colors.primaryDark,
    fontWeight: '600' as const,
    fontSize: 15,
    letterSpacing: 0.25,
  },
  labelText: {
    color: colors.primaryDark,
    fontWeight: '600' as const,
    fontSize: 15,
    letterSpacing: 0.25,
  },
} as const;

/** Card style presets — elevated, outlined, and filled variants. */
export const cardStyles = {
  base: {
    borderRadius: borderRadius.md,
    padding: layout.cardPadding,
    overflow: 'hidden' as const,
  },
  elevated: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: layout.cardPadding,
    ...shadows.md,
  },
  outlined: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: layout.cardPadding,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filled: {
    backgroundColor: colors.surfaceVariant,
    borderRadius: borderRadius.md,
    padding: layout.cardPadding,
  },
  featured: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.xs,
  },
  compact: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.sm,
    padding: spacing.md,
    ...shadows.xs,
  },
} as const;

export type AppShadows = typeof shadows;
export type AppButtonStyles = typeof buttonStyles;
export type AppCardStyles = typeof cardStyles;

/** Extended theme tokens bundled alongside the Paper theme. */
export const themeTokens = {
  colors,
  gradients,
  spacing,
  borderRadius,
  layout,
  typography,
  shadows,
  buttonStyles,
  cardStyles,
} as const;

/** React Native Paper MD3 light theme configured for ServiceHub. */
export const paperTheme: MD3Theme = {
  ...MD3LightTheme,
  roundness: borderRadius.sm,
  fonts: paperFonts,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    onPrimary: colors.onPrimary,
    primaryContainer: colors.primaryContainer,
    onPrimaryContainer: colors.onPrimaryContainer,
    secondary: colors.secondary,
    onSecondary: colors.onSecondary,
    secondaryContainer: colors.secondaryContainer,
    onSecondaryContainer: colors.onSecondaryContainer,
    tertiary: colors.secondaryLight,
    onTertiary: colors.onSecondary,
    tertiaryContainer: colors.secondaryContainer,
    onTertiaryContainer: colors.onSecondaryContainer,
    error: colors.error,
    onError: colors.onError,
    errorContainer: colors.errorContainer,
    onErrorContainer: colors.onErrorContainer,
    background: colors.background,
    onBackground: colors.onBackground,
    surface: colors.surface,
    onSurface: colors.onSurface,
    surfaceVariant: colors.surfaceVariant,
    onSurfaceVariant: colors.onSurfaceVariant,
    surfaceDisabled: colors.surfaceDisabled,
    onSurfaceDisabled: colors.onSurfaceDisabled,
    outline: colors.outline,
    outlineVariant: colors.outlineVariant,
    inverseSurface: colors.inverseSurface,
    inverseOnSurface: colors.inverseOnSurface,
    inversePrimary: colors.inversePrimary,
    shadow: colors.shadow,
    scrim: colors.scrim,
    backdrop: colors.backdrop,
    elevation: {
      level0: elevationSurfaces.level0,
      level1: elevationSurfaces.level1,
      level2: elevationSurfaces.level2,
      level3: elevationSurfaces.level3,
      level4: elevationSurfaces.level4,
      level5: elevationSurfaces.level5,
    },
  },
};

export type AppTheme = MD3Theme & {
  tokens: typeof themeTokens;
};

/** Full app theme — Paper theme + design tokens for use in components. */
export const theme: AppTheme = {
  ...paperTheme,
  tokens: themeTokens,
};

export default theme;
