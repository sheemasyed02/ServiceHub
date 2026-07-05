import { useMemo, useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CircleIcon from '@mui/icons-material/Circle';
import { type ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router-dom';

import { PageHeader } from '@/components/common';
import { ConfirmationDialog, DeleteDialog, SuccessDialog } from '@/components/dialogs';
import { ActionIconButton, DataTable, StatusChip } from '@/components/tables';
import { MOCK_PROVIDERS } from '@/constants/mockData';
import { ROUTES } from '@/constants/routes';
import type { Provider } from '@/types';
import { formatCurrency } from '@/utils/format';

export function ProvidersPage() {
  const [providers, setProviders] = useState(
    MOCK_PROVIDERS.filter((p) => p.verificationStatus === 'verified'),
  );
  const [deleteTarget, setDeleteTarget] = useState<Provider | null>(null);
  const [suspendTarget, setSuspendTarget] = useState<Provider | null>(null);
  const [editTarget, setEditTarget] = useState<Provider | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const columns = useMemo<ColumnDef<Provider & Record<string, unknown>, unknown>[]>(
    () => [
      { accessorKey: 'name', header: 'Name' },
      {
        accessorKey: 'isOnline',
        header: 'Online Status',
        cell: ({ row }) => (
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <CircleIcon
              sx={{ fontSize: 10, color: row.original.isOnline ? 'success.main' : 'grey.400' }}
            />
            <span>{row.original.isOnline ? 'Online' : 'Offline'}</span>
          </Stack>
        ),
      },
      {
        accessorKey: 'rating',
        header: 'Rating',
        cell: ({ row }) => `${row.original.rating.toFixed(1)} ★`,
      },
      { accessorKey: 'jobsCompleted', header: 'Jobs' },
      {
        accessorKey: 'revenue',
        header: 'Revenue',
        cell: ({ row }) => formatCurrency(row.original.revenue),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
          <StatusChip
            label={row.original.status}
            color={
              row.original.status === 'active'
                ? 'success'
                : row.original.status === 'suspended'
                  ? 'error'
                  : 'default'
            }
          />
        ),
      },
      {
        id: 'actions',
        header: 'Actions',
        enableSorting: false,
        cell: ({ row }) => (
          <Stack direction="row" spacing={0.5} alignItems="center">
            <ActionIconButton onClick={() => setEditTarget(row.original)}>
              <EditIcon fontSize="small" />
            </ActionIconButton>
            <ActionIconButton onClick={() => setSuspendTarget(row.original)}>
              <BlockIcon fontSize="small" />
            </ActionIconButton>
            <ActionIconButton onClick={() => setDeleteTarget(row.original)}>
              <DeleteOutlineIcon fontSize="small" color="error" />
            </ActionIconButton>
            <Button
              component={Link}
              to={`/providers/${row.original.id}`}
              size="small"
              variant="text"
              startIcon={<VisibilityIcon fontSize="small" />}
            >
              Profile
            </Button>
          </Stack>
        ),
      },
    ],
    [],
  );

  const handleDelete = () => {
    if (!deleteTarget) return;
    setProviders((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleteTarget(null);
    setSuccessMessage(`${deleteTarget.name} removed from providers.`);
    setSuccessOpen(true);
  };

  const handleSuspend = () => {
    if (!suspendTarget) return;
    setProviders((prev) =>
      prev.map((p) =>
        p.id === suspendTarget.id
          ? { ...p, status: p.status === 'suspended' ? 'active' : 'suspended' }
          : p,
      ),
    );
    setSuspendTarget(null);
    setSuccessMessage(`${suspendTarget.name} status updated.`);
    setSuccessOpen(true);
  };

  return (
    <Box>
      <PageHeader
        title="Providers"
        subtitle="Verified service providers on the platform"
        action={
          <Button component={Link} to={ROUTES.PROVIDER_VERIFICATION} variant="outlined">
            Pending Verification
          </Button>
        }
      />

      <DataTable
        data={providers as (Provider & Record<string, unknown>)[]}
        columns={columns}
        searchPlaceholder="Search providers..."
        exportFilename="providers.csv"
      />

      <ConfirmationDialog
        open={Boolean(editTarget)}
        onClose={() => setEditTarget(null)}
        title="Edit Provider"
        message={
          editTarget
            ? `Edit profile for ${editTarget.name} (${editTarget.category}). Changes will be saved locally.`
            : ''
        }
        confirmLabel="Save Changes"
        onConfirm={() => {
          setEditTarget(null);
          setSuccessMessage('Provider details updated.');
          setSuccessOpen(true);
        }}
      />

      <ConfirmationDialog
        open={Boolean(suspendTarget)}
        onClose={() => setSuspendTarget(null)}
        title={suspendTarget?.status === 'suspended' ? 'Reactivate Provider' : 'Suspend Provider'}
        message={suspendTarget ? `Update access for ${suspendTarget.name}?` : ''}
        confirmLabel={suspendTarget?.status === 'suspended' ? 'Reactivate' : 'Suspend'}
        confirmColor="warning"
        onConfirm={handleSuspend}
      />

      <DeleteDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Delete Provider"
        message={deleteTarget ? `Remove ${deleteTarget.name} from the platform?` : ''}
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
