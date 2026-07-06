import { MOCK_PROVIDERS } from '@/constants/customer/mockData';
import { getProviderImages } from '@/constants/customer/images';
import { DEFAULT_CUSTOMER_ID } from '@/constants/provider/accounts';
import type { ChatMessage, ChatThread } from '@/types/chat';

const CUSTOMER = {
  id: DEFAULT_CUSTOMER_ID,
  name: 'Alex Johnson',
  avatar: 'https://i.pravatar.cc/150?u=alex-customer',
};

function providerName(id: string) {
  return MOCK_PROVIDERS.find((p) => p.id === id)?.name ?? 'Provider';
}

export function createSeedThreads(): ChatThread[] {
  return [
    {
      id: 't1',
      providerId: 'p1',
      providerName: providerName('p1'),
      providerAvatar: getProviderImages('p1')?.avatar,
      customerId: CUSTOMER.id,
      customerName: CUSTOMER.name,
      customerAvatar: CUSTOMER.avatar,
      bookingId: 'BK-1024',
      serviceName: 'Pipe Leak Fix',
      lastMessage: 'I will reach in about 15 minutes.',
      lastMessageAt: '10:12 AM',
      unreadCount: 1,
    },
    {
      id: 't2',
      providerId: 'p3',
      providerName: providerName('p3'),
      providerAvatar: getProviderImages('p3')?.avatar,
      customerId: CUSTOMER.id,
      customerName: CUSTOMER.name,
      customerAvatar: CUSTOMER.avatar,
      bookingId: 'BK-1026',
      serviceName: 'AC Service',
      lastMessage: 'Thanks for booking! See you tomorrow.',
      lastMessageAt: 'Yesterday',
      unreadCount: 0,
    },
    {
      id: 't3',
      providerId: 'p5',
      providerName: providerName('p5'),
      providerAvatar: getProviderImages('p5')?.avatar,
      customerId: CUSTOMER.id,
      customerName: CUSTOMER.name,
      customerAvatar: CUSTOMER.avatar,
      lastMessage: 'Let me know if you need anything else.',
      lastMessageAt: 'Mon',
      unreadCount: 0,
    },
  ];
}

export function createSeedMessages(): ChatMessage[] {
  return [
    {
      id: 'm1',
      threadId: 't1',
      text: 'Hi, I booked a pipe leak fix for today.',
      sentAt: '9:45 AM',
      sender: 'customer',
      status: 'read',
    },
    {
      id: 'm2',
      threadId: 't1',
      text: 'Got it. I am on my way.',
      sentAt: '10:05 AM',
      sender: 'provider',
      status: 'read',
    },
    {
      id: 'm3',
      threadId: 't1',
      text: 'I will reach in about 15 minutes.',
      sentAt: '10:12 AM',
      sender: 'provider',
      status: 'read',
    },
    {
      id: 'm4',
      threadId: 't2',
      text: 'Can you come before noon?',
      sentAt: 'Yesterday',
      sender: 'customer',
      status: 'read',
    },
    {
      id: 'm5',
      threadId: 't2',
      text: 'Thanks for booking! See you tomorrow.',
      sentAt: 'Yesterday',
      sender: 'provider',
      status: 'read',
    },
    {
      id: 'm6',
      threadId: 't3',
      text: 'The wiring work is complete.',
      sentAt: 'Mon',
      sender: 'provider',
      status: 'read',
    },
    {
      id: 'm7',
      threadId: 't3',
      text: 'Let me know if you need anything else.',
      sentAt: 'Mon',
      sender: 'provider',
      status: 'read',
    },
  ];
}
