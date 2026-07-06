import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Linking, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { InsetGroup } from '@/components/customer';
import { ProviderScreen } from '@/components/provider';
import { Avatar, PrimaryButton, SecondaryButton } from '@/components/ui';
import { useAppDispatch, useAppSelector, useAppTheme, useProviderJob } from '@/hooks';
import type { ProviderJobsStackParamList } from '@/navigation/types/provider.types';
import { acceptBooking } from '@/store';

type Props = NativeStackScreenProps<ProviderJobsStackParamList, 'ActiveJob'>;

export function ActiveJobScreen({ navigation, route }: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const dispatch = useAppDispatch();
  const job = useProviderJob(route.params.jobId);
  const chatThread = useAppSelector((state) =>
    state.chats.threads.find((t) => t.bookingId === job?.bookingId),
  );

  if (!job) {
    return (
      <ProviderScreen>
        <Text variant="bodyLarge" style={{ textAlign: 'center', padding: 20 }}>
          Job not found
        </Text>
      </ProviderScreen>
    );
  }

  const openChat = () => {
    if (!chatThread) return;
    navigation.getParent()?.navigate('Chat', {
      screen: 'ChatConversation',
      params: { threadId: chatThread.id },
    });
  };

  return (
    <ProviderScreen bottomPadding={40}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={{ color: colors.textPrimary, fontWeight: '700' }}>
          Job details
        </Text>
        <Text variant="bodySmall" style={{ color: colors.textSecondary, marginTop: 4 }}>
          {job.bookingId}
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
          onPress={openChat}
          style={{ flex: 1 }}
          disabled={!chatThread}
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
});
