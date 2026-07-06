import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import HandymanIcon from '@mui/icons-material/Handyman';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PaymentsIcon from '@mui/icons-material/Payments';
import StarIcon from '@mui/icons-material/Star';
import CategoryIcon from '@mui/icons-material/Category';
import AssessmentIcon from '@mui/icons-material/Assessment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GavelIcon from '@mui/icons-material/Gavel';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SettingsIcon from '@mui/icons-material/Settings';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LogoutIcon from '@mui/icons-material/Logout';
import type { SvgIconComponent } from '@mui/icons-material';

import { ROUTES } from './routes';

export type MenuItem = {
  label: string;
  path: string;
  icon: SvgIconComponent;
};

export const SIDEBAR_MENU: MenuItem[] = [
  { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: DashboardIcon },
  { label: 'Users', path: ROUTES.USERS, icon: PeopleIcon },
  { label: 'Providers', path: ROUTES.PROVIDERS, icon: HandymanIcon },
  { label: 'Verification', path: ROUTES.PROVIDER_VERIFICATION, icon: VerifiedUserIcon },
  { label: 'Bookings', path: ROUTES.BOOKINGS, icon: EventNoteIcon },
  { label: 'Payments', path: ROUTES.PAYMENTS, icon: PaymentsIcon },
  { label: 'Reviews', path: ROUTES.REVIEWS, icon: StarIcon },
  { label: 'Categories', path: ROUTES.CATEGORIES, icon: CategoryIcon },
  { label: 'Reports', path: ROUTES.REPORTS, icon: AssessmentIcon },
  { label: 'Notifications', path: ROUTES.NOTIFICATIONS, icon: NotificationsIcon },
  { label: 'Disputes', path: ROUTES.DISPUTES, icon: GavelIcon },
  { label: 'Support', path: ROUTES.SUPPORT, icon: SupportAgentIcon },
  { label: 'Settings', path: ROUTES.SETTINGS, icon: SettingsIcon },
];

export const LOGOUT_ITEM: MenuItem = {
  label: 'Logout',
  path: '/login',
  icon: LogoutIcon,
};
