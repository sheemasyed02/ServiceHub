import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { createSeedMessages, createSeedThreads } from '@/constants/shared/seedChats';
import type { ChatMessage, ChatThread } from '@/types/chat';

type ChatsState = {
  threads: ChatThread[];
  messages: ChatMessage[];
};

const initialState: ChatsState = {
  threads: createSeedThreads(),
  messages: createSeedMessages(),
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    sendMessage: (
      state,
      action: PayloadAction<{ threadId: string; text: string; sender?: 'customer' | 'provider' }>,
    ) => {
      const { threadId, text, sender = 'customer' } = action.payload;
      const now = new Date();
      const sentAt = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

      state.messages.push({
        id: `m-${Date.now()}`,
        threadId,
        text,
        sentAt,
        sender,
      });

      const thread = state.threads.find((t) => t.id === threadId);
      if (thread) {
        thread.lastMessage = text;
        thread.lastMessageAt = sentAt;
        if (sender === 'customer') {
          thread.unreadCount = 0;
        }
      }
    },
    markThreadRead: (state, action: PayloadAction<string>) => {
      const thread = state.threads.find((t) => t.id === action.payload);
      if (thread) thread.unreadCount = 0;
    },
  },
});

export const { sendMessage, markThreadRead } = chatsSlice.actions;
export const chatsReducer = chatsSlice.reducer;
