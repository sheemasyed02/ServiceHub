import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import SaveIcon from '@mui/icons-material/Save';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from 'react-hook-form';

import { PageHeader } from '@/components/common';
import { SuccessDialog } from '@/components/dialogs';

interface ProfileForm {
  name: string;
  email: string;
  role: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ACTIVITY_LOG = [
  { id: '1', action: 'Updated provider verification rules', time: 'Today, 10:30 AM' },
  { id: '2', action: 'Approved provider Rajesh Kumar', time: 'Yesterday, 4:15 PM' },
  { id: '3', action: 'Resolved dispute D-101', time: 'Jul 3, 2026' },
  { id: '4', action: 'Exported payments report', time: 'Jul 2, 2026' },
];

const LOGIN_HISTORY = [
  {
    id: '1',
    device: 'Chrome · Windows',
    location: 'Bengaluru, IN',
    time: 'Today, 9:00 AM',
    current: true,
  },
  {
    id: '2',
    device: 'Safari · iPhone',
    location: 'Bengaluru, IN',
    time: 'Jul 4, 2026',
    current: false,
  },
  {
    id: '3',
    device: 'Chrome · Windows',
    location: 'Mumbai, IN',
    time: 'Jun 28, 2026',
    current: false,
  },
];

export function ProfilePage() {
  const [successOpen, setSuccessOpen] = useState(false);

  const { register, handleSubmit } = useForm<ProfileForm>({
    defaultValues: {
      name: 'Sarah Admin',
      email: 'sarah.admin@servicehub.com',
      role: 'Super Admin',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = handleSubmit(() => {
    setSuccessOpen(true);
  });

  return (
    <Box component="form" onSubmit={onSubmit}>
      <PageHeader
        title="Profile"
        subtitle="Manage your admin account and security settings"
        action={
          <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
            Save Profile
          </Button>
        }
      />

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Stack alignItems="center" spacing={2}>
                <Avatar
                  src="https://i.pravatar.cc/150?u=sarah-admin"
                  sx={{ width: 96, height: 96 }}
                />
                <Box textAlign="center">
                  <Typography variant="h6" fontWeight={700}>
                    Sarah Admin
                  </Typography>
                  <Typography color="text.secondary">Super Admin</Typography>
                </Box>
                <Button variant="outlined" size="small">
                  Change Photo
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>
                Account Details
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField label="Full Name" fullWidth size="small" {...register('name')} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField label="Email" fullWidth size="small" {...register('email')} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField label="Role" fullWidth size="small" disabled {...register('role')} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <LockOutlinedIcon color="action" />
                <Typography variant="h6" fontWeight={700}>
                  Change Password
                </Typography>
              </Stack>
              <Grid container spacing={2}>
                <Grid size={12}>
                  <TextField
                    label="Current Password"
                    type="password"
                    fullWidth
                    size="small"
                    {...register('currentPassword')}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="New Password"
                    type="password"
                    fullWidth
                    size="small"
                    {...register('newPassword')}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    size="small"
                    {...register('confirmPassword')}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={1}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={1}>
                Activity Log
              </Typography>
              <List disablePadding>
                {ACTIVITY_LOG.map((item, index) => (
                  <Box key={item.id}>
                    <ListItem disableGutters>
                      <ListItemText primary={item.action} secondary={item.time} />
                    </ListItem>
                    {index < ACTIVITY_LOG.length - 1 ? <Divider /> : null}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={1}>
                Login History
              </Typography>
              <List disablePadding>
                {LOGIN_HISTORY.map((item, index) => (
                  <Box key={item.id}>
                    <ListItem disableGutters>
                      <ListItemText
                        primary={
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography fontWeight={600}>{item.device}</Typography>
                            {item.current ? (
                              <Typography variant="caption" color="success.main" fontWeight={600}>
                                Current
                              </Typography>
                            ) : null}
                          </Stack>
                        }
                        secondary={`${item.location} · ${item.time}`}
                      />
                    </ListItem>
                    {index < LOGIN_HISTORY.length - 1 ? <Divider /> : null}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Stack direction="row" justifyContent="flex-end" mt={3}>
        <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
          Save Profile
        </Button>
      </Stack>

      <SuccessDialog
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        message="Profile updated successfully."
      />
    </Box>
  );
}
