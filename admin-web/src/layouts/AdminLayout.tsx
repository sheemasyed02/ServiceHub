import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';

export function AdminLayout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar />
      <TopNavbar />
      <Box component="main" sx={{ flex: 1, p: { xs: 2, md: 3 }, pt: { xs: 10, md: 12 } }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
