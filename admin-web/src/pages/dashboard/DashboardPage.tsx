import {
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import PeopleIcon from '@mui/icons-material/People';
import HandymanIcon from '@mui/icons-material/Handyman';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PaymentsIcon from '@mui/icons-material/Payments';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { type ColumnDef } from '@tanstack/react-table';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Link } from 'react-router-dom';

import { PageHeader, StatCard } from '@/components/common';
import { DataTable, StatusChip } from '@/components/tables';
import {
  BOOKING_TREND,
  DASHBOARD_STATS,
  MOCK_ACTIVITIES,
  MOCK_BOOKINGS,
  MOCK_CUSTOMERS,
  REVENUE_CHART,
} from '@/constants/mockData';
import { ROUTES } from '@/constants/routes';
import type { Booking, Customer } from '@/types';
import { formatCurrency, formatNumber } from '@/utils/format';

const activityIcons = {
  user: PersonAddIcon,
  provider: HandymanIcon,
  booking: BookOnlineIcon,
  payment: AccountBalanceWalletIcon,
} as const;

const customerColumns: ColumnDef<Customer & Record<string, unknown>, unknown>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'phone', header: 'Phone' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      const color =
        status === 'active'
          ? 'success'
          : status === 'suspended'
            ? 'error'
            : status === 'pending'
              ? 'warning'
              : 'default';
      return <StatusChip label={status} color={color} />;
    },
  },
  { accessorKey: 'joinedAt', header: 'Joined' },
];

const bookingColumns: ColumnDef<Booking & Record<string, unknown>, unknown>[] = [
  { accessorKey: 'id', header: 'Booking ID' },
  { accessorKey: 'customer', header: 'Customer' },
  { accessorKey: 'provider', header: 'Provider' },
  { accessorKey: 'service', header: 'Service' },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => formatCurrency(row.original.amount),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      const color =
        status === 'completed'
          ? 'success'
          : status === 'cancelled'
            ? 'error'
            : status === 'in_progress'
              ? 'info'
              : 'warning';
      return <StatusChip label={status.replace('_', ' ')} color={color} />;
    },
  },
];

export function DashboardPage() {
  return (
    <Box>
      <PageHeader
        title="Dashboard"
        subtitle="Overview of platform performance and recent activity"
      />

      <Grid container spacing={2} mb={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
          <StatCard
            label="Total Users"
            value={formatNumber(DASHBOARD_STATS.totalUsers)}
            icon={PeopleIcon}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
          <StatCard
            label="Providers"
            value={formatNumber(DASHBOARD_STATS.totalProviders)}
            icon={HandymanIcon}
            accent="#2563EB"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
          <StatCard
            label="Verified"
            value={formatNumber(DASHBOARD_STATS.verifiedProviders)}
            icon={VerifiedUserIcon}
            accent="#16A34A"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
          <StatCard
            label="Pending Verification"
            value={formatNumber(DASHBOARD_STATS.pendingVerification)}
            icon={PendingActionsIcon}
            accent="#EA580C"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
          <StatCard
            label="Today's Bookings"
            value={formatNumber(DASHBOARD_STATS.todayBookings)}
            icon={EventAvailableIcon}
            accent="#7C3AED"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
          <StatCard
            label="Revenue"
            value={formatCurrency(DASHBOARD_STATS.revenue)}
            icon={PaymentsIcon}
            accent="#059669"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} mb={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: 360 }}>
            <CardContent sx={{ height: '100%' }}>
              <Typography variant="h6" fontWeight={700} mb={2}>
                Monthly Revenue
              </Typography>
              <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={REVENUE_CHART}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#9A7B18" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#9A7B18" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#9A7B18"
                    fill="url(#revenueGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: 360 }}>
            <CardContent sx={{ height: '100%' }}>
              <Typography variant="h6" fontWeight={700} mb={2}>
                Booking Trend (This Week)
              </Typography>
              <ResponsiveContainer width="100%" height="85%">
                <LineChart data={BOOKING_TREND}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2563EB"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} mb={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={1}>
                Latest Activities
              </Typography>
              <List disablePadding>
                {MOCK_ACTIVITIES.map((activity) => {
                  const Icon = activityIcons[activity.type];
                  return (
                    <ListItem key={activity.id} disableGutters sx={{ py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Icon fontSize="small" color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={activity.message} secondary={activity.time} />
                    </ListItem>
                  );
                })}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <DataTable
            title="Recent Registrations"
            data={MOCK_CUSTOMERS.slice(0, 4) as (Customer & Record<string, unknown>)[]}
            columns={customerColumns}
            searchPlaceholder="Search users..."
            exportFilename="recent-registrations.csv"
          />
          <Box mt={2} textAlign="right">
            <Typography
              component={Link}
              to={ROUTES.USERS}
              color="primary"
              fontWeight={600}
              sx={{ textDecoration: 'none' }}
            >
              View all users →
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <DataTable
        title="Recent Bookings"
        data={MOCK_BOOKINGS as (Booking & Record<string, unknown>)[]}
        columns={bookingColumns}
        searchPlaceholder="Search bookings..."
        exportFilename="recent-bookings.csv"
      />
      <Box mt={2} textAlign="right">
        <Typography
          component={Link}
          to={ROUTES.BOOKINGS}
          color="primary"
          fontWeight={600}
          sx={{ textDecoration: 'none' }}
        >
          View all bookings →
        </Typography>
      </Box>
    </Box>
  );
}
