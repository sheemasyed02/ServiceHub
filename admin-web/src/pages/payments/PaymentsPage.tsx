import { useMemo, useState } from 'react';
import { Box, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { type ColumnDef } from '@tanstack/react-table';

import { PageHeader, StatCard } from '@/components/common';
import { SuccessDialog } from '@/components/dialogs';
import { DataTable, StatusChip } from '@/components/tables';
import { MOCK_PAYMENTS } from '@/constants/mockData';
import type { Payment } from '@/types';
import { formatCurrency } from '@/utils/format';

function paymentColor(status: Payment['status']) {
  if (status === 'paid') return 'success';
  if (status === 'failed') return 'error';
  if (status === 'refunded') return 'info';
  return 'warning';
}

export function PaymentsPage() {
  const [successOpen, setSuccessOpen] = useState(false);
  const [invoiceId, setInvoiceId] = useState('');

  const totalRevenue = MOCK_PAYMENTS.filter((p) => p.status === 'paid').reduce(
    (sum, p) => sum + p.amount,
    0,
  );
  const totalCommission = MOCK_PAYMENTS.filter((p) => p.status === 'paid').reduce(
    (sum, p) => sum + p.commission,
    0,
  );
  const pendingAmount = MOCK_PAYMENTS.filter((p) => p.status === 'pending').reduce(
    (sum, p) => sum + p.amount,
    0,
  );

  const columns = useMemo<ColumnDef<Payment & Record<string, unknown>, unknown>[]>(
    () => [
      { accessorKey: 'id', header: 'Transaction ID' },
      { accessorKey: 'bookingId', header: 'Booking ID' },
      { accessorKey: 'customer', header: 'Customer' },
      { accessorKey: 'provider', header: 'Provider' },
      {
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ row }) => formatCurrency(row.original.amount),
      },
      {
        accessorKey: 'commission',
        header: 'Commission',
        cell: ({ row }) => formatCurrency(row.original.commission),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
          <StatusChip label={row.original.status} color={paymentColor(row.original.status)} />
        ),
      },
      { accessorKey: 'date', header: 'Date' },
      {
        id: 'actions',
        header: 'Invoice',
        enableSorting: false,
        cell: ({ row }) => (
          <Button
            size="small"
            variant="outlined"
            startIcon={<ReceiptLongIcon />}
            onClick={() => {
              setInvoiceId(row.original.id);
              setSuccessOpen(true);
            }}
          >
            Download
          </Button>
        ),
      },
    ],
    [],
  );

  return (
    <Box>
      <PageHeader title="Payments" subtitle="Track transactions, commissions, and payouts" />

      <Grid container spacing={2} mb={3}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard
            label="Total Revenue"
            value={formatCurrency(totalRevenue)}
            icon={AccountBalanceWalletIcon}
            accent="#059669"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard
            label="Platform Commission"
            value={formatCurrency(totalCommission)}
            icon={TrendingUpIcon}
            accent="#2563EB"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard
            label="Pending Payouts"
            value={formatCurrency(pendingAmount)}
            icon={PendingActionsIcon}
            accent="#EA580C"
          />
        </Grid>
      </Grid>

      <DataTable
        data={MOCK_PAYMENTS as (Payment & Record<string, unknown>)[]}
        columns={columns}
        searchPlaceholder="Search transactions..."
        exportFilename="payments.csv"
        title="Transactions"
      />

      <SuccessDialog
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        title="Invoice Downloaded"
        message={`Invoice for transaction ${invoiceId} has been downloaded.`}
      />
    </Box>
  );
}
