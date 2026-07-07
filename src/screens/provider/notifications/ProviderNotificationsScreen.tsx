import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { InsetGroup, NotificationCard, SectionHeader } from '@/components/customer';
import { ProviderScreen } from '@/components/provider';
import { EmptyState } from '@/components/ui';
import {
  useAppTheme,
  useProviderChatThreads,
  useProviderPendingBookings,
} from '@/hooks';
import type { ProviderDashboardStackParamList } from '@/navigation/types/provider.types';
import type { ProviderNotification } from '@/types/provider';

type NotificationItem = ProviderNotification & { section: 'today' | 'earlier' };

type Props = NativeStackScreenProps<ProviderDashboardStackParamList, 'Notifications'>;

export function ProviderNotificationsScreen(_props: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const pendingBookings = useProviderPendingBookings();
  const chatThreads = useProviderChatThreads();
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [readIds, setReadIds] = useState<string[]>([]);

  const generated = useMemo(() => {
    const items: NotificationItem[] = [
      ...pendingBookings.map((b) => ({
        id: `booking-${b.id}`,
        type: 'booking' as const,
        title: 'New booking request',
        message: `${b.customerName} requested ${b.service} on ${b.date}`,
        time: 'Just now',
        read: false,
        section: 'today' as const,
      })),
      ...chatThreads
        .filter((t) => t.unreadCount > 0)
        .map((t) => ({
          id: `chat-${t.id}`,
          type: 'announcement' as const,
          title: 'Unread message',
          message: `${t.customerName ?? 'Customer'}: ${t.lastMessage}`,
          time: t.lastMessageAt,
          read: false,
          section: 'today' as const,
        })),
    ];
    return items;
  }, [pendingBookings, chatThreads]);

  const notifications = generated
    .filter((n) => !dismissed.includes(n.id))
    .map((n) => ({ ...n, read: readIds.includes(n.id) || n.read }));

  const sections = [
    { key: 'today' as const, title: 'Today' },
    { key: 'earlier' as const, title: 'Earlier' },
  ];

  if (notifications.length === 0) {
    return (
      <ProviderScreen>
        <Text
          variant="headlineSmall"
          style={{
            fontWeight: '700',
            color: colors.textPrimary,
            paddingHorizontal: 20,
            marginBottom: 16,
          }}
        >
          Notifications
        </Text>
        <EmptyState
          icon="bell-off-outline"
          title="All caught up"
          description="You have no new notifications right now."
        />
      </ProviderScreen>
    );
  }

  return (
    <ProviderScreen bottomPadding={40}>
      <Text
        variant="headlineSmall"
        style={{
          fontWeight: '700',
          color: colors.textPrimary,
          paddingHorizontal: 20,
          marginBottom: 16,
        }}
      >
        Notifications
      </Text>

      {sections.map(({ key, title }) => {
        const items = notifications.filter((n) => n.section === key);
        if (items.length === 0) return null;

        return (
          <View key={key} style={styles.section}>
            <SectionHeader title={title} style={styles.sectionHeader} />
            <InsetGroup>
              {items.map((n, index) => (
                <NotificationCard
                  key={n.id}
                  title={n.title}
                  message={n.message}
                  time={n.time}
                  read={n.read}
                  showDivider={index < items.length - 1}
                  onPress={() => setReadIds((prev) => [...prev, n.id])}
                  onDelete={() => setDismissed((prev) => [...prev, n.id])}
                />
              ))}
            </InsetGroup>
          </View>
        );
      })}
    </ProviderScreen>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: 12 },
  sectionHeader: { marginTop: 8 },
});
