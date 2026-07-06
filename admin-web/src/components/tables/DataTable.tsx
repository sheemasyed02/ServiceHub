import {
  Box,
  Chip,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  IconButton,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import { exportToCsv } from '@/utils/format';

export type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  searchPlaceholder?: string;
  exportFilename?: string;
  title?: string;
  toolbarExtra?: React.ReactNode;
};

export function DataTable<T extends object>({
  data,
  columns,
  searchPlaceholder = 'Search...',
  exportFilename = 'export.csv',
  title,
  toolbarExtra,
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 8 } },
  });

  const exportRows = useMemo(
    () =>
      table.getFilteredRowModel().rows.map((row) => {
        const obj: Record<string, unknown> = {};
        row.getVisibleCells().forEach((cell) => {
          const key = cell.column.id;
          obj[key] = cell.getValue();
        });
        return obj;
      }),
    [table],
  );

  return (
    <Paper sx={{ overflow: 'hidden' }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
        >
          {title ? (
            <Typography variant="h6" fontWeight={700}>
              {title}
            </Typography>
          ) : (
            <Box />
          )}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems="center">
            {toolbarExtra}
            <TextField
              size="small"
              placeholder={searchPlaceholder}
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 220 }}
            />
            <Button
              variant="outlined"
              size="small"
              startIcon={<FileDownloadIcon />}
              onClick={() => exportToCsv(exportFilename, exportRows)}
            >
              Export CSV
            </Button>
          </Stack>
        </Stack>
      </Box>

      <TableContainer>
        <Table size="small">
          <TableHead>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableCell key={header.id} sx={{ fontWeight: 700, bgcolor: 'grey.50' }}>
                    {header.isPlaceholder ? null : (
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={0.5}
                        sx={{ cursor: header.column.getCanSort() ? 'pointer' : 'default' }}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() === 'asc' && (
                          <ArrowUpwardIcon sx={{ fontSize: 14 }} />
                        )}
                        {header.column.getIsSorted() === 'desc' && (
                          <ArrowDownwardIcon sx={{ fontSize: 14 }} />
                        )}
                      </Stack>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} hover>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">No results found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={table.getFilteredRowModel().rows.length}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => table.setPageIndex(page)}
        rowsPerPage={table.getState().pagination.pageSize}
        onRowsPerPageChange={(e) => table.setPageSize(Number(e.target.value))}
        rowsPerPageOptions={[5, 8, 15, 25]}
      />
    </Paper>
  );
}

export function StatusChip({
  label,
  color,
}: {
  label: string;
  color: 'success' | 'warning' | 'error' | 'default' | 'info';
}) {
  return <Chip label={label} size="small" color={color} variant="outlined" />;
}

export function ActionIconButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <IconButton size="small" onClick={onClick} disabled={disabled}>
      {children}
    </IconButton>
  );
}
