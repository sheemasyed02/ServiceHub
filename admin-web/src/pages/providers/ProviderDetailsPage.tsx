import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { PageHeader } from '@/components/common';
import {
  ApprovalDialog,
  ConfirmationDialog,
  RejectDialog,
  SuccessDialog,
} from '@/components/dialogs';
import { StatusChip } from '@/components/tables';
import { getProviderById } from '@/constants/mockData';
import { ROUTES } from '@/constants/routes';
import { formatCurrency } from '@/utils/format';

export function ProviderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const provider = getProviderById(id ?? '');

  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [changesOpen, setChangesOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  if (!provider) {
    return (
      <Box textAlign="center" py={8}>
        <Typography variant="h6" gutterBottom>
          Provider not found
        </Typography>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(ROUTES.PROVIDERS)}>
          Back to Providers
        </Button>
      </Box>
    );
  }

  const policeColor =
    provider.documents.policeVerification === 'verified'
      ? 'success'
      : provider.documents.policeVerification === 'rejected'
        ? 'error'
        : 'warning';

  return (
    <Box>
      <PageHeader
        title={provider.name}
        subtitle={`${provider.category} · ${provider.email}`}
        action={
          <Button
            component={Link}
            to={ROUTES.PROVIDERS}
            startIcon={<ArrowBackIcon />}
            variant="outlined"
          >
            Back
          </Button>
        }
      />

      <Grid container spacing={2} mb={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Stack alignItems="center" spacing={2}>
                <Avatar src={provider.avatar} sx={{ width: 96, height: 96 }} />
                <Box textAlign="center">
                  <Typography variant="h6" fontWeight={700}>
                    {provider.name}
                  </Typography>
                  <Typography color="text.secondary">{provider.phone}</Typography>
                  <Stack direction="row" spacing={1} justifyContent="center" mt={1}>
                    <StatusChip
                      label={provider.verificationStatus.replace('_', ' ')}
                      color={policeColor}
                    />
                    <StatusChip
                      label={provider.status}
                      color={provider.status === 'active' ? 'success' : 'default'}
                    />
                  </Stack>
                </Box>
                <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center">
                  <Chip label={`${provider.rating} ★`} size="small" />
                  <Chip label={`${provider.jobsCompleted} jobs`} size="small" />
                  <Chip label={formatCurrency(provider.revenue)} size="small" />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Address
                  </Typography>
                  <Typography>{provider.address}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Experience
                  </Typography>
                  <Typography>{provider.experience}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Skills
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" gap={0.5}>
                    {provider.skills.map((skill) => (
                      <Chip key={skill} label={skill} size="small" variant="outlined" />
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Certificates
                  </Typography>
                  <Stack spacing={0.5}>
                    {provider.certificates.map((cert) => (
                      <Typography key={cert} variant="body2">
                        • {cert}
                      </Typography>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700} mb={2}>
            Document Previews
          </Typography>
          <ImageList cols={3} gap={12} sx={{ m: 0 }}>
            <ImageListItem>
              <Box>
                <Typography variant="caption" fontWeight={600} display="block" mb={0.5}>
                  Aadhaar
                </Typography>
                <Box
                  component="img"
                  src={provider.documents.aadhaar}
                  alt="Aadhaar"
                  sx={{ width: '100%', borderRadius: 2, border: 1, borderColor: 'divider' }}
                />
              </Box>
            </ImageListItem>
            <ImageListItem>
              <Box>
                <Typography variant="caption" fontWeight={600} display="block" mb={0.5}>
                  PAN
                </Typography>
                <Box
                  component="img"
                  src={provider.documents.pan}
                  alt="PAN"
                  sx={{ width: '100%', borderRadius: 2, border: 1, borderColor: 'divider' }}
                />
              </Box>
            </ImageListItem>
            <ImageListItem>
              <Box>
                <Typography variant="caption" fontWeight={600} display="block" mb={0.5}>
                  Selfie
                </Typography>
                <Box
                  component="img"
                  src={provider.documents.selfie}
                  alt="Selfie"
                  sx={{ width: '100%', borderRadius: 2, border: 1, borderColor: 'divider' }}
                />
              </Box>
            </ImageListItem>
          </ImageList>
        </CardContent>
      </Card>

      <Grid container spacing={2} mb={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Police Verification
              </Typography>
              <StatusChip label={provider.documents.policeVerification} color={policeColor} />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Bank Details
              </Typography>
              <Typography fontWeight={600}>{provider.documents.bankDetails}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
        <Button
          variant="contained"
          color="success"
          startIcon={<CheckCircleOutlineIcon />}
          onClick={() => setApproveOpen(true)}
        >
          Approve
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<CancelOutlinedIcon />}
          onClick={() => setRejectOpen(true)}
        >
          Reject
        </Button>
        <Button
          variant="outlined"
          startIcon={<EditNoteIcon />}
          onClick={() => setChangesOpen(true)}
        >
          Request Changes
        </Button>
      </Stack>

      <ApprovalDialog
        open={approveOpen}
        onClose={() => setApproveOpen(false)}
        title="Approve Provider"
        message={`Approve ${provider.name} and mark all documents as verified?`}
        onConfirm={() => {
          setApproveOpen(false);
          setSuccessMessage(`${provider.name} approved successfully.`);
          setSuccessOpen(true);
        }}
      />

      <RejectDialog
        open={rejectOpen}
        onClose={() => setRejectOpen(false)}
        title="Reject Provider"
        message={`Reject ${provider.name}'s application?`}
        onConfirm={() => {
          setRejectOpen(false);
          setSuccessMessage(`${provider.name} application rejected.`);
          setSuccessOpen(true);
        }}
      />

      <ConfirmationDialog
        open={changesOpen}
        onClose={() => setChangesOpen(false)}
        title="Request Changes"
        message={`Send a change request to ${provider.name} for document resubmission?`}
        confirmLabel="Send Request"
        onConfirm={() => {
          setChangesOpen(false);
          setSuccessMessage('Change request sent to provider.');
          setSuccessOpen(true);
        }}
      />

      <SuccessDialog
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        message={successMessage}
      />
    </Box>
  );
}
