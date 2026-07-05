import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { JobRequestCard } from '@/components/provider';
import { NoJobsEmptyState } from '@/components/ui/empty-states';
import { SkeletonList } from '@/components/ui/skeleton';
import { MOCK_JOB_REQUESTS } from '@/constants/provider';
import { useAppTheme } from '@/hooks';
import type { ProviderJobsStackParamList } from '@/navigation/types/provider.types';
import type { JobRequest } from '@/types/provider';

type Props = NativeStackScreenProps<ProviderJobsStackParamList, 'JobRequests'>;

export function JobRequestsScreen({ navigation }: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<JobRequest[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRequests(MOCK_JOB_REQUESTS.filter((j) => j.status === 'pending'));
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Text variant="headlineSmall" style={{ color: colors.textPrimary }}>
          Job Requests
        </Text>
        <Text variant="bodySmall" style={{ color: colors.textSecondary, marginTop: 4 }}>
          Swipe left on a card for quick actions
        </Text>
      </View>

      {loading ? (
        <SkeletonList count={3} />
      ) : requests.length === 0 ? (
        <NoJobsEmptyState style={{ flex: 1 }} />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120, paddingTop: 8 }}
        >
          {requests.map((req) => (
            <View key={req.id} style={{ marginBottom: 10 }}>
              <JobRequestCard
                request={req}
                onAccept={() => navigation.navigate('ActiveJob', { jobId: req.id })}
                onReject={() => setRequests((prev) => prev.filter((r) => r.id !== req.id))}
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
