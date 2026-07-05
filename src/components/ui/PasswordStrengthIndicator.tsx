import { StyleSheet, View } from 'react-native';

import { getPasswordStrength, type PasswordStrength } from '@/utils/validation';
import { useAppTheme } from '@/hooks';

export type PasswordStrengthIndicatorProps = {
  password: string;
};

const STRENGTH_INDEX: Record<PasswordStrength, number> = {
  weak: 1,
  fair: 2,
  good: 3,
  strong: 4,
};

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  if (password.length < 2) return null;

  const strength = getPasswordStrength(password);
  const activeBars = STRENGTH_INDEX[strength];
  const barColor =
    strength === 'weak'
      ? colors.error
      : strength === 'fair'
        ? colors.warning
        : strength === 'good'
          ? colors.primary
          : colors.success;

  return (
    <View style={styles.bars}>
      {Array.from({ length: 4 }, (_, index) => (
        <View
          key={index}
          style={[
            styles.bar,
            { backgroundColor: index < activeBars ? barColor : colors.borderLight },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bars: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 2,
  },
  bar: {
    flex: 1,
    height: 3,
    borderRadius: 999,
  },
});
