import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { InsetGroup } from '@/components/customer';
import { JobRequestCard, ProviderScreen } from '@/components/provider';
import { EmptyState } from '@/components/ui';
import { SkeletonList } from '@/components/ui/skeleton';
import { useAppDispatch, useAppTheme, useCurrentProviderProfile, useProviderPendingRequests } from '@/hooks';
import type { ProviderJobsStackParamList } from '@/navigation/types/provider.types';
import { acceptBooking, rejectBooking } from '@/store';

type Props = NativeStackScreenProps<ProviderJobsStackParamList, 'JobRequests'>;

export function JobRequestsScreen({ navigation }: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const dispatch = useAppDispatch();
  const provider = useCurrentProviderProfile();
  const pendingRequests = useProviderPendingRequests();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ProviderScreen bottomPadding={88}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={{ color: colors.textPrimary, fontWeight: '700' }}>
          Job Requests
        </Text>
        <Text variant="bodyMedium" style={{ color: colors.textSecondary, marginTop: 4 }}>
          {provider
            ? `${pendingRequests.length} pending for ${provider.profession}`
            : 'Accept or decline customer bookings'}
        </Text>
      </View>

      {loading ? (
        <SkeletonList count={3} />
      ) : pendingRequests.length === 0 ? (
        <EmptyState
          icon="briefcase-off-outline"
          title="No pending requests"
          description="New booking requests for your services will show up here."
        />
      ) : (
        <InsetGroup>
          {pendingRequests.map((req, index) => (
            <JobRequestCard
              key={req.id}
              request={req}
              showDivider={index < pendingRequests.length - 1}
              onAccept={() => {
                dispatch(acceptBooking(req.id));
                navigation.navigate('ActiveJob', { jobId: req.id });
              }}
              onReject={() => dispatch(rejectBooking(req.id))}
              onPress={() => navigation.navigate('ActiveJob', { jobId: req.id })}
            />
          ))}
        </InsetGroup>
      )}

      <View style={{ height: 24 }} />
    </ProviderScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
});
