import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Switch, View } from 'react-native';
import { Text } from 'react-native-paper';

import { Avatar } from '@/components/ui';
import { useAppTheme } from '@/hooks';

export type DashboardHeaderProps = {
  name: string;
  avatar: string;
  isOnline: boolean;
  onToggleOnline: (value: boolean) => void;
  onNotifications: () => void;
  unreadCount?: number;
};

export function DashboardHeader({
  name,
  avatar,
  isOnline,
  onToggleOnline,
  onNotifications,
  unreadCount = 0,
}: DashboardHeaderProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const firstName = name.split(' ')[0];

  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <Avatar source={{ uri: avatar }} name={name} size="lg" />
        <View style={{ flex: 1 }}>
          <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
            {greeting}
          </Text>
          <Text variant="headlineSmall" style={{ color: colors.textPrimary }}>
            {firstName}
          </Text>
        </View>
        <Pressable
          onPress={onNotifications}
          style={[styles.bellBtn, { borderColor: colors.border }]}
        >
          <MaterialCommunityIcons name="bell-outline" size={22} color={colors.textPrimary} />
          {unreadCount > 0 ? (
            <View style={[styles.badge, { backgroundColor: colors.error }]}>
              <Text variant="labelSmall" style={{ color: colors.white, fontSize: 10 }}>
                {unreadCount}
              </Text>
            </View>
          ) : null}
        </Pressable>
      </View>

      <View
        style={[styles.onlineRow, { backgroundColor: colors.surface, borderColor: colors.border }]}
      >
        <View style={styles.onlineLeft}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: isOnline ? colors.success : colors.textTertiary },
            ]}
          />
          <Text variant="labelLarge" style={{ color: colors.textPrimary }}>
            {isOnline ? 'Online' : 'Offline'}
          </Text>
          <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
            {isOnline ? 'Accepting jobs' : 'Not accepting jobs'}
          </Text>
        </View>
        <Switch
          value={isOnline}
          onValueChange={onToggleOnline}
          trackColor={{ false: colors.border, true: `${colors.primary}66` }}
          thumbColor={isOnline ? colors.primary : colors.surface}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 20, gap: 14 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  bellBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  onlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  onlineLeft: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
});
