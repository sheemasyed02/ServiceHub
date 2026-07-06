import type { MD3Theme } from 'react-native-paper';

import type { AppButtonStyles, AppCardStyles, AppShadows } from '@/theme/theme';
import type { AppColors } from '@/theme/colors';
import type { AppGradients } from '@/theme/gradients';
import type { AppBorderRadius, AppLayout, AppSpacing } from '@/theme/spacing';
import type { AppTypography } from '@/theme/typography';

export type ThemeTokens = {
  colors: AppColors;
  gradients: AppGradients;
  spacing: AppSpacing;
  borderRadius: AppBorderRadius;
  layout: AppLayout;
  shadows: AppShadows;
  buttonStyles: AppButtonStyles;
  cardStyles: AppCardStyles;
  typography: AppTypography;
};

export type ExtendedMD3Theme = MD3Theme & {
  tokens: ThemeTokens;
};
