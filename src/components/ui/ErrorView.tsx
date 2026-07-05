import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';

import { useAppTheme } from '@/hooks';

import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';

export type ErrorViewProps = {
  title?: string;
  message: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  retryLabel?: string;
  onRetry?: () => void;
  secondaryLabel?: string;
  onSecondaryPress?: () => void;
  style?: ViewStyle;
};

export function ErrorView({
  title = 'Something went wrong',
  message,
  icon = 'alert-circle-outline',
  retryLabel = 'Try Again',
  onRetry,
  secondaryLabel,
  onSecondaryPress,
  style,
}: ErrorViewProps) {
  const theme = useAppTheme();
  const { colors, spacing } = theme.tokens;

  return (
    <View style={[styles.container, { padding: spacing.xl, gap: spacing.md }, style]}>
      <View style={[styles.iconWrap, { backgroundColor: colors.errorContainer }]}>
        <MaterialCommunityIcons name={icon} size={40} color={colors.error} />
      </View>
      <Text variant="titleLarge" style={{ color: colors.textPrimary, textAlign: 'center' }}>
        {title}
      </Text>
      <Text variant="bodyMedium" style={{ color: colors.textSecondary, textAlign: 'center' }}>
        {message}
      </Text>
      {onRetry ? <PrimaryButton label={retryLabel} onPress={onRetry} size="sm" /> : null}
      {secondaryLabel && onSecondaryPress ? (
        <SecondaryButton
          label={secondaryLabel}
          onPress={onSecondaryPress}
          variant="ghost"
          size="sm"
        />
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
