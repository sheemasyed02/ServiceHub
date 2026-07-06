import { useMemo, useState } from 'react';
import { Box, Card, CardContent, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { PageHeader } from '@/components/common';
import { BOOKING_TREND, REVENUE_CHART } from '@/constants/mockData';
import { formatCurrency, formatNumber } from '@/utils/format';

type Period = 'week' | 'month' | 'year';

const PERIOD_MULTIPLIER: Record<Period, number> = { week: 0.25, month: 1, year: 3.5 };

const TOP_SERVICES = [
  { name: 'Plumbing', value: 420 },
  { name: 'Electrical', value: 380 },
  { name: 'Cleaning', value: 310 },
  { name: 'AC Repair', value: 240 },
  { name: 'Painting', value: 180 },
];

const TOP_PROVIDERS = [
  { name: 'Rajesh K.', value: 520 },
  { name: 'Suresh P.', value: 410 },
  { name: 'Meera S.', value: 680 },
  { name: 'Vikram R.', value: 290 },
  { name: 'Anita D.', value: 350 },
];

const USER_GROWTH = [
  { label: 'Jan', value: 8200 },
  { label: 'Feb', value: 9100 },
  { label: 'Mar', value: 9800 },
  { label: 'Apr', value: 10500 },
  { label: 'May', value: 11600 },
  { label: 'Jun', value: 12840 },
];

const CANCELLATION_DATA = [
  { name: 'Completed', value: 78 },
  { name: 'Cancelled', value: 12 },
  { name: 'No-show', value: 10 },
];

const PIE_COLORS = ['#16A34A', '#DC2626', '#EA580C'];

export function ReportsPage() {
  const [period, setPeriod] = useState<Period>('month');

  const multiplier = PERIOD_MULTIPLIER[period];

  const bookingData = useMemo(
    () => BOOKING_TREND.map((d) => ({ ...d, value: Math.round(d.value * multiplier) })),
    [multiplier],
  );

  const revenueData = useMemo(
    () => REVENUE_CHART.map((d) => ({ ...d, value: Math.round(d.value * multiplier) })),
    [multiplier],
  );

  const servicesData = useMemo(
    () => TOP_SERVICES.map((d) => ({ ...d, value: Math.round(d.value * multiplier) })),
    [multiplier],
  );

  const providersData = useMemo(
    () => TOP_PROVIDERS.map((d) => ({ ...d, value: Math.round(d.value * multiplier) })),
    [multiplier],
  );

  const userGrowthData = useMemo(
    () =>
      USER_GROWTH.map((d) => ({
        ...d,
        value: Math.round(d.value * (period === 'year' ? 1.2 : period === 'week' ? 0.3 : 1)),
      })),
    [period],
  );

  return (
    <Box>
      <PageHeader
        title="Reports & Analytics"
        subtitle="Platform insights across bookings, revenue, and growth"
        action={
          <ToggleButtonGroup
            exclusive
            value={period}
            onChange={(_, v) => v && setPeriod(v)}
            size="small"
          >
            <ToggleButton value="week">Week</ToggleButton>
            <ToggleButton value="month">Month</ToggleButton>
            <ToggleButton value="year">Year</ToggleButton>
          </ToggleButtonGroup>
        }
      />

      <Grid container spacing={2} mb={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: 340 }}>
            <CardContent sx={{ height: '100%' }}>
              <Typography variant="h6" fontWeight={700} mb={2}>
                Bookings Trend
              </Typography>
              <ResponsiveContainer width="100%" height="85%">
                <LineChart data={bookingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(v) => formatNumber(Number(v))} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2563EB"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: 340 }}>
            <CardContent sx={{ height: '100%' }}>
              <Typography variant="h6" fontWeight={700} mb={2}>
                Revenue
              </Typography>
              <ResponsiveContainer width="100%" height="85%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip formatter={(v) => formatCurrency(Number(v))} />
                  <Bar dataKey="value" fill="#9A7B18" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} mb={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: 340 }}>
            <CardContent sx={{ height: '100%' }}>
              <Typography variant="h6" fontWeight={700} mb={2}>
                Top Services
              </Typography>
              <ResponsiveContainer width="100%" height="85%">
                <BarChart data={servicesData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#7C3AED" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: 340 }}>
            <CardContent sx={{ height: '100%' }}>
              <Typography variant="h6" fontWeight={700} mb={2}>
                Top Providers
              </Typography>
              <ResponsiveContainer width="100%" height="85%">
                <BarChart data={providersData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#059669" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ height: 340 }}>
            <CardContent sx={{ height: '100%' }}>
              <Typography variant="h6" fontWeight={700} mb={2}>
                User Growth
              </Typography>
              <ResponsiveContainer width="100%" height="85%">
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => formatNumber(v)} />
                  <Tooltip formatter={(v) => formatNumber(Number(v))} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    name="Users"
                    stroke="#9A7B18"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: 340 }}>
            <CardContent sx={{ height: '100%' }}>
              <Typography variant="h6" fontWeight={700} mb={2}>
                Cancellation Rate
              </Typography>
              <ResponsiveContainer width="100%" height="85%">
                <PieChart>
                  <Pie
                    data={CANCELLATION_DATA}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label
                  >
                    {CANCELLATION_DATA.map((_, index) => (
                      <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
