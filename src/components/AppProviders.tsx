import { MaterialCommunityIcons } from '@expo/vector-icons';
import { QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';

import { AppStoreHydrator } from '@/components/AppStoreHydrator';
import { queryClient } from '@/services';
import { store } from '@/store';
import { theme } from '@/theme';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <SafeAreaProvider>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <PaperProvider
            theme={theme}
            settings={{
              icon: (props) => <MaterialCommunityIcons {...props} />,
            }}
          >
            <AppStoreHydrator />
            {children}
          </PaperProvider>
        </QueryClientProvider>
      </ReduxProvider>
    </SafeAreaProvider>
  );
}
