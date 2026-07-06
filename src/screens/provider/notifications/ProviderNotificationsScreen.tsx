import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { ProviderScreen } from '@/components/provider';
import { NoNotificationsEmptyState } from '@/components/ui/empty-states';
import { MOCK_PROVIDER_NOTIFICATIONS } from '@/constants/provider';
import { useAppTheme } from '@/hooks';
import type { ProviderDashboardStackParamList } from '@/navigation/types/provider.types';
import type { ProviderNotification } from '@/types/provider';

type Props = NativeStackScreenProps<ProviderDashboardStackParamList, 'Notifications'>;

const TYPE_ICONS = {
  booking: 'calendar-plus',
  payment: 'cash-check',
  verification: 'shield-check-outline',
  announcement: 'bullhorn-outline',
} as const;

export function ProviderNotificationsScreen(_props: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const [items, setItems] = useState<ProviderNotification[]>(MOCK_PROVIDER_NOTIFICATIONS);

  if (items.length === 0) {
    return (
      <ProviderScreen scroll={false}>
        <NoNotificationsEmptyState style={{ flex: 1 }} />
      </ProviderScreen>
    );
  }

  return (
    <ProviderScreen bottomPadding={40}>
      {items.map((item) => (
        <View
          key={item.id}
          style={[
            styles.card,
            {
              backgroundColor: item.read ? colors.surface : `${colors.primary}08`,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={[styles.iconWrap, { backgroundColor: `${colors.primary}14` }]}>
            <MaterialCommunityIcons
              name={TYPE_ICONS[item.type]}
              size={20}
              color={colors.primaryDark}
            />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.titleRow}>
              <Text variant="titleSmall" style={{ color: colors.textPrimary, flex: 1 }}>
                {item.title}
              </Text>
              {!item.read ? (
                <View style={[styles.unread, { backgroundColor: colors.primary }]} />
              ) : null}
            </View>
            <Text variant="bodySmall" style={{ color: colors.textSecondary, marginTop: 4 }}>
              {item.message}
            </Text>
            <Text variant="labelSmall" style={{ color: colors.textTertiary, marginTop: 6 }}>
              {item.time}
            </Text>
          </View>
          <Pressable
            onPress={() => setItems((prev) => prev.filter((n) => n.id !== item.id))}
            hitSlop={8}
          >
            <MaterialCommunityIcons name="delete-outline" size={20} color={colors.textTertiary} />
          </Pressable>
        </View>
      ))}
    </ProviderScreen>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  unread: { width: 8, height: 8, borderRadius: 4 },
});
