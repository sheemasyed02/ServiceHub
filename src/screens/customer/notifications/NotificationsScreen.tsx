import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { CustomerScreen, InsetGroup, NotificationCard, SectionHeader } from '@/components/customer';
import { EmptyState } from '@/components/ui';
import { MOCK_NOTIFICATIONS } from '@/constants/customer';
import { useAppTheme } from '@/hooks';
import type { AppNotification } from '@/types/customer';

export function NotificationsScreen() {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const sections: { key: AppNotification['section']; title: string }[] = [
    { key: 'today', title: 'Today' },
    { key: 'yesterday', title: 'Yesterday' },
    { key: 'earlier', title: 'Earlier' },
  ];

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  if (notifications.length === 0) {
    return (
      <CustomerScreen>
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
          description="You have no notifications right now."
        />
      </CustomerScreen>
    );
  }

  return (
    <CustomerScreen>
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
                  onPress={() => markRead(n.id)}
                  onDelete={() => deleteNotification(n.id)}
                />
              ))}
            </InsetGroup>
          </View>
        );
      })}
    </CustomerScreen>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 12,
  },
  sectionHeader: {
    marginTop: 8,
  },
});
