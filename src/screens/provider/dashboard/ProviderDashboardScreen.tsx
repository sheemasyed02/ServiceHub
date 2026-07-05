import { LinearGradient } from 'expo-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  DashboardHeader,
  JobRequestCard,
  ProviderScreen,
  ProviderSectionHeader,
  QuickActionGrid,
  StatCard,
} from '@/components/provider';
import {
  MOCK_EARNINGS,
  MOCK_JOB_REQUESTS,
  MOCK_PROVIDER_NOTIFICATIONS,
  MOCK_PROVIDER_USER,
} from '@/constants/provider';
import { useAppTheme } from '@/hooks';
import type { ProviderDashboardStackParamList } from '@/navigation/types/provider.types';

type Props = NativeStackScreenProps<ProviderDashboardStackParamList, 'DashboardMain'>;

export function ProviderDashboardScreen({ navigation }: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const insets = useSafeAreaInsets();
  const [isOnline, setIsOnline] = useState(MOCK_PROVIDER_USER.isOnline);
  const pendingRequests = MOCK_JOB_REQUESTS.filter((j) => j.status === 'pending');
  const unread = MOCK_PROVIDER_NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <ProviderScreen edges={[]} bottomPadding={120}>
      <LinearGradient
        colors={['#FFFBEB', colors.background]}
        style={[styles.hero, { paddingTop: insets.top + 8 }]}
      >
        <DashboardHeader
          name={MOCK_PROVIDER_USER.name}
          avatar={MOCK_PROVIDER_USER.avatar}
          isOnline={isOnline}
          onToggleOnline={setIsOnline}
          unreadCount={unread}
          onNotifications={() => navigation.navigate('Notifications')}
        />
      </LinearGradient>

      <View style={styles.stats}>
        <StatCard
          label="Today's Earnings"
          value={`₹${MOCK_EARNINGS.today}`}
          icon="cash"
          accent={colors.success}
        />
        <StatCard label="Today's Bookings" value="3" icon="calendar-check" />
        <StatCard
          label="Pending Requests"
          value={String(pendingRequests.length)}
          icon="clock-alert-outline"
          accent={colors.warning}
        />
        <StatCard
          label="Customer Rating"
          value={`${MOCK_PROVIDER_USER.rating} ★`}
          icon="star"
          accent={colors.primary}
        />
      </View>

      <ProviderSectionHeader title="Quick actions" />
      <QuickActionGrid
        actions={[
          {
            label: 'View Jobs',
            icon: 'briefcase-outline',
            onPress: () => navigation.getParent()?.navigate('Jobs'),
          },
          { label: 'Earnings', icon: 'chart-line', onPress: () => navigation.navigate('Earnings') },
          {
            label: 'Calendar',
            icon: 'calendar-month',
            onPress: () => navigation.getParent()?.navigate('Calendar'),
          },
          {
            label: 'Documents',
            icon: 'file-document-outline',
            onPress: () => navigation.navigate('Documents'),
          },
        ]}
      />

      <View style={styles.spacer} />
      <ProviderSectionHeader
        title="Recent booking requests"
        actionLabel="View all"
        onAction={() => navigation.getParent()?.navigate('Jobs')}
      />

      {pendingRequests.length === 0 ? (
        <Text
          variant="bodyMedium"
          style={{ color: colors.textSecondary, textAlign: 'center', padding: 20 }}
        >
          No pending requests
        </Text>
      ) : (
        pendingRequests.slice(0, 2).map((req) => (
          <View key={req.id} style={{ marginBottom: 10 }}>
            <JobRequestCard
              request={req}
              onAccept={() =>
                navigation
                  .getParent()
                  ?.navigate('Jobs', { screen: 'ActiveJob', params: { jobId: req.id } })
              }
              onReject={() => {}}
            />
          </View>
        ))
      )}
      <View style={{ height: 24 }} />
    </ProviderScreen>
  );
}

const styles = StyleSheet.create({
  hero: { paddingBottom: 16 },
  stats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 20,
    marginTop: 8,
  },
  spacer: { height: 24 },
});
