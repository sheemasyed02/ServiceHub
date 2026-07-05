import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';

import { LOGOUT_ITEM, SIDEBAR_MENU } from '@/constants/menu';
import { useAppDispatch, useAppSelector, setMobileSidebarOpen } from '@/store';

const DRAWER_WIDTH = 260;
const COLLAPSED_WIDTH = 76;

export function Sidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useAppDispatch();
  const { sidebarCollapsed, mobileSidebarOpen } = useAppSelector((s) => s.ui);
  const navigate = useNavigate();

  const width = isMobile ? DRAWER_WIDTH : sidebarCollapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH;

  const content = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ px: 2, minHeight: 72 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 2,
            bgcolor: 'primary.main',
            mr: sidebarCollapsed && !isMobile ? 0 : 1.5,
          }}
        />
        {(!sidebarCollapsed || isMobile) && (
          <Typography variant="h6" fontWeight={800} color="primary.dark">
            ServiceHub
          </Typography>
        )}
      </Toolbar>
      <Divider />
      <List sx={{ flex: 1, px: 1, py: 1 }}>
        {SIDEBAR_MENU.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            end={item.path === '/'}
            onClick={() => isMobile && dispatch(setMobileSidebarOpen(false))}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              '&.active': {
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                '& .MuiListItemIcon-root': { color: 'inherit' },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
              <item.icon fontSize="small" />
            </ListItemIcon>
            {(!sidebarCollapsed || isMobile) && (
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontWeight: 600, fontSize: 14 }}
              />
            )}
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <List sx={{ px: 1, py: 1 }}>
        <ListItemButton onClick={() => navigate(LOGOUT_ITEM.path)} sx={{ borderRadius: 2 }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <LOGOUT_ITEM.icon fontSize="small" />
          </ListItemIcon>
          {(!sidebarCollapsed || isMobile) && <ListItemText primary="Logout" />}
        </ListItemButton>
      </List>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={mobileSidebarOpen}
        onClose={() => dispatch(setMobileSidebarOpen(false))}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: DRAWER_WIDTH } }}
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
          transition: theme.transitions.create('width'),
        },
      }}
    >
      {content}
    </Drawer>
  );
}

export { DRAWER_WIDTH, COLLAPSED_WIDTH };
