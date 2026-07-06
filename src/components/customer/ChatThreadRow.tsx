import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { Avatar } from '@/components/ui';
import { useAppTheme } from '@/hooks';
import type { ChatThread } from '@/types/chat';

export type ChatThreadRowProps = {
  thread: ChatThread;
  onPress: () => void;
  showDivider?: boolean;
  /** Whose name/avatar to show in the row. */
  perspective?: 'customer' | 'provider';
};

export function ChatThreadRow({
  thread,
  onPress,
  showDivider = false,
  perspective = 'customer',
}: ChatThreadRowProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  const displayName =
    perspective === 'provider'
      ? (thread.customerName ?? 'Customer')
      : thread.providerName;
  const avatarUri =
    perspective === 'provider' ? thread.customerAvatar : thread.providerAvatar;

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.row,
        showDivider && {
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: colors.divider,
        },
      ]}
    >
      <Avatar source={avatarUri ? { uri: avatarUri } : undefined} name={displayName} size="md" />
      <View style={styles.body}>
        <View style={styles.top}>
          <Text variant="bodyLarge" numberOfLines={1} style={{ color: colors.textPrimary, flex: 1, fontWeight: '600' }}>
            {displayName}
          </Text>
          <Text variant="labelSmall" style={{ color: colors.textTertiary }}>
            {thread.lastMessageAt}
          </Text>
        </View>
        {thread.serviceName ? (
          <Text variant="labelSmall" style={{ color: colors.textTertiary }} numberOfLines={1}>
            {thread.serviceName}
          </Text>
        ) : null}
        <View style={styles.bottom}>
          <Text variant="bodySmall" numberOfLines={1} style={{ color: colors.textSecondary, flex: 1 }}>
            {thread.lastMessage}
          </Text>
          {thread.unreadCount > 0 ? (
            <View style={[styles.badge, { backgroundColor: colors.primary }]}>
              <Text variant="labelSmall" style={{ color: colors.onPrimary, fontWeight: '700' }}>
                {thread.unreadCount}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  body: { flex: 1, gap: 2 },
  top: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  bottom: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 2 },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
});
