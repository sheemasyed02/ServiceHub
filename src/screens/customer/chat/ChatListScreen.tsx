import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { ChatThreadRow, CustomerScreen, InsetGroup } from '@/components/customer';
import { EmptyState } from '@/components/ui';
import { useAppSelector, useAppTheme } from '@/hooks';
import type { ChatStackParamList } from '@/navigation/types/customer.types';

type Props = NativeStackScreenProps<ChatStackParamList, 'ChatList'>;

export function ChatListScreen({ navigation }: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const threads = useAppSelector((state) => state.chats.threads);
  const unreadTotal = threads.reduce((sum, t) => sum + t.unreadCount, 0);

  return (
    <CustomerScreen>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={{ color: colors.textPrimary, fontWeight: '700' }}>
          Messages
        </Text>
        {unreadTotal > 0 ? (
          <Text variant="bodySmall" style={{ color: colors.textSecondary, marginTop: 4 }}>
            {unreadTotal} unread
          </Text>
        ) : null}
      </View>

      {threads.length === 0 ? (
        <EmptyState
          icon="message-text-outline"
          title="No messages yet"
          description="Chat with a provider after booking a service."
        />
      ) : (
        <InsetGroup>
          {threads.map((thread, index) => (
            <ChatThreadRow
              key={thread.id}
              thread={thread}
              showDivider={index < threads.length - 1}
              onPress={() => navigation.navigate('ChatConversation', { threadId: thread.id })}
            />
          ))}
        </InsetGroup>
      )}

      <View style={{ height: 24 }} />
    </CustomerScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
});
