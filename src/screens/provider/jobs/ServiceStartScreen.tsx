import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { InsetGroup } from '@/components/customer';
import { ProviderScreen } from '@/components/provider';
import { OtpInput, PrimaryButton, TextInput, UploadButton } from '@/components/ui';
import { useAppDispatch, useAppTheme, useProviderJob } from '@/hooks';
import type { ProviderJobsStackParamList } from '@/navigation/types/provider.types';
import { startBooking } from '@/store';

type Props = NativeStackScreenProps<ProviderJobsStackParamList, 'ServiceStart'>;

export function ServiceStartScreen({ navigation, route }: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const dispatch = useAppDispatch();
  const job = useProviderJob(route.params.jobId);
  const [otp, setOtp] = useState('');
  const [notes, setNotes] = useState('');
  const [verified, setVerified] = useState(false);

  if (!job) return null;

  const handleVerify = () => {
    if (otp === job.otp) {
      setVerified(true);
      dispatch(startBooking(job.id));
    }
  };

  return (
    <ProviderScreen bottomPadding={40}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={{ color: colors.textPrimary, fontWeight: '700' }}>
          Start service
        </Text>
        <Text variant="bodyMedium" style={{ color: colors.textSecondary, marginTop: 4 }}>
          Verify OTP to begin the job
        </Text>
      </View>

      <InsetGroup style={styles.group}>
        <View style={styles.summaryRow}>
          <Text variant="labelSmall" style={{ color: colors.textTertiary }}>
            {job.bookingId}
          </Text>
          <Text variant="titleMedium" style={{ color: colors.textPrimary, fontWeight: '600', marginTop: 4 }}>
            {job.service}
          </Text>
          <Text variant="bodySmall" style={{ color: colors.textSecondary, marginTop: 4 }}>
            Customer: {job.customerName}
          </Text>
        </View>
      </InsetGroup>

      <InsetGroup style={styles.group}>
        <View style={styles.sectionInner}>
          <Text variant="titleSmall" style={{ color: colors.textPrimary, fontWeight: '600' }}>
            Verify OTP
          </Text>
          <Text variant="bodySmall" style={{ color: colors.textSecondary, marginTop: 4, marginBottom: 12 }}>
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
      </InsetGroup>

      {verified ? (
        <>
          <InsetGroup style={styles.group}>
            <View style={[styles.sectionInner, styles.timer]}>
              <Text variant="labelMedium" style={{ color: colors.textSecondary }}>
                Service timer
              </Text>
              <Text variant="displaySmall" style={{ color: colors.textPrimary, fontWeight: '700' }}>
                00:00:00
              </Text>
              <Text variant="bodySmall" style={{ color: colors.textTertiary }}>
                Timer tracks active service time
              </Text>
            </View>
          </InsetGroup>

          <InsetGroup style={styles.group}>
            <View style={styles.sectionInner}>
              <Text variant="titleSmall" style={{ color: colors.textPrimary, fontWeight: '600', marginBottom: 12 }}>
                Before photos
              </Text>
              <UploadButton label="Upload before images" onUploaded={() => {}} />
              <TextInput
                label="Notes"
                placeholder="Any observations before starting..."
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={3}
                style={{ marginTop: 12 }}
              />
            </View>
          </InsetGroup>

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
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  group: { marginBottom: 16 },
  summaryRow: { paddingHorizontal: 16, paddingVertical: 14 },
  sectionInner: { paddingHorizontal: 16, paddingVertical: 14 },
  verified: { marginTop: 16, padding: 14, borderRadius: 12, alignItems: 'center' },
  timer: { alignItems: 'center', gap: 4 },
});
