import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Rating,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { PageHeader } from '@/components/common';
import { StatusChip } from '@/components/tables';
import { getBookingById } from '@/constants/mockData';
import { ROUTES } from '@/constants/routes';
import { formatCurrency } from '@/utils/format';

export function BookingDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const booking = getBookingById(id ?? '');

  if (!booking) {
    return (
      <Box textAlign="center" py={8}>
        <Typography variant="h6" gutterBottom>
          Booking not found
        </Typography>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(ROUTES.BOOKINGS)}>
          Back to Bookings
        </Button>
      </Box>
    );
  }

  const activeStep = booking.timeline.filter((t) => t.done).length - 1;

  return (
    <Box>
      <PageHeader
        title={`Booking ${booking.id}`}
        subtitle={`${booking.service} · ${booking.date}`}
        action={
          <Button
            component={Link}
            to={ROUTES.BOOKINGS}
            startIcon={<ArrowBackIcon />}
            variant="outlined"
          >
            Back
          </Button>
        }
      />

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700} mb={2}>
            Timeline
          </Typography>
          <Stepper activeStep={Math.max(activeStep, 0)} alternativeLabel>
            {booking.timeline.map((step) => (
              <Step key={step.label} completed={step.done}>
                <StepLabel
                  optional={
                    <Typography variant="caption" color="text.secondary">
                      {step.time}
                    </Typography>
                  }
                >
                  {step.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      <Grid container spacing={2} mb={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Customer
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                {booking.customer}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                ID: {booking.customerId}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Provider
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                {booking.provider}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                ID: {booking.providerId}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} mb={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Service
              </Typography>
              <Typography fontWeight={600}>{booking.service}</Typography>
              <Stack direction="row" spacing={1} mt={1.5}>
                <StatusChip
                  label={booking.status.replace('_', ' ')}
                  color={booking.status === 'completed' ? 'success' : 'warning'}
                />
                <StatusChip
                  label={booking.paymentStatus}
                  color={booking.paymentStatus === 'paid' ? 'success' : 'warning'}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Price
              </Typography>
              <Typography variant="h5" fontWeight={700} color="primary.main">
                {formatCurrency(booking.amount)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Service OTP
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <LockOutlinedIcon color="action" fontSize="small" />
                <Typography variant="h5" fontWeight={700} letterSpacing={4}>
                  {booking.otp}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} mb={1}>
            <LocationOnOutlinedIcon color="action" />
            <Typography variant="subtitle2" color="text.secondary">
              Location
            </Typography>
          </Stack>
          <Typography>{booking.location}</Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700} mb={2}>
            Payment Summary
          </Typography>
          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between">
              <Typography color="text.secondary">Service charge</Typography>
              <Typography fontWeight={600}>{formatCurrency(booking.amount)}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography color="text.secondary">Platform fee (10%)</Typography>
              <Typography fontWeight={600}>
                {formatCurrency(Math.round(booking.amount * 0.1))}
              </Typography>
            </Stack>
            <Divider />
            <Stack direction="row" justifyContent="space-between">
              <Typography fontWeight={700}>Total paid</Typography>
              <Typography fontWeight={700} color="primary.main">
                {formatCurrency(booking.amount)}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={1}>
                Review
              </Typography>
              {booking.status === 'completed' ? (
                <Stack spacing={1}>
                  <Rating value={4} readOnly />
                  <Typography color="text.secondary">
                    Customer left a positive review for this service.
                  </Typography>
                </Stack>
              ) : (
                <Typography color="text.secondary">
                  Review will be available after service completion.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                <ChatBubbleOutlineIcon color="action" />
                <Typography variant="h6" fontWeight={700}>
                  Support Chat
                </Typography>
              </Stack>
              <Box
                sx={{
                  bgcolor: 'grey.50',
                  borderRadius: 2,
                  p: 2,
                  minHeight: 120,
                  border: 1,
                  borderColor: 'divider',
                }}
              >
                <Typography color="text.secondary" variant="body2">
                  Support chat placeholder — connect customer and provider for dispute resolution.
                </Typography>
              </Box>
              <TextField
                fullWidth
                size="small"
                placeholder="Type a message..."
                sx={{ mt: 1.5 }}
                disabled
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
