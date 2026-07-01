import { MaterialCommunityIcons } from '@expo/vector-icons';
import { QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';

import { queryClient } from '@/services';
import { store } from '@/store';
import { theme } from '@/theme';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider
          theme={theme}
          settings={{
            icon: (props) => <MaterialCommunityIcons {...props} />,
          }}
        >
          {children}
        </PaperProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
}
