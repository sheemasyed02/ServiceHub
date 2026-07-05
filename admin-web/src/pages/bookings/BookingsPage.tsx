import { useMemo, useState } from 'react';
import { Box, Stack } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { type ColumnDef } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import { PageHeader } from '@/components/common';
import { ConfirmationDialog, SuccessDialog } from '@/components/dialogs';
import { ActionIconButton, DataTable, StatusChip } from '@/components/tables';
import { MOCK_BOOKINGS } from '@/constants/mockData';
import type { Booking } from '@/types';
import { formatCurrency } from '@/utils/format';

function bookingStatusColor(status: Booking['status']) {
  if (status === 'completed') return 'success';
  if (status === 'cancelled') return 'error';
  if (status === 'in_progress') return 'info';
  return 'warning';
}

function paymentStatusColor(status: Booking['paymentStatus']) {
  if (status === 'paid') return 'success';
  if (status === 'failed') return 'error';
  if (status === 'refunded') return 'info';
  return 'warning';
}

export function BookingsPage() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);
  const [cancelTarget, setCancelTarget] = useState<Booking | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);

  const columns = useMemo<ColumnDef<Booking & Record<string, unknown>, unknown>[]>(
    () => [
      { accessorKey: 'id', header: 'Booking ID' },
      { accessorKey: 'customer', header: 'Customer' },
      { accessorKey: 'provider', header: 'Provider' },
      { accessorKey: 'service', header: 'Service' },
      { accessorKey: 'date', header: 'Date' },
      { accessorKey: 'location', header: 'Location' },
      {
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ row }) => formatCurrency(row.original.amount),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
          <StatusChip
            label={row.original.status.replace('_', ' ')}
            color={bookingStatusColor(row.original.status)}
          />
        ),
      },
      {
        accessorKey: 'paymentStatus',
        header: 'Payment',
        cell: ({ row }) => (
          <StatusChip
            label={row.original.paymentStatus}
            color={paymentStatusColor(row.original.paymentStatus)}
          />
        ),
      },
      {
        id: 'actions',
        header: 'Actions',
        enableSorting: false,
        cell: ({ row }) => (
          <Stack direction="row" spacing={0.5}>
            <ActionIconButton onClick={() => navigate(`/bookings/${row.original.id}`)}>
              <VisibilityIcon fontSize="small" />
            </ActionIconButton>
            <ActionIconButton
              onClick={() => setCancelTarget(row.original)}
              disabled={row.original.status === 'cancelled' || row.original.status === 'completed'}
            >
              <CancelOutlinedIcon fontSize="small" color="error" />
            </ActionIconButton>
          </Stack>
        ),
      },
    ],
    [navigate],
  );

  const handleCancel = () => {
    if (!cancelTarget) return;
    setBookings((prev) =>
      prev.map((b) => (b.id === cancelTarget.id ? { ...b, status: 'cancelled' as const } : b)),
    );
    setCancelTarget(null);
    setSuccessOpen(true);
  };

  return (
    <Box>
      <PageHeader title="Bookings" subtitle="Monitor and manage all service bookings" />

      <DataTable
        data={bookings as (Booking & Record<string, unknown>)[]}
        columns={columns}
        searchPlaceholder="Search bookings..."
        exportFilename="bookings.csv"
      />

      <ConfirmationDialog
        open={Boolean(cancelTarget)}
        onClose={() => setCancelTarget(null)}
        title="Cancel Booking"
        message={
          cancelTarget ? `Cancel booking ${cancelTarget.id} for ${cancelTarget.customer}?` : ''
        }
        confirmLabel="Cancel Booking"
        confirmColor="error"
        onConfirm={handleCancel}
      />

      <SuccessDialog
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        message="Booking cancelled successfully."
      />
    </Box>
  );
}
