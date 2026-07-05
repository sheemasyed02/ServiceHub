import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { queryClient } from '@/services/queryClient';
import { store } from '@/store';
import { theme } from '@/theme';
import { AppRoutes } from '@/routes';

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}
