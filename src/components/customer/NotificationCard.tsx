import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useAppTheme } from '@/hooks';

export type NotificationCardProps = {
  title: string;
  message: string;
  time: string;
  read: boolean;
  onPress?: () => void;
  onDelete?: () => void;
};

export function NotificationCard({
  title,
  message,
  time,
  read,
  onPress,
  onDelete,
}: NotificationCardProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          opacity: read ? 0.85 : 1,
        },
      ]}
    >
      {!read ? <View style={[styles.dot, { backgroundColor: colors.primary }]} /> : null}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text
            variant="bodyLarge"
            style={{ fontWeight: '600', color: colors.textPrimary, flex: 1 }}
          >
            {title}
          </Text>
          <Text variant="labelSmall" style={{ color: colors.textTertiary }}>
            {time}
          </Text>
        </View>
        <Text variant="bodySmall" style={{ color: colors.textSecondary }} numberOfLines={2}>
          {message}
        </Text>
      </View>
      {onDelete ? (
        <Pressable onPress={onDelete} hitSlop={8}>
          <MaterialCommunityIcons name="close" size={18} color={colors.textTertiary} />
        </Pressable>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 14,
    marginHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
