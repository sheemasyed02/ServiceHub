import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { ProviderScreen } from '@/components/provider';
import { OtpInput, PrimaryButton, TextInput, UploadButton } from '@/components/ui';
import { getJobRequestById } from '@/constants/provider';
import { useAppTheme } from '@/hooks';
import type { ProviderJobsStackParamList } from '@/navigation/types/provider.types';

type Props = NativeStackScreenProps<ProviderJobsStackParamList, 'ServiceStart'>;

export function ServiceStartScreen({ navigation, route }: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const job = getJobRequestById(route.params.jobId);
  const [otp, setOtp] = useState('');
  const [notes, setNotes] = useState('');
  const [verified, setVerified] = useState(false);

  if (!job) return null;

  const handleVerify = () => {
    if (otp === job.otp) setVerified(true);
  };

  return (
    <ProviderScreen bottomPadding={40}>
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text variant="labelSmall" style={{ color: colors.textTertiary }}>
          {job.bookingId}
        </Text>
        <Text variant="titleMedium" style={{ color: colors.textPrimary, fontWeight: '600' }}>
          {job.service}
        </Text>
        <Text variant="bodySmall" style={{ color: colors.textSecondary, marginTop: 4 }}>
          Customer: {job.customerName}
        </Text>
      </View>

      <View style={styles.section}>
        <Text
          variant="titleSmall"
          style={{ color: colors.textPrimary, fontWeight: '600', marginBottom: 12 }}
        >
          Verify OTP
        </Text>
        <Text variant="bodySmall" style={{ color: colors.textSecondary, marginBottom: 12 }}>
          Ask the customer for their 4-digit OTP to start the service.
        </Text>
        <OtpInput length={4} value={otp} onChange={setOtp} />
        {!verified ? (
          <PrimaryButton
            label="Verify OTP"
            onPress={handleVerify}
            style={{ marginTop: 16 }}
            disabled={otp.length < 4}
          />
        ) : (
          <View style={[styles.verified, { backgroundColor: colors.successContainer }]}>
            <Text variant="labelLarge" style={{ color: colors.success, fontWeight: '600' }}>
              OTP verified — service started
            </Text>
          </View>
        )}
      </View>

      {verified ? (
        <>
          <View
            style={[styles.timer, { backgroundColor: colors.surface, borderColor: colors.border }]}
          >
            <Text variant="labelMedium" style={{ color: colors.textSecondary }}>
              Service timer
            </Text>
            <Text variant="displaySmall" style={{ color: colors.textPrimary, fontWeight: '700' }}>
              00:00:00
            </Text>
            <Text variant="bodySmall" style={{ color: colors.textTertiary }}>
              Timer will track once backend is connected
            </Text>
          </View>

          <View style={styles.section}>
            <Text
              variant="titleSmall"
              style={{ color: colors.textPrimary, fontWeight: '600', marginBottom: 12 }}
            >
              Before photos
            </Text>
            <UploadButton label="Upload before images" onUploaded={() => {}} />
          </View>

          <View style={styles.section}>
            <TextInput
              label="Notes"
              placeholder="Any observations before starting..."
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
            />
          </View>

          <PrimaryButton
            label="Proceed to complete"
            onPress={() => navigation.navigate('CompleteService', { jobId: job.id })}
            style={{ marginHorizontal: 20 }}
          />
        </>
      ) : null}
    </ProviderScreen>
  );
}

const styles = StyleSheet.create({
  card: { marginHorizontal: 20, padding: 16, borderRadius: 14, borderWidth: 1, marginBottom: 20 },
  section: { paddingHorizontal: 20, marginBottom: 20 },
  verified: { marginTop: 16, padding: 14, borderRadius: 12, alignItems: 'center' },
  timer: {
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    gap: 4,
    marginBottom: 20,
  },
});
