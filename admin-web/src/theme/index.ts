import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#9A7B18',
      dark: '#7A6212',
      light: '#C4A020',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#111827',
    },
    background: {
      default: '#F3F4F6',
      paper: '#FFFFFF',
    },
    success: { main: '#16A34A' },
    warning: { main: '#EA580C' },
    error: { main: '#DC2626' },
    divider: '#E5E7EB',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600, borderRadius: 10 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: '1px solid #E5E7EB' },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
  },
});
