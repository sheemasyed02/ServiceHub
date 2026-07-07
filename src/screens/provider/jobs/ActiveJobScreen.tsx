import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Linking, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { InsetGroup } from '@/components/customer';
import { ProviderScreen } from '@/components/provider';
import { Avatar, PrimaryButton, SecondaryButton } from '@/components/ui';
import { useAppDispatch, useAppSelector, useAppTheme, useBooking, useProviderJob } from '@/hooks';
import type { ProviderJobsStackParamList } from '@/navigation/types/provider.types';
import { acceptBooking, rejectBooking } from '@/store';

type Props = NativeStackScreenProps<ProviderJobsStackParamList, 'ActiveJob'>;

export function ActiveJobScreen({ navigation, route }: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const dispatch = useAppDispatch();
  const job = useProviderJob(route.params.jobId);
  const booking = useBooking(route.params.jobId);
  const chatThread = useAppSelector((state) =>
    state.chats.threads.find((t) => t.bookingId === job?.bookingId),
  );

  if (!job || !booking) {
    return (
      <ProviderScreen>
        <Text variant="bodyLarge" style={{ textAlign: 'center', padding: 20 }}>
          Job not found
        </Text>
      </ProviderScreen>
    );
  }

  const isPending = booking.providerStatus === 'pending';
  const isAccepted = booking.providerStatus === 'accepted' && booking.status === 'upcoming';
  const isOngoing = booking.status === 'ongoing';
  const isCompleted = booking.status === 'completed';
  const isCancelled =
    booking.status === 'cancelled' || booking.providerStatus === 'rejected';

  const openChat = () => {
    if (!chatThread) return;
    navigation.getParent()?.navigate('Chat', {
      screen: 'ChatConversation',
      params: { threadId: chatThread.id },
    });
  };

  const statusLabel = isPending
    ? 'Awaiting your response'
    : isOngoing
      ? 'Service in progress'
      : isCompleted
        ? 'Completed'
        : isCancelled
          ? 'Cancelled'
          : 'Scheduled';

  const statusColor = isPending
    ? colors.warning
    : isOngoing
      ? colors.primaryDark
      : isCompleted
        ? colors.success
        : isCancelled
          ? colors.error
          : colors.textSecondary;

  return (
    <ProviderScreen bottomPadding={40}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={{ color: colors.textPrimary, fontWeight: '700' }}>
          Job details
        </Text>
        <Text variant="bodySmall" style={{ color: statusColor, marginTop: 4, fontWeight: '600' }}>
          {statusLabel}
        </Text>
      </View>

      <InsetGroup style={styles.group}>
        <View style={styles.customerRow}>
          <Avatar source={{ uri: job.customerAvatar }} name={job.customerName} size="md" />
          <View style={{ flex: 1 }}>
            <Text variant="bodyLarge" style={{ color: colors.textPrimary, fontWeight: '600' }}>
              {job.customerName}
            </Text>
            <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
              {job.customerPhone}
            </Text>
          </View>
          <Text variant="titleMedium" style={{ color: colors.textPrimary, fontWeight: '700' }}>
            ₹{job.estimatedEarnings}
          </Text>
        </View>
        <View style={[styles.divider, { backgroundColor: colors.divider }]} />
        <InfoRow icon="wrench-outline" label="Service" value={job.service} />
        <InfoRow icon="map-marker-outline" label="Address" value={job.address} />
        <InfoRow icon="clock-outline" label="Scheduled" value={job.scheduledAt} last />
      </InsetGroup>

      {!isCancelled ? (
        <View style={styles.actions}>
          <SecondaryButton
            label="Navigate"
            icon={<MaterialCommunityIcons name="navigation" size={18} color={colors.primaryDark} />}
            onPress={() =>
              Linking.openURL(
                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(job.address)}`,
              )
            }
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
            onPress={openChat}
            style={{ flex: 1 }}
            disabled={!chatThread}
          />
        </View>
      ) : null}

      {isPending ? (
        <View style={styles.ctaRow}>
          <SecondaryButton
            label="Decline"
            onPress={() => {
              dispatch(rejectBooking(job.id));
              navigation.goBack();
            }}
            style={{ flex: 1 }}
          />
          <PrimaryButton
            label="Accept job"
            onPress={() => {
              dispatch(acceptBooking(job.id));
            }}
            style={{ flex: 1 }}
          />
        </View>
      ) : null}

      {isAccepted ? (
        <PrimaryButton
          label="Start service"
          onPress={() => navigation.navigate('ServiceStart', { jobId: job.id })}
          style={{ marginHorizontal: 20, marginTop: 8 }}
        />
      ) : null}

      {isOngoing ? (
        <View style={styles.ctaRow}>
          <SecondaryButton
            label="Continue service"
            onPress={() => navigation.navigate('ServiceStart', { jobId: job.id })}
            style={{ flex: 1 }}
          />
          <PrimaryButton
            label="Complete"
            onPress={() => navigation.navigate('CompleteService', { jobId: job.id })}
            style={{ flex: 1 }}
          />
        </View>
      ) : null}

      {isCompleted ? (
        <View style={[styles.completedBanner, { backgroundColor: colors.successContainer }]}>
          <MaterialCommunityIcons name="check-circle" size={20} color={colors.success} />
          <Text variant="bodyMedium" style={{ color: colors.success, fontWeight: '600' }}>
            This job was completed successfully
          </Text>
        </View>
      ) : null}
    </ProviderScreen>
  );
}

function InfoRow({
  icon,
  label,
  value,
  last,
}: {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  value: string;
  last?: boolean;
}) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <View style={[styles.infoRow, !last && { marginBottom: 0 }]}>
      <MaterialCommunityIcons name={icon} size={18} color={colors.textTertiary} />
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
  header: { paddingHorizontal: 20, paddingTop: 8, marginBottom: 16 },
  group: { marginBottom: 16 },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  divider: { height: StyleSheet.hairlineWidth, marginHorizontal: 16 },
  infoRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  ctaRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    marginTop: 8,
  },
  completedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 20,
    marginTop: 12,
    padding: 14,
    borderRadius: 12,
  },
});
