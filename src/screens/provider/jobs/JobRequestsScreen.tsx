import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { JobRequestCard } from '@/components/provider';
import { NoJobsEmptyState } from '@/components/ui/empty-states';
import { SkeletonList } from '@/components/ui/skeleton';
import { useAppDispatch, useAppTheme, useCurrentProviderProfile, useProviderPendingRequests } from '@/hooks';
import type { ProviderJobsStackParamList } from '@/navigation/types/provider.types';
import { acceptBooking, rejectBooking } from '@/store';

type Props = NativeStackScreenProps<ProviderJobsStackParamList, 'JobRequests'>;

export function JobRequestsScreen({ navigation }: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const provider = useCurrentProviderProfile();
  const pendingRequests = useProviderPendingRequests();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Text variant="headlineSmall" style={{ color: colors.textPrimary }}>
          Job Requests
        </Text>
        <Text variant="bodySmall" style={{ color: colors.textSecondary, marginTop: 4 }}>
          {provider
            ? `Showing requests for ${provider.name} only`
            : 'Accept or decline customer bookings assigned to you'}
        </Text>
      </View>

      {loading ? (
        <SkeletonList count={3} />
      ) : pendingRequests.length === 0 ? (
        <NoJobsEmptyState style={{ flex: 1 }} />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120, paddingTop: 8 }}
        >
          {pendingRequests.map((req) => (
            <View key={req.id} style={{ marginBottom: 10 }}>
              <JobRequestCard
                request={req}
                onAccept={() => {
                  dispatch(acceptBooking(req.id));
                  navigation.navigate('ActiveJob', { jobId: req.id });
                }}
                onReject={() => dispatch(rejectBooking(req.id))}
                onPress={() => navigation.navigate('ActiveJob', { jobId: req.id })}
              />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingBottom: 16 },
});
