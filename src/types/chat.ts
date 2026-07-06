export type ChatThread = {
  id: string;
  providerId: string;
  providerName: string;
  providerAvatar?: string;
  bookingId?: string;
  serviceName?: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
};

export type ChatMessage = {
  id: string;
  threadId: string;
  text: string;
  sentAt: string;
  sender: 'customer' | 'provider';
};
