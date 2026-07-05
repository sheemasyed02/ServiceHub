import { useMemo, useState } from 'react';
import { Box, Stack } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { type ColumnDef } from '@tanstack/react-table';

import { PageHeader } from '@/components/common';
import { ConfirmationDialog, SuccessDialog } from '@/components/dialogs';
import { ActionIconButton, DataTable, StatusChip } from '@/components/tables';
import { MOCK_DISPUTES } from '@/constants/mockData';
import type { Dispute } from '@/types';

function disputeColor(status: Dispute['status']) {
  if (status === 'resolved') return 'success';
  if (status === 'closed') return 'default';
  if (status === 'investigating') return 'info';
  return 'warning';
}

export function DisputesPage() {
  const [disputes, setDisputes] = useState(MOCK_DISPUTES);
  const [viewTarget, setViewTarget] = useState<Dispute | null>(null);
  const [resolveTarget, setResolveTarget] = useState<Dispute | null>(null);
  const [closeTarget, setCloseTarget] = useState<Dispute | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const columns = useMemo<ColumnDef<Dispute & Record<string, unknown>, unknown>[]>(
    () => [
      { accessorKey: 'id', header: 'Dispute ID' },
      { accessorKey: 'bookingId', header: 'Booking ID' },
      { accessorKey: 'customer', header: 'Customer' },
      { accessorKey: 'provider', header: 'Provider' },
      { accessorKey: 'reason', header: 'Reason' },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
          <StatusChip label={row.original.status} color={disputeColor(row.original.status)} />
        ),
      },
      { accessorKey: 'createdAt', header: 'Created' },
      {
        id: 'actions',
        header: 'Actions',
        enableSorting: false,
        cell: ({ row }) => (
          <Stack direction="row" spacing={0.5}>
            <ActionIconButton onClick={() => setViewTarget(row.original)}>
              <VisibilityIcon fontSize="small" />
            </ActionIconButton>
            <ActionIconButton
              onClick={() => setResolveTarget(row.original)}
              disabled={row.original.status === 'resolved' || row.original.status === 'closed'}
            >
              <CheckCircleOutlineIcon fontSize="small" color="success" />
            </ActionIconButton>
            <ActionIconButton
              onClick={() => setCloseTarget(row.original)}
              disabled={row.original.status === 'closed'}
            >
              <CloseIcon fontSize="small" color="error" />
            </ActionIconButton>
          </Stack>
        ),
      },
    ],
    [],
  );

  const handleResolve = () => {
    if (!resolveTarget) return;
    setDisputes((prev) =>
      prev.map((d) => (d.id === resolveTarget.id ? { ...d, status: 'resolved' as const } : d)),
    );
    setResolveTarget(null);
    setSuccessMessage(`Dispute ${resolveTarget.id} marked as resolved.`);
    setSuccessOpen(true);
  };

  const handleClose = () => {
    if (!closeTarget) return;
    setDisputes((prev) =>
      prev.map((d) => (d.id === closeTarget.id ? { ...d, status: 'closed' as const } : d)),
    );
    setCloseTarget(null);
    setSuccessMessage(`Dispute ${closeTarget.id} closed.`);
    setSuccessOpen(true);
  };

  return (
    <Box>
      <PageHeader title="Disputes" subtitle="Resolve customer–provider disputes and escalations" />

      <DataTable
        data={disputes as (Dispute & Record<string, unknown>)[]}
        columns={columns}
        searchPlaceholder="Search disputes..."
        exportFilename="disputes.csv"
      />

      <ConfirmationDialog
        open={Boolean(viewTarget)}
        onClose={() => setViewTarget(null)}
        title="Dispute Details"
        message={
          viewTarget
            ? `${viewTarget.id} · Booking ${viewTarget.bookingId}\n${viewTarget.customer} vs ${viewTarget.provider}\nReason: ${viewTarget.reason}`
            : ''
        }
        cancelLabel="Close"
      />

      <ConfirmationDialog
        open={Boolean(resolveTarget)}
        onClose={() => setResolveTarget(null)}
        title="Resolve Dispute"
        message={resolveTarget ? `Mark dispute ${resolveTarget.id} as resolved?` : ''}
        confirmLabel="Resolve"
        confirmColor="success"
        onConfirm={handleResolve}
      />

      <ConfirmationDialog
        open={Boolean(closeTarget)}
        onClose={() => setCloseTarget(null)}
        title="Close Dispute"
        message={closeTarget ? `Close dispute ${closeTarget.id} without further action?` : ''}
        confirmLabel="Close"
        confirmColor="error"
        onConfirm={handleClose}
      />

      <SuccessDialog
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        message={successMessage}
      />
    </Box>
  );
}
