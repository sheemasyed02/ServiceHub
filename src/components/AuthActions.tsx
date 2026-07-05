import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import { useAppTheme } from '@/hooks';

type AuthActionsProps = {
  actions: {
    label: string;
    onPress: () => void;
    mode?: 'contained' | 'outlined' | 'text';
  }[];
};

export function AuthActions({ actions }: AuthActionsProps) {
  const theme = useAppTheme();
  const { spacing } = theme.tokens;

  return (
    <View style={[styles.actions, { gap: spacing.sm, marginTop: spacing.lg }]}>
      {actions.map((action) => (
        <Button
          key={action.label}
          mode={action.mode ?? 'contained'}
          onPress={action.onPress}
          style={styles.button}
        >
          {action.label}
        </Button>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    width: '100%',
  },
  button: {
    borderRadius: 10,
  },
});
