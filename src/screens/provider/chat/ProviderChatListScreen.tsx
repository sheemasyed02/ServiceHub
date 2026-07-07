import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { ChatThreadRow, InsetGroup } from '@/components/customer';
import { ProviderScreen } from '@/components/provider';
import { EmptyState } from '@/components/ui';
import { useAppTheme, useProviderChatThreads } from '@/hooks';
import type { ProviderChatStackParamList } from '@/navigation/types/provider.types';

type Props = NativeStackScreenProps<ProviderChatStackParamList, 'ChatList'>;

export function ProviderChatListScreen({ navigation }: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const threads = useProviderChatThreads();
  const unreadTotal = threads.reduce((sum, t) => sum + t.unreadCount, 0);

  return (
    <ProviderScreen bottomPadding={88}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={{ color: colors.textPrimary, fontWeight: '700' }}>
          Messages
        </Text>
        {unreadTotal > 0 ? (
          <Text variant="bodySmall" style={{ color: colors.textSecondary, marginTop: 4 }}>
            {unreadTotal} unread
          </Text>
        ) : (
          <Text variant="bodySmall" style={{ color: colors.textSecondary, marginTop: 4 }}>
            Chat with your customers
          </Text>
        )}
      </View>

      {threads.length === 0 ? (
        <EmptyState
          icon="message-text-outline"
          title="No messages yet"
          description="Customer chats will appear here when they message you about a booking."
        />
      ) : (
        <InsetGroup>
          {threads.map((thread, index) => (
            <ChatThreadRow
              key={thread.id}
              thread={thread}
              perspective="provider"
              showDivider={index < threads.length - 1}
              onPress={() => navigation.navigate('ChatConversation', { threadId: thread.id })}
            />
          ))}
        </InsetGroup>
      )}

      <View style={{ height: 24 }} />
    </ProviderScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginBottom: 16,
    paddingTop: 8,
  },
});
