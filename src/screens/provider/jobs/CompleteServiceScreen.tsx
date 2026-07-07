import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { InsetGroup } from '@/components/customer';
import { ProviderScreen } from '@/components/provider';
import { PrimaryButton, SecondaryButton, TextInput, UploadButton } from '@/components/ui';
import { useAppDispatch, useAppTheme, useProviderJob } from '@/hooks';
import type { ProviderJobsStackParamList } from '@/navigation/types/provider.types';
import { completeBooking } from '@/store';

type Props = NativeStackScreenProps<ProviderJobsStackParamList, 'CompleteService'>;

export function CompleteServiceScreen({ navigation, route }: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const dispatch = useAppDispatch();
  const job = useProviderJob(route.params.jobId);
  const [materials, setMaterials] = useState('');
  const [charges, setCharges] = useState('');
  const [notes, setNotes] = useState('');

  if (!job) return null;

  return (
    <ProviderScreen bottomPadding={40}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={{ color: colors.textPrimary, fontWeight: '700' }}>
          Complete service
        </Text>
        <Text variant="bodyMedium" style={{ color: colors.textSecondary, marginTop: 4 }}>
          Finalize job and collect payment
        </Text>
      </View>

      <InsetGroup style={styles.group}>
        <View style={styles.summaryRow}>
          <Text variant="titleSmall" style={{ color: colors.textPrimary, fontWeight: '600' }}>
            {job.service}
          </Text>
          <Text variant="bodySmall" style={{ color: colors.textSecondary, marginTop: 4 }}>
            {job.customerName} · {job.bookingId}
          </Text>
          <Text variant="titleMedium" style={{ color: colors.primaryDark, fontWeight: '700', marginTop: 8 }}>
            ₹{job.estimatedEarnings}
          </Text>
        </View>
      </InsetGroup>

      <InsetGroup style={styles.group}>
        <View style={styles.sectionInner}>
          <Text variant="titleSmall" style={{ color: colors.textPrimary, fontWeight: '600', marginBottom: 12 }}>
            After photos
          </Text>
          <UploadButton label="Upload after images" onUploaded={() => {}} />
        </View>
      </InsetGroup>

      <InsetGroup style={styles.group}>
        <View style={styles.sectionInner}>
          <TextInput
            label="Additional charges (₹)"
            placeholder="0"
            value={charges}
            onChangeText={setCharges}
            keyboardType="numeric"
          />
          <TextInput
            label="Materials used"
            placeholder="List any materials used..."
            value={materials}
            onChangeText={setMaterials}
            multiline
            numberOfLines={2}
          />
          <TextInput
            label="Notes"
            placeholder="Final notes for the customer..."
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
          />
        </View>
      </InsetGroup>

      <View style={styles.actions}>
        <SecondaryButton label="Generate invoice" onPress={() => {}} style={{ flex: 1 }} />
        <PrimaryButton
          label="Complete service"
          onPress={() => {
            dispatch(completeBooking(job.id));
            navigation.popToTop();
          }}
          style={{ flex: 1 }}
        />
      </View>
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
  sectionInner: { paddingHorizontal: 16, paddingVertical: 14, gap: 12 },
  actions: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginTop: 8 },
});
