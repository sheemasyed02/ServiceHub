import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SendIcon from '@mui/icons-material/Send';
import { useForm } from 'react-hook-form';

import { PageHeader } from '@/components/common';
import { DeleteDialog, SuccessDialog } from '@/components/dialogs';
import { StatusChip } from '@/components/tables';
import { MOCK_NOTIFICATIONS } from '@/constants/mockData';
import type { NotificationItem } from '@/types';

type PushForm = { title: string; message: string; audience: string; scheduleDate: string };
type EmailForm = { subject: string; body: string; audience: string; scheduleDate: string };

function notificationColor(status: NotificationItem['status']) {
  if (status === 'sent') return 'success';
  if (status === 'scheduled') return 'info';
  return 'default';
}

export function NotificationsPage() {
  const [announcements, setAnnouncements] = useState(
    MOCK_NOTIFICATIONS.filter((n) => n.type === 'announcement'),
  );
  const [deleteTarget, setDeleteTarget] = useState<NotificationItem | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const pushForm = useForm<PushForm>({
    defaultValues: { title: '', message: '', audience: 'All users', scheduleDate: '' },
  });

  const emailForm = useForm<EmailForm>({
    defaultValues: { subject: '', body: '', audience: 'Customers', scheduleDate: '' },
  });

  const handleDelete = () => {
    if (!deleteTarget) return;
    setAnnouncements((prev) => prev.filter((n) => n.id !== deleteTarget.id));
    setDeleteTarget(null);
    setSuccessMessage('Announcement deleted.');
    setSuccessOpen(true);
  };

  const onPushSubmit = pushForm.handleSubmit((data) => {
    setSuccessMessage(
      `Push notification "${data.title}" ${data.scheduleDate ? 'scheduled' : 'sent'}.`,
    );
    setSuccessOpen(true);
    pushForm.reset();
  });

  const onEmailSubmit = emailForm.handleSubmit((data) => {
    setSuccessMessage(`Email "${data.subject}" ${data.scheduleDate ? 'scheduled' : 'queued'}.`);
    setSuccessOpen(true);
    emailForm.reset();
  });

  return (
    <Box>
      <PageHeader
        title="Notifications"
        subtitle="Manage announcements, push notifications, and email campaigns"
      />

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 5 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>
                Announcements
              </Typography>
              <List disablePadding>
                {announcements.map((item) => (
                  <Box key={item.id}>
                    <ListItem
                      disableGutters
                      secondaryAction={
                        <Stack direction="row">
                          <IconButton
                            size="small"
                            onClick={() => {
                              setSuccessMessage(`Edit "${item.title}" — form would open here.`);
                              setSuccessOpen(true);
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" onClick={() => setDeleteTarget(item)}>
                            <DeleteOutlineIcon fontSize="small" color="error" />
                          </IconButton>
                        </Stack>
                      }
                    >
                      <ListItemText
                        primary={
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography fontWeight={600}>{item.title}</Typography>
                            <StatusChip
                              label={item.status}
                              color={notificationColor(item.status)}
                            />
                          </Stack>
                        }
                        secondary={`${item.audience} · ${item.scheduledAt === '-' ? 'Draft' : item.scheduledAt}`}
                      />
                    </ListItem>
                    <Divider />
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 7 }}>
          <Stack spacing={2}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <Chip label="Push" size="small" color="primary" />
                  <Typography variant="h6" fontWeight={700}>
                    Push Notification Builder
                  </Typography>
                </Stack>
                <Stack component="form" spacing={2} onSubmit={onPushSubmit}>
                  <TextField
                    label="Title"
                    fullWidth
                    size="small"
                    {...pushForm.register('title', { required: true })}
                  />
                  <TextField
                    label="Message"
                    fullWidth
                    multiline
                    rows={3}
                    size="small"
                    {...pushForm.register('message', { required: true })}
                  />
                  <TextField
                    label="Audience"
                    fullWidth
                    size="small"
                    {...pushForm.register('audience')}
                  />
                  <TextField
                    label="Schedule (optional)"
                    type="date"
                    fullWidth
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    {...pushForm.register('scheduleDate')}
                  />
                  <Button type="submit" variant="contained" startIcon={<SendIcon />}>
                    Send / Schedule
                  </Button>
                </Stack>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <Chip label="Email" size="small" color="secondary" />
                  <Typography variant="h6" fontWeight={700}>
                    Email Campaign Builder
                  </Typography>
                </Stack>
                <Stack component="form" spacing={2} onSubmit={onEmailSubmit}>
                  <TextField
                    label="Subject"
                    fullWidth
                    size="small"
                    {...emailForm.register('subject', { required: true })}
                  />
                  <TextField
                    label="Body"
                    fullWidth
                    multiline
                    rows={4}
                    size="small"
                    {...emailForm.register('body', { required: true })}
                  />
                  <TextField
                    label="Audience"
                    fullWidth
                    size="small"
                    {...emailForm.register('audience')}
                  />
                  <TextField
                    label="Schedule (optional)"
                    type="date"
                    fullWidth
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    {...emailForm.register('scheduleDate')}
                  />
                  <Button type="submit" variant="contained" startIcon={<SendIcon />}>
                    Send / Schedule
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      <DeleteDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Delete Announcement"
        message={deleteTarget ? `Delete "${deleteTarget.title}"?` : ''}
        onConfirm={handleDelete}
      />

      <SuccessDialog
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        message={successMessage}
      />
    </Box>
  );
}
