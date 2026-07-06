import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import SaveIcon from '@mui/icons-material/Save';
import { useForm } from 'react-hook-form';

import { PageHeader } from '@/components/common';
import { SuccessDialog } from '@/components/dialogs';

interface SettingsForm {
  platformName: string;
  supportEmail: string;
  defaultLanguage: string;
  serviceFeePercent: number;
  cancellationFee: number;
  minProviderRating: number;
  requirePoliceVerification: boolean;
  requireBankDetails: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  paymentGateway: string;
  payoutSchedule: string;
  twoFactorAuth: boolean;
  sessionTimeout: number;
  adminRole: string;
  supportRole: string;
  financeRole: string;
}

export function SettingsPage() {
  const [successOpen, setSuccessOpen] = useState(false);

  const { register, handleSubmit } = useForm<SettingsForm>({
    defaultValues: {
      platformName: 'ServiceHub',
      supportEmail: 'support@servicehub.com',
      defaultLanguage: 'English',
      serviceFeePercent: 10,
      cancellationFee: 50,
      minProviderRating: 4,
      requirePoliceVerification: true,
      requireBankDetails: true,
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      paymentGateway: 'Razorpay',
      payoutSchedule: 'Weekly',
      twoFactorAuth: true,
      sessionTimeout: 30,
      adminRole: 'Full access',
      supportRole: 'Tickets & disputes',
      financeRole: 'Payments & reports',
    },
  });

  const onSubmit = handleSubmit(() => {
    setSuccessOpen(true);
  });

  return (
    <Box component="form" onSubmit={onSubmit}>
      <PageHeader
        title="Settings"
        subtitle="Configure platform rules, fees, and admin preferences"
        action={
          <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
            Save Changes
          </Button>
        }
      />

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>
                General
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Platform Name"
                  fullWidth
                  size="small"
                  {...register('platformName')}
                />
                <TextField
                  label="Support Email"
                  fullWidth
                  size="small"
                  {...register('supportEmail')}
                />
                <TextField
                  label="Default Language"
                  fullWidth
                  size="small"
                  {...register('defaultLanguage')}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>
                Platform Fees
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Service Fee (%)"
                  type="number"
                  fullWidth
                  size="small"
                  {...register('serviceFeePercent', { valueAsNumber: true })}
                />
                <TextField
                  label="Cancellation Fee (₹)"
                  type="number"
                  fullWidth
                  size="small"
                  {...register('cancellationFee', { valueAsNumber: true })}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>
                Verification Rules
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Minimum Provider Rating"
                  type="number"
                  fullWidth
                  size="small"
                  {...register('minProviderRating', { valueAsNumber: true })}
                />
                <FormControlLabel
                  control={<Switch defaultChecked {...register('requirePoliceVerification')} />}
                  label="Require police verification"
                />
                <FormControlLabel
                  control={<Switch defaultChecked {...register('requireBankDetails')} />}
                  label="Require bank details"
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>
                Notification Settings
              </Typography>
              <Stack spacing={1}>
                <FormControlLabel
                  control={<Switch defaultChecked {...register('emailNotifications')} />}
                  label="Email notifications"
                />
                <FormControlLabel
                  control={<Switch defaultChecked {...register('pushNotifications')} />}
                  label="Push notifications"
                />
                <FormControlLabel
                  control={<Switch {...register('smsNotifications')} />}
                  label="SMS notifications"
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>
                Payment Settings
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Payment Gateway"
                  fullWidth
                  size="small"
                  {...register('paymentGateway')}
                />
                <TextField
                  label="Payout Schedule"
                  fullWidth
                  size="small"
                  {...register('payoutSchedule')}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>
                Security
              </Typography>
              <Stack spacing={2}>
                <FormControlLabel
                  control={<Switch defaultChecked {...register('twoFactorAuth')} />}
                  label="Two-factor authentication"
                />
                <TextField
                  label="Session Timeout (minutes)"
                  type="number"
                  fullWidth
                  size="small"
                  {...register('sessionTimeout', { valueAsNumber: true })}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>
                Role Management
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField label="Admin Role" fullWidth size="small" {...register('adminRole')} />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    label="Support Role"
                    fullWidth
                    size="small"
                    {...register('supportRole')}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    label="Finance Role"
                    fullWidth
                    size="small"
                    {...register('financeRole')}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Stack direction="row" justifyContent="flex-end">
        <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
          Save Changes
        </Button>
      </Stack>

      <SuccessDialog
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        message="Settings saved successfully."
      />
    </Box>
  );
}
