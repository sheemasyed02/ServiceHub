import { Platform } from 'react-native';

const ARIAL = Platform.select({
  ios: 'Arial',
  android: 'sans-serif',
  default: 'Arial',
}) as string;

export const appFontFamily = {
  regular: ARIAL,
  medium: ARIAL,
  semibold: ARIAL,
  bold: ARIAL,
} as const;

export const appFonts = {};
