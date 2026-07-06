import { LinearGradient } from 'expo-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { InsetGroup } from '@/components/customer';
import {
  DashboardHeader,
  JobRequestCard,
  ProviderScreen,
  ProviderSectionHeader,
  QuickActionGrid,
  StatCard,
} from '@/components/provider';
import { EmptyState } from '@/components/ui';
import { MOCK_PROVIDER_NOTIFICATIONS } from '@/constants/provider';
import {
  useAppDispatch,
  useAppTheme,
  useCurrentProviderProfile,
  useProviderEarnings,
  useProviderPendingRequests,
} from '@/hooks';
import type { ProviderDashboardStackParamList } from '@/navigation/types/provider.types';
import { acceptBooking, rejectBooking, setProviderOnline } from '@/store';

type Props = NativeStackScreenProps<ProviderDashboardStackParamList, 'DashboardMain'>;

export function ProviderDashboardScreen({ navigation }: Props) {
  const theme = useAppTheme();
  const { colors, gradients } = theme.tokens;
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const provider = useCurrentProviderProfile();
  const pendingRequests = useProviderPendingRequests();
  const earnings = useProviderEarnings();
  const unread = MOCK_PROVIDER_NOTIFICATIONS.filter((n) => !n.read).length;

  if (!provider) {
    return (
      <ProviderScreen>
        <Text style={{ padding: 20 }}>Provider profile not loaded.</Text>
      </ProviderScreen>
    );
  }

  const header = (
    <LinearGradient
      colors={gradients.hero}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.hero, { paddingTop: insets.top + 8 }]}
    >
      <DashboardHeader
        name={provider.name}
        avatar={provider.avatar}
        isOnline={provider.isOnline}
        onToggleOnline={(value) => dispatch(setProviderOnline(value))}
        unreadCount={unread}
        onNotifications={() => navigation.navigate('Notifications')}
        onProfilePress={() => navigation.navigate('ProfileFlow')}
      />
    </LinearGradient>
  );

  return (
    <ProviderScreen fixedHeader={header} bottomPadding={88}>
      <View style={styles.stats}>
        <StatCard
          label="Earned"
          value={`₹${earnings.today}`}
          icon="cash"
          accent={colors.success}
        />
        <StatCard
          label="Pending"
          value={String(pendingRequests.length)}
          icon="clock-alert-outline"
          accent={colors.warning}
        />
        <StatCard label="Rating" value={`${provider.rating} ★`} icon="star" accent={colors.primary} />
        <StatCard label="Jobs done" value={String(earnings.completedCount)} icon="briefcase-outline" />
      </View>

      <ProviderSectionHeader title="Shortcuts" style={styles.firstSection} />
      <QuickActionGrid
        actions={[
          {
            label: 'Jobs',
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
            label: 'Messages',
            icon: 'message-text-outline',
            onPress: () => navigation.getParent()?.navigate('Chat'),
          },
        ]}
      />

      <ProviderSectionHeader
        title="New requests"
        actionLabel="See all"
        onAction={() => navigation.getParent()?.navigate('Jobs')}
      />

      {pendingRequests.length === 0 ? (
        <View style={{ paddingHorizontal: 20 }}>
          <EmptyState
            icon="briefcase-check-outline"
            title="No new requests"
            description={`You're all caught up for ${provider.profession} bookings.`}
          />
        </View>
      ) : (
        <InsetGroup>
          {pendingRequests.slice(0, 3).map((req, index) => (
            <JobRequestCard
              key={req.id}
              request={req}
              showDivider={index < Math.min(pendingRequests.length, 3) - 1}
              onAccept={() => {
                dispatch(acceptBooking(req.id));
                navigation
                  .getParent()
                  ?.navigate('Jobs', { screen: 'ActiveJob', params: { jobId: req.id } });
              }}
              onReject={() => dispatch(rejectBooking(req.id))}
              onPress={() =>
                navigation.getParent()?.navigate('Jobs', {
                  screen: 'ActiveJob',
                  params: { jobId: req.id },
                })
              }
            />
          ))}
        </InsetGroup>
      )}

      <View style={{ height: 24 }} />
    </ProviderScreen>
  );
}

const styles = StyleSheet.create({
  hero: { paddingBottom: 14 },
  stats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 4,
  },
  firstSection: { marginTop: 8 },
});
