import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SearchIcon from '@mui/icons-material/Search';
import * as MdIcons from 'react-icons/md';
import type { IconType } from 'react-icons';

import { PageHeader } from '@/components/common';
import { DeleteDialog, SuccessDialog } from '@/components/dialogs';
import { StatusChip } from '@/components/tables';
import { MOCK_CATEGORIES } from '@/constants/mockData';
import type { Category } from '@/types';

function getCategoryIcon(iconName: string): IconType {
  const icons = MdIcons as Record<string, IconType>;
  return icons[iconName] ?? MdIcons.MdCategory;
}

export function CategoriesPage() {
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const filtered = useMemo(
    () =>
      categories.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.description.toLowerCase().includes(search.toLowerCase()),
      ),
    [categories, search],
  );

  const handleDelete = () => {
    if (!deleteTarget) return;
    setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    setDeleteTarget(null);
    setSuccessMessage(`${deleteTarget.name} category deleted.`);
    setSuccessOpen(true);
  };

  return (
    <Box>
      <PageHeader
        title="Categories"
        subtitle="Manage service categories available on the platform"
        action={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setSuccessMessage('Add category form would open here.');
              setSuccessOpen(true);
            }}
          >
            Add Category
          </Button>
        }
      />

      <TextField
        size="small"
        placeholder="Search categories..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} /> }}
        sx={{ mb: 3, maxWidth: 360 }}
      />

      <Grid container spacing={2}>
        {filtered.map((category) => {
          const Icon = getCategoryIcon(category.icon);
          return (
            <Grid key={category.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: 1 }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    mb={1.5}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        display: 'grid',
                        placeItems: 'center',
                        opacity: category.status === 'active' ? 1 : 0.5,
                      }}
                    >
                      <Icon size={24} />
                    </Box>
                    <StatusChip
                      label={category.status}
                      color={category.status === 'active' ? 'success' : 'default'}
                    />
                  </Stack>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <IconButton
                    size="small"
                    onClick={() => {
                      setSuccessMessage(`Edit ${category.name} — form would open here.`);
                      setSuccessOpen(true);
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => setDeleteTarget(category)}>
                    <DeleteOutlineIcon fontSize="small" color="error" />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {filtered.length === 0 ? (
        <Typography color="text.secondary" textAlign="center" py={6}>
          No categories match your search.
        </Typography>
      ) : null}

      <DeleteDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Delete Category"
        message={
          deleteTarget
            ? `Delete ${deleteTarget.name}? Services in this category may be affected.`
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
