import { useMemo, useState } from 'react';
import { Box, Stack } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReplyIcon from '@mui/icons-material/Reply';
import CloseIcon from '@mui/icons-material/Close';
import { type ColumnDef } from '@tanstack/react-table';

import { PageHeader } from '@/components/common';
import { ConfirmationDialog, SuccessDialog } from '@/components/dialogs';
import { ActionIconButton, DataTable, StatusChip } from '@/components/tables';
import { MOCK_TICKETS } from '@/constants/mockData';
import type { SupportTicket } from '@/types';

function ticketColor(status: SupportTicket['status']) {
  if (status === 'resolved') return 'success';
  if (status === 'closed') return 'default';
  if (status === 'in_progress') return 'info';
  return 'warning';
}

function priorityColor(priority: SupportTicket['priority']) {
  if (priority === 'urgent') return 'error';
  if (priority === 'high') return 'warning';
  if (priority === 'medium') return 'info';
  return 'default';
}

export function SupportTicketsPage() {
  const [tickets, setTickets] = useState(MOCK_TICKETS);
  const [viewTarget, setViewTarget] = useState<SupportTicket | null>(null);
  const [replyTarget, setReplyTarget] = useState<SupportTicket | null>(null);
  const [closeTarget, setCloseTarget] = useState<SupportTicket | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const columns = useMemo<ColumnDef<SupportTicket & Record<string, unknown>, unknown>[]>(
    () => [
      { accessorKey: 'id', header: 'Ticket ID' },
      { accessorKey: 'user', header: 'User' },
      { accessorKey: 'category', header: 'Category' },
      {
        accessorKey: 'priority',
        header: 'Priority',
        cell: ({ row }) => (
          <StatusChip label={row.original.priority} color={priorityColor(row.original.priority)} />
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
          <StatusChip
            label={row.original.status.replace('_', ' ')}
            color={ticketColor(row.original.status)}
          />
        ),
      },
      { accessorKey: 'assignedAdmin', header: 'Assigned To' },
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
              onClick={() => setReplyTarget(row.original)}
              disabled={row.original.status === 'closed'}
            >
              <ReplyIcon fontSize="small" />
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

  const handleReply = () => {
    if (!replyTarget) return;
    setTickets((prev) =>
      prev.map((t) => (t.id === replyTarget.id ? { ...t, status: 'in_progress' as const } : t)),
    );
    setReplyTarget(null);
    setSuccessMessage(`Reply sent for ticket ${replyTarget.id}.`);
    setSuccessOpen(true);
  };

  const handleClose = () => {
    if (!closeTarget) return;
    setTickets((prev) =>
      prev.map((t) => (t.id === closeTarget.id ? { ...t, status: 'closed' as const } : t)),
    );
    setCloseTarget(null);
    setSuccessMessage(`Ticket ${closeTarget.id} closed.`);
    setSuccessOpen(true);
  };

  return (
    <Box>
      <PageHeader
        title="Support Tickets"
        subtitle="Handle customer and provider support requests"
      />

      <DataTable
        data={tickets as (SupportTicket & Record<string, unknown>)[]}
        columns={columns}
        searchPlaceholder="Search tickets..."
        exportFilename="support-tickets.csv"
      />

      <ConfirmationDialog
        open={Boolean(viewTarget)}
        onClose={() => setViewTarget(null)}
        title="Ticket Details"
        message={
          viewTarget
            ? `${viewTarget.id} · ${viewTarget.user} · ${viewTarget.category}\nPriority: ${viewTarget.priority} · Assigned: ${viewTarget.assignedAdmin}`
            : ''
        }
        cancelLabel="Close"
      />

      <ConfirmationDialog
        open={Boolean(replyTarget)}
        onClose={() => setReplyTarget(null)}
        title="Reply to Ticket"
        message={
          replyTarget ? `Send a reply to ${replyTarget.user} for ticket ${replyTarget.id}?` : ''
        }
        confirmLabel="Send Reply"
        onConfirm={handleReply}
      />

      <ConfirmationDialog
        open={Boolean(closeTarget)}
        onClose={() => setCloseTarget(null)}
        title="Close Ticket"
        message={closeTarget ? `Close ticket ${closeTarget.id}?` : ''}
        confirmLabel="Close Ticket"
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
