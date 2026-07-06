import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Linking, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { ProviderScreen } from '@/components/provider';
import { Avatar, PrimaryButton, SecondaryButton } from '@/components/ui';
import { useAppDispatch, useAppTheme, useProviderJob } from '@/hooks';
import type { ProviderJobsStackParamList } from '@/navigation/types/provider.types';
import { acceptBooking } from '@/store';

type Props = NativeStackScreenProps<ProviderJobsStackParamList, 'ActiveJob'>;

export function ActiveJobScreen({ navigation, route }: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const dispatch = useAppDispatch();
  const job = useProviderJob(route.params.jobId);

  if (!job) {
    return (
      <ProviderScreen>
        <Text variant="bodyLarge" style={{ textAlign: 'center', padding: 20 }}>
          Job not found
        </Text>
      </ProviderScreen>
    );
  }

  return (
    <ProviderScreen bottomPadding={40}>
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text variant="labelSmall" style={{ color: colors.textTertiary }}>
          Booking ID
        </Text>
        <Text variant="titleMedium" style={{ color: colors.textPrimary, fontWeight: '700' }}>
          {job.bookingId}
        </Text>
      </View>

      <Section title="Customer">
        <View style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Avatar source={{ uri: job.customerAvatar }} name={job.customerName} size="lg" />
          <View style={{ flex: 1 }}>
            <Text variant="titleSmall" style={{ color: colors.textPrimary }}>
              {job.customerName}
            </Text>
            <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
              {job.customerPhone}
            </Text>
          </View>
        </View>
      </Section>

      <Section title="Service details">
        <InfoRow icon="wrench-outline" label="Service" value={job.service} />
        <InfoRow icon="map-marker-outline" label="Address" value={job.address} />
        <InfoRow icon="clock-outline" label="Scheduled" value={job.scheduledAt} />
        <InfoRow icon="cash" label="Estimated earnings" value={`₹${job.estimatedEarnings}`} />
      </Section>

      <View style={styles.actions}>
        <SecondaryButton
          label="Navigate"
          icon={<MaterialCommunityIcons name="navigation" size={18} color={colors.primaryDark} />}
          onPress={() => Linking.openURL('https://maps.google.com')}
          style={{ flex: 1 }}
        />
        <SecondaryButton
          label="Call"
          icon={<MaterialCommunityIcons name="phone" size={18} color={colors.primaryDark} />}
          onPress={() => Linking.openURL(`tel:${job.customerPhone}`)}
          style={{ flex: 1 }}
        />
        <SecondaryButton
          label="Chat"
          icon={<MaterialCommunityIcons name="message-text" size={18} color={colors.primaryDark} />}
          onPress={() => {}}
          style={{ flex: 1 }}
        />
      </View>

      <PrimaryButton
        label="Start Service"
        onPress={() => {
          dispatch(acceptBooking(job.id));
          navigation.navigate('ServiceStart', { jobId: job.id });
        }}
        style={{ marginHorizontal: 20, marginTop: 8 }}
      />
    </ProviderScreen>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <View style={styles.section}>
      <Text
        variant="titleSmall"
        style={{ color: colors.textPrimary, fontWeight: '600', marginBottom: 10 }}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  value: string;
}) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <View style={[styles.infoRow, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <MaterialCommunityIcons name={icon} size={20} color={colors.primaryDark} />
      <View style={{ flex: 1 }}>
        <Text variant="labelSmall" style={{ color: colors.textTertiary }}>
          {label}
        </Text>
        <Text variant="bodyMedium" style={{ color: colors.textPrimary }}>
          {value}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 20,
  },
  section: { paddingHorizontal: 20, marginBottom: 20 },
  row: {
    flexDirection: 'row',
    gap: 14,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 12,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
});
