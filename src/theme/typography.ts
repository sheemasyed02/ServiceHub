import { Platform } from 'react-native';
import { configureFonts } from 'react-native-paper';

export const fontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
}) as string;

export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const fontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
  display: 34,
  hero: 40,
} as const;

export const lineHeight = {
  tight: 1.2,
  snug: 1.35,
  normal: 1.5,
  relaxed: 1.65,
} as const;

export const letterSpacing = {
  tight: -0.4,
  normal: 0,
  wide: 0.25,
  wider: 0.5,
  widest: 1.2,
} as const;

/** Raw typography tokens for custom components. */
export const typography = {
  displayLarge: {
    fontFamily,
    fontSize: fontSize.hero,
    fontWeight: fontWeight.bold,
    lineHeight: fontSize.hero * lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  displayMedium: {
    fontFamily,
    fontSize: fontSize.display,
    fontWeight: fontWeight.bold,
    lineHeight: fontSize.display * lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  headlineLarge: {
    fontFamily,
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.semibold,
    lineHeight: fontSize.xxxl * lineHeight.snug,
    letterSpacing: letterSpacing.tight,
  },
  headlineMedium: {
    fontFamily,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.semibold,
    lineHeight: fontSize.xxl * lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },
  headlineSmall: {
    fontFamily,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    lineHeight: fontSize.xl * lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },
  titleLarge: {
    fontFamily,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    lineHeight: fontSize.lg * lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },
  titleMedium: {
    fontFamily,
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    lineHeight: fontSize.base * lineHeight.normal,
    letterSpacing: letterSpacing.wide,
  },
  titleSmall: {
    fontFamily,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    lineHeight: fontSize.md * lineHeight.normal,
    letterSpacing: letterSpacing.wide,
  },
  bodyLarge: {
    fontFamily,
    fontSize: fontSize.base,
    fontWeight: fontWeight.regular,
    lineHeight: fontSize.base * lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
  },
  bodyMedium: {
    fontFamily,
    fontSize: fontSize.md,
    fontWeight: fontWeight.regular,
    lineHeight: fontSize.md * lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
  },
  bodySmall: {
    fontFamily,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
    lineHeight: fontSize.sm * lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
  },
  labelLarge: {
    fontFamily,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    lineHeight: fontSize.md * lineHeight.normal,
    letterSpacing: letterSpacing.wider,
  },
  labelMedium: {
    fontFamily,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    lineHeight: fontSize.sm * lineHeight.normal,
    letterSpacing: letterSpacing.wider,
  },
  labelSmall: {
    fontFamily,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    lineHeight: fontSize.xs * lineHeight.normal,
    letterSpacing: letterSpacing.widest,
  },
} as const;

/** React Native Paper MD3 font configuration. */
export const paperFonts = configureFonts({
  config: {
    displayLarge: typography.displayLarge,
    displayMedium: typography.displayMedium,
    displaySmall: typography.headlineLarge,
    headlineLarge: typography.headlineLarge,
    headlineMedium: typography.headlineMedium,
    headlineSmall: typography.headlineSmall,
    titleLarge: typography.titleLarge,
    titleMedium: typography.titleMedium,
    titleSmall: typography.titleSmall,
    bodyLarge: typography.bodyLarge,
    bodyMedium: typography.bodyMedium,
    bodySmall: typography.bodySmall,
    labelLarge: typography.labelLarge,
    labelMedium: typography.labelMedium,
    labelSmall: typography.labelSmall,
  },
});

export type AppTypography = typeof typography;
