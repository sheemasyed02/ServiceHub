import { useMemo, useState } from 'react';
import { Box, Rating, Stack } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { type ColumnDef } from '@tanstack/react-table';

import { PageHeader } from '@/components/common';
import { DeleteDialog, SuccessDialog } from '@/components/dialogs';
import { ActionIconButton, DataTable, StatusChip } from '@/components/tables';
import { MOCK_REVIEWS } from '@/constants/mockData';
import type { Review } from '@/types';

function reviewColor(status: Review['status']) {
  if (status === 'visible') return 'success';
  if (status === 'hidden') return 'default';
  return 'warning';
}

export function ReviewsPage() {
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [deleteTarget, setDeleteTarget] = useState<Review | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const columns = useMemo<ColumnDef<Review & Record<string, unknown>, unknown>[]>(
    () => [
      {
        accessorKey: 'rating',
        header: 'Rating',
        cell: ({ row }) => <Rating value={row.original.rating} readOnly size="small" />,
      },
      { accessorKey: 'customer', header: 'Customer' },
      { accessorKey: 'provider', header: 'Provider' },
      {
        accessorKey: 'review',
        header: 'Review',
        cell: ({ row }) => (
          <Box
            sx={{
              maxWidth: 280,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {row.original.review}
          </Box>
        ),
      },
      { accessorKey: 'reportCount', header: 'Reports' },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
          <StatusChip label={row.original.status} color={reviewColor(row.original.status)} />
        ),
      },
      { accessorKey: 'date', header: 'Date' },
      {
        id: 'actions',
        header: 'Actions',
        enableSorting: false,
        cell: ({ row }) => (
          <Stack direction="row" spacing={0.5}>
            <ActionIconButton
              onClick={() => {
                setReviews((prev) =>
                  prev.map((r) =>
                    r.id === row.original.id
                      ? { ...r, status: r.status === 'hidden' ? 'visible' : 'hidden' }
                      : r,
                  ),
                );
                setSuccessMessage(
                  `Review ${row.original.status === 'hidden' ? 'shown' : 'hidden'}.`,
                );
                setSuccessOpen(true);
              }}
            >
              <VisibilityOffIcon fontSize="small" />
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
    setReviews((prev) => prev.filter((r) => r.id !== deleteTarget.id));
    setDeleteTarget(null);
    setSuccessMessage('Review deleted successfully.');
    setSuccessOpen(true);
  };

  return (
    <Box>
      <PageHeader title="Reviews" subtitle="Moderate customer reviews and flagged content" />

      <DataTable
        data={reviews as (Review & Record<string, unknown>)[]}
        columns={columns}
        searchPlaceholder="Search reviews..."
        exportFilename="reviews.csv"
      />

      <DeleteDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Delete Review"
        message={deleteTarget ? `Permanently delete this review by ${deleteTarget.customer}?` : ''}
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
