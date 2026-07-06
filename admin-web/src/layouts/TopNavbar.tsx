import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { COLLAPSED_WIDTH, DRAWER_WIDTH } from '@/layouts/Sidebar';
import { useAppDispatch, useAppSelector, toggleSidebar, setMobileSidebarOpen } from '@/store';

export function TopNavbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useAppDispatch();
  const { sidebarCollapsed } = useAppSelector((s) => s.ui);
  const navigate = useNavigate();

  const sidebarWidth = isMobile ? 0 : sidebarCollapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: `calc(100% - ${sidebarWidth}px)`,
        ml: `${sidebarWidth}px`,
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderBottom: 1,
        borderColor: 'divider',
        transition: theme.transitions.create(['width', 'margin']),
      }}
    >
      <Toolbar sx={{ gap: 2 }}>
        <IconButton
          onClick={() =>
            isMobile ? dispatch(setMobileSidebarOpen(true)) : dispatch(toggleSidebar())
          }
          edge="start"
        >
          {sidebarCollapsed && !isMobile ? <MenuIcon /> : <MenuOpenIcon />}
        </IconButton>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'grey.100',
            borderRadius: 2,
            px: 1.5,
            py: 0.75,
            flex: 1,
            maxWidth: 420,
          }}
        >
          <SearchIcon fontSize="small" color="action" />
          <InputBase placeholder="Search dashboard..." sx={{ ml: 1, flex: 1, fontSize: 14 }} />
        </Box>

        <Stack direction="row" alignItems="center" spacing={1} ml="auto">
          <IconButton>
            <Badge badgeContent={4} color="error">
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate(ROUTES.PROFILE)}
          >
            <Box textAlign="right" display={{ xs: 'none', sm: 'block' }}>
              <Typography variant="body2" fontWeight={700}>
                Sarah Admin
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Super Admin
              </Typography>
            </Box>
            <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main' }}>SA</Avatar>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
