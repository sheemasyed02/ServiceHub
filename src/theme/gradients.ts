import { colors } from './colors';

/** Shared gradient stops — keeps hero and banners consistent app-wide. */
export const gradients = {
  hero: [colors.heroStart, colors.heroEnd] as const,
  offer: [colors.offerOverlayStart, colors.offerOverlayEnd] as const,
} as const;

export type AppGradients = typeof gradients;
