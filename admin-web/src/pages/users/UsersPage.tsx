import { useMemo, useState } from 'react';
import { Box, Stack } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BlockIcon from '@mui/icons-material/Block';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { type ColumnDef } from '@tanstack/react-table';

import { PageHeader } from '@/components/common';
import { ConfirmationDialog, DeleteDialog, SuccessDialog } from '@/components/dialogs';
import { ActionIconButton, DataTable, StatusChip } from '@/components/tables';
import { MOCK_CUSTOMERS } from '@/constants/mockData';
import type { Customer } from '@/types';

function statusColor(status: Customer['status']) {
  if (status === 'active') return 'success';
  if (status === 'suspended') return 'error';
  if (status === 'pending') return 'warning';
  return 'default';
}

export function UsersPage() {
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
  const [deleteTarget, setDeleteTarget] = useState<Customer | null>(null);
  const [suspendTarget, setSuspendTarget] = useState<Customer | null>(null);
  const [viewTarget, setViewTarget] = useState<Customer | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const columns = useMemo<ColumnDef<Customer & Record<string, unknown>, unknown>[]>(
    () => [
      { accessorKey: 'name', header: 'Customer Name' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'phone', header: 'Phone' },
      { accessorKey: 'bookings', header: 'Bookings' },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
          <StatusChip label={row.original.status} color={statusColor(row.original.status)} />
        ),
      },
      {
        id: 'actions',
        header: 'Actions',
        enableSorting: false,
        cell: ({ row }) => (
          <Stack direction="row" spacing={0.5}>
            <ActionIconButton onClick={() => setViewTarget(row.original)}>
              <VisibilityIcon fontSize="small" />
            </ActionIconButton>
            <ActionIconButton onClick={() => setSuspendTarget(row.original)}>
              <BlockIcon fontSize="small" />
            </ActionIconButton>
            <ActionIconButton onClick={() => setDeleteTarget(row.original)}>
              <DeleteOutlineIcon fontSize="small" color="error" />
            </ActionIconButton>
          </Stack>
        ),
      },
    ],
    [],
  );

  const handleDelete = () => {
    if (!deleteTarget) return;
    setCustomers((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    setDeleteTarget(null);
    setSuccessMessage(`${deleteTarget.name} has been deleted.`);
    setSuccessOpen(true);
  };

  const handleSuspend = () => {
    if (!suspendTarget) return;
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === suspendTarget.id
          ? { ...c, status: c.status === 'suspended' ? 'active' : 'suspended' }
          : c,
      ),
    );
    setSuspendTarget(null);
    setSuccessMessage(`${suspendTarget.name} status updated.`);
    setSuccessOpen(true);
  };

  return (
    <Box>
      <PageHeader title="Users" subtitle="Manage customer accounts and access" />

      <DataTable
        data={customers as (Customer & Record<string, unknown>)[]}
        columns={columns}
        searchPlaceholder="Search by name, email, or phone..."
        exportFilename="users.csv"
      />

      <ConfirmationDialog
        open={Boolean(viewTarget)}
        onClose={() => setViewTarget(null)}
        title="Customer Details"
        message={
          viewTarget
            ? `${viewTarget.name} · ${viewTarget.email} · ${viewTarget.phone} · ${viewTarget.bookings} bookings · Joined ${viewTarget.joinedAt}`
            : ''
        }
        cancelLabel="Close"
      />

      <ConfirmationDialog
        open={Boolean(suspendTarget)}
        onClose={() => setSuspendTarget(null)}
        title={suspendTarget?.status === 'suspended' ? 'Reactivate User' : 'Suspend User'}
        message={
          suspendTarget
            ? `Are you sure you want to ${suspendTarget.status === 'suspended' ? 'reactivate' : 'suspend'} ${suspendTarget.name}?`
            : ''
        }
        confirmLabel={suspendTarget?.status === 'suspended' ? 'Reactivate' : 'Suspend'}
        confirmColor="warning"
        onConfirm={handleSuspend}
      />

      <DeleteDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Delete Customer"
        message={
          deleteTarget
            ? `Permanently delete ${deleteTarget.name}? This action cannot be undone.`
            : ''
        }
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
