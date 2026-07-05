import { Text } from 'react-native-paper';

import { useAppTheme } from '@/hooks';

export type FieldLabelProps = {
  label: string;
  required?: boolean;
};

export function FieldLabel({ label, required = false }: FieldLabelProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <Text variant="labelMedium" style={{ fontWeight: '600', color: colors.textPrimary }}>
      {label}
      {required ? <Text style={{ color: colors.error }}> *</Text> : null}
    </Text>
  );
}
