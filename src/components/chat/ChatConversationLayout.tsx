import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MessageTicks } from '@/components/customer';
import { useAppDispatch, useAppSelector, useAppTheme, useKeyboardHeight } from '@/hooks';
import { markThreadRead, sendMessage, updateMessageStatus } from '@/store';
import type { ChatMessage } from '@/types/chat';

export type ChatRole = 'customer' | 'provider';

export type ChatConversationLayoutProps = {
  threadId: string;
  role: ChatRole;
  title?: string;
  serviceName?: string;
  onSetHeaderTitle?: (title: string) => void;
  hideTabBar?: () => void;
  showTabBar?: () => void;
};

const COMPOSER_HEIGHT = 58;

export function ChatConversationLayout({
  threadId,
  role,
  title,
  serviceName,
  onSetHeaderTitle,
  hideTabBar,
  showTabBar,
}: ChatConversationLayoutProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const keyboardHeight = useKeyboardHeight();
  const [draft, setDraft] = useState('');
  const listRef = useRef<FlatList<ChatMessage>>(null);

  const thread = useAppSelector((state) => state.chats.threads.find((t) => t.id === threadId));
  const messages = useAppSelector((state) =>
    state.chats.messages.filter((m) => m.threadId === threadId),
  );

  // WhatsApp-style: pin composer above keyboard (iOS lifts by keyboard height; Android uses window resize).
  const composerBottom =
    keyboardHeight > 0
      ? Platform.OS === 'ios'
        ? keyboardHeight
        : 0
      : Math.max(insets.bottom, 8);

  const listBottomPad = COMPOSER_HEIGHT + composerBottom + 12;

  const scrollToEnd = useCallback(() => {
    requestAnimationFrame(() => {
      listRef.current?.scrollToEnd({ animated: true });
    });
  }, []);

  useEffect(() => {
    dispatch(markThreadRead(threadId));
  }, [dispatch, threadId]);

  useEffect(() => {
    const headerTitle =
      title ??
      (role === 'customer' ? thread?.providerName : thread?.customerName) ??
      'Chat';
    onSetHeaderTitle?.(headerTitle);
  }, [onSetHeaderTitle, role, thread?.customerName, thread?.providerName, title]);

  useEffect(() => {
    hideTabBar?.();
    return () => showTabBar?.();
  }, [hideTabBar, showTabBar]);

  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      scrollToEnd,
    );
    return () => showSub.remove();
  }, [scrollToEnd]);

  useEffect(() => {
    if (keyboardHeight > 0) {
      scrollToEnd();
    }
  }, [keyboardHeight, scrollToEnd]);

  const simulateDelivery = (messageId: string) => {
    setTimeout(() => {
      dispatch(updateMessageStatus({ messageId, status: 'delivered' }));
    }, 600);
    setTimeout(() => {
      dispatch(updateMessageStatus({ messageId, status: 'read' }));
    }, 2200);
  };

  const handleSend = () => {
    const text = draft.trim();
    if (!text) return;

    const messageId = `m-${Date.now()}`;
    dispatch(sendMessage({ id: messageId, threadId, text, sender: role }));
    setDraft('');
    simulateDelivery(messageId);
    scrollToEnd();
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const mine = item.sender === role;
    const tickColor = mine ? 'rgba(255,255,255,0.85)' : colors.textTertiary;

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
          <View style={styles.metaRow}>
            <Text
              variant="labelSmall"
              style={{ color: mine ? 'rgba(255,255,255,0.75)' : colors.textTertiary }}
            >
              {item.sentAt}
            </Text>
            {mine ? <MessageTicks status={item.status} color={tickColor} /> : null}
          </View>
        </View>
      </View>
    );
  };

  const displayService = serviceName ?? thread?.serviceName;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {displayService ? (
        <View
          style={[
            styles.serviceBar,
            { backgroundColor: colors.surface, borderBottomColor: colors.divider },
          ]}
        >
          <MaterialCommunityIcons name="wrench-outline" size={16} color={colors.textTertiary} />
          <Text variant="labelMedium" style={{ color: colors.textSecondary }}>
            {displayService}
          </Text>
        </View>
      ) : null}

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        style={styles.list}
        contentContainerStyle={[styles.messages, { paddingBottom: listBottomPad }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        onContentSizeChange={scrollToEnd}
      />

      <View
        style={[
          styles.composerWrap,
          {
            backgroundColor: colors.surface,
            borderTopColor: colors.divider,
            bottom: composerBottom,
            paddingBottom: keyboardHeight > 0 ? 8 : 0,
          },
        ]}
      >
        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder="Message…"
          placeholderTextColor={colors.textTertiary}
          style={[
            styles.input,
            { color: colors.textPrimary, backgroundColor: colors.surfaceVariant },
          ]}
          multiline
          maxLength={500}
          onFocus={scrollToEnd}
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
    </View>
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
  list: { flex: 1 },
  messages: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 10,
    flexGrow: 1,
    justifyContent: 'flex-end',
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
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
    marginTop: 4,
  },
  composerWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
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
