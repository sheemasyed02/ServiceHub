import { useMemo, useState } from 'react';
import { Avatar, Box, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { type ColumnDef } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import { PageHeader } from '@/components/common';
import { ApprovalDialog, RejectDialog, SuccessDialog } from '@/components/dialogs';
import { ActionIconButton, DataTable, StatusChip } from '@/components/tables';
import { MOCK_PROVIDERS } from '@/constants/mockData';
import type { Provider, VerificationStatus } from '@/types';

function verificationColor(status: VerificationStatus) {
  if (status === 'verified') return 'success';
  if (status === 'rejected') return 'error';
  if (status === 'changes_requested') return 'info';
  return 'warning';
}

export function ProviderVerificationPage() {
  const navigate = useNavigate();
  const [providers, setProviders] = useState(MOCK_PROVIDERS);
  const [statusFilter, setStatusFilter] = useState<'all' | VerificationStatus>('all');
  const [approveTarget, setApproveTarget] = useState<Provider | null>(null);
  const [rejectTarget, setRejectTarget] = useState<Provider | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const filteredData = useMemo(
    () =>
      statusFilter === 'all'
        ? providers
        : providers.filter((p) => p.verificationStatus === statusFilter),
    [providers, statusFilter],
  );

  const columns = useMemo<ColumnDef<Provider & Record<string, unknown>, unknown>[]>(
    () => [
      {
        accessorKey: 'avatar',
        header: 'Profile',
        enableSorting: false,
        cell: ({ row }) => (
          <Avatar
            src={row.original.avatar}
            alt={row.original.name}
            sx={{ width: 36, height: 36 }}
          />
        ),
      },
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'phone', header: 'Phone' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'category', header: 'Category' },
      {
        accessorKey: 'verificationStatus',
        header: 'Verification Status',
        cell: ({ row }) => (
          <StatusChip
            label={row.original.verificationStatus.replace('_', ' ')}
            color={verificationColor(row.original.verificationStatus)}
          />
        ),
      },
      { accessorKey: 'submittedAt', header: 'Submitted Date' },
      {
        id: 'actions',
        header: 'Actions',
        enableSorting: false,
        cell: ({ row }) => (
          <Stack direction="row" spacing={0.5}>
            <ActionIconButton onClick={() => navigate(`/providers/${row.original.id}`)}>
              <VisibilityIcon fontSize="small" />
            </ActionIconButton>
            <ActionIconButton
              onClick={() => setApproveTarget(row.original)}
              disabled={row.original.verificationStatus === 'verified'}
            >
              <CheckCircleOutlineIcon fontSize="small" color="success" />
            </ActionIconButton>
            <ActionIconButton
              onClick={() => setRejectTarget(row.original)}
              disabled={row.original.verificationStatus === 'rejected'}
            >
              <CancelOutlinedIcon fontSize="small" color="error" />
            </ActionIconButton>
          </Stack>
        ),
      },
    ],
    [navigate],
  );

  const handleApprove = () => {
    if (!approveTarget) return;
    setProviders((prev) =>
      prev.map((p) =>
        p.id === approveTarget.id ? { ...p, verificationStatus: 'verified' as const } : p,
      ),
    );
    setApproveTarget(null);
    setSuccessMessage(`${approveTarget.name} has been approved.`);
    setSuccessOpen(true);
  };

  const handleReject = () => {
    if (!rejectTarget) return;
    setProviders((prev) =>
      prev.map((p) =>
        p.id === rejectTarget.id ? { ...p, verificationStatus: 'rejected' as const } : p,
      ),
    );
    setRejectTarget(null);
    setSuccessMessage(`${rejectTarget.name} verification rejected.`);
    setSuccessOpen(true);
  };

  return (
    <Box>
      <PageHeader
        title="Provider Verification"
        subtitle="Review and approve provider onboarding requests"
      />

      <DataTable
        data={filteredData as (Provider & Record<string, unknown>)[]}
        columns={columns}
        searchPlaceholder="Search pending providers..."
        exportFilename="provider-verification.csv"
        toolbarExtra={
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Status</InputLabel>
            <Select
              label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            >
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="verified">Verified</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
              <MenuItem value="changes_requested">Changes Requested</MenuItem>
            </Select>
          </FormControl>
        }
      />

      <ApprovalDialog
        open={Boolean(approveTarget)}
        onClose={() => setApproveTarget(null)}
        title="Approve Provider"
        message={
          approveTarget
            ? `Approve ${approveTarget.name} as a verified ${approveTarget.category}?`
            : ''
        }
        onConfirm={handleApprove}
      />

      <RejectDialog
        open={Boolean(rejectTarget)}
        onClose={() => setRejectTarget(null)}
        title="Reject Verification"
        message={
          rejectTarget ? `Reject verification for ${rejectTarget.name}? They will be notified.` : ''
        }
        onConfirm={handleReject}
      />

      <SuccessDialog
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        message={successMessage}
      />
    </Box>
  );
}
