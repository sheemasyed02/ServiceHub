import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppDispatch, useAppSelector, useAppTheme } from '@/hooks';
import type { ChatStackParamList } from '@/navigation/types/customer.types';
import { markThreadRead, sendMessage } from '@/store';
import type { ChatMessage } from '@/types/chat';

type Props = NativeStackScreenProps<ChatStackParamList, 'ChatConversation'>;

export function ChatConversationScreen({ route, navigation }: Props) {
  const { threadId } = route.params;
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const [draft, setDraft] = useState('');

  const thread = useAppSelector((state) => state.chats.threads.find((t) => t.id === threadId));
  const messages = useAppSelector((state) =>
    state.chats.messages.filter((m) => m.threadId === threadId),
  );

  useEffect(() => {
    dispatch(markThreadRead(threadId));
  }, [dispatch, threadId]);

  useEffect(() => {
    if (thread?.providerName) {
      navigation.setOptions({ title: thread.providerName });
    }
  }, [navigation, thread?.providerName]);

  const handleSend = () => {
    const text = draft.trim();
    if (!text) return;
    dispatch(sendMessage({ threadId, text }));
    setDraft('');
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const mine = item.sender === 'customer';
    return (
      <View style={[styles.bubbleRow, mine ? styles.bubbleRowMine : styles.bubbleRowTheirs]}>
        <View
          style={[
            styles.bubble,
            mine
              ? { backgroundColor: colors.primary, borderBottomRightRadius: 4 }
              : { backgroundColor: colors.surface, borderBottomLeftRadius: 4 },
          ]}
        >
          <Text variant="bodyMedium" style={{ color: mine ? colors.onPrimary : colors.textPrimary }}>
            {item.text}
          </Text>
          <Text
            variant="labelSmall"
            style={{
              color: mine ? 'rgba(255,255,255,0.75)' : colors.textTertiary,
              marginTop: 4,
              alignSelf: 'flex-end',
            }}
          >
            {item.sentAt}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={[styles.root, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
    >
      {thread?.serviceName ? (
        <View style={[styles.serviceBar, { backgroundColor: colors.surface, borderBottomColor: colors.divider }]}>
          <MaterialCommunityIcons name="wrench-outline" size={16} color={colors.textTertiary} />
          <Text variant="labelMedium" style={{ color: colors.textSecondary }}>
            {thread.serviceName}
          </Text>
        </View>
      ) : null}

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messages}
        showsVerticalScrollIndicator={false}
      />

      <View
        style={[
          styles.composer,
          {
            backgroundColor: colors.surface,
            borderTopColor: colors.divider,
            paddingBottom: Math.max(insets.bottom, 10),
          },
        ]}
      >
        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder="Message…"
          placeholderTextColor={colors.textTertiary}
          style={[styles.input, { color: colors.textPrimary, backgroundColor: colors.surfaceVariant }]}
          multiline
          maxLength={500}
        />
        <Pressable
          onPress={handleSend}
          disabled={!draft.trim()}
          style={[
            styles.sendBtn,
            { backgroundColor: draft.trim() ? colors.primary : colors.surfaceVariant },
          ]}
        >
          <MaterialCommunityIcons
            name="send"
            size={20}
            color={draft.trim() ? colors.onPrimary : colors.textTertiary}
          />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  serviceBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  messages: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 10,
    flexGrow: 1,
  },
  bubbleRow: { flexDirection: 'row' },
  bubbleRowMine: { justifyContent: 'flex-end' },
  bubbleRowTheirs: { justifyContent: 'flex-start' },
  bubble: {
    maxWidth: '78%',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    paddingHorizontal: 12,
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  input: {
    flex: 1,
    minHeight: 42,
    maxHeight: 120,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 1,
  },
});
