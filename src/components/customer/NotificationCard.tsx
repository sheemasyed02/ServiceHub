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
  showDivider?: boolean;
};

export function NotificationCard({
  title,
  message,
  time,
  read,
  onPress,
  onDelete,
  showDivider = false,
}: NotificationCardProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.row,
        showDivider && {
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: colors.divider,
        },
        !read && { backgroundColor: colors.primaryContainer + '40' },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text
            variant="bodyLarge"
            style={{ fontWeight: read ? '400' : '600', color: colors.textPrimary, flex: 1 }}
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
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
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
