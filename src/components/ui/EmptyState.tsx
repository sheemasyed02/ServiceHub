import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';

import { useAppTheme } from '@/hooks';

import { PrimaryButton } from './PrimaryButton';

export type EmptyStateProps = {
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  style?: ViewStyle;
};

export function EmptyState({
  icon = 'clipboard-text-outline',
  title,
  description,
  actionLabel,
  onAction,
  style,
}: EmptyStateProps) {
  const theme = useAppTheme();
  const { colors, spacing } = theme.tokens;

  return (
    <View style={[styles.container, { padding: spacing.xl, gap: spacing.md }, style]}>
      <View style={[styles.iconWrap, { backgroundColor: colors.surfaceVariant }]}>
        <MaterialCommunityIcons name={icon} size={40} color={colors.primaryDark} />
      </View>
      <Text variant="titleLarge" style={{ color: colors.textPrimary, textAlign: 'center' }}>
        {title}
      </Text>
      {description ? (
        <Text variant="bodyMedium" style={{ color: colors.textSecondary, textAlign: 'center' }}>
          {description}
        </Text>
      ) : null}
      {actionLabel && onAction ? (
        <PrimaryButton label={actionLabel} onPress={onAction} fullWidth={false} size="sm" />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
