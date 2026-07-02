import { useTheme } from 'react-native-paper';

import type { ExtendedMD3Theme } from '@/types';

export function useAppTheme(): ExtendedMD3Theme {
  return useTheme<ExtendedMD3Theme>();
}
