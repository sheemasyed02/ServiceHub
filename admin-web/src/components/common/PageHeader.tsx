import { Card, CardContent, Typography, Box, Stack } from '@mui/material';
import type { SvgIconComponent } from '@mui/icons-material';

type StatCardProps = {
  label: string;
  value: string;
  icon: SvgIconComponent;
  accent?: string;
};

export function StatCard({ label, value, icon: Icon, accent = '#9A7B18' }: StatCardProps) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {label}
            </Typography>
            <Typography variant="h5" fontWeight={700}>
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              bgcolor: `${accent}18`,
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <Icon sx={{ color: accent }} />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent="space-between"
      alignItems={{ sm: 'center' }}
      mb={3}
      gap={2}
    >
      <Box>
        <Typography variant="h4" fontWeight={700}>
          {title}
        </Typography>
        {subtitle ? (
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            {subtitle}
          </Typography>
        ) : null}
      </Box>
      {action}
    </Stack>
  );
}
