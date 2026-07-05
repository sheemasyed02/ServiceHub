import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { ProviderScreen } from '@/components/provider';
import { PrimaryButton, SecondaryButton, TextInput, UploadButton } from '@/components/ui';
import { getJobRequestById } from '@/constants/provider';
import { useAppTheme } from '@/hooks';
import type { ProviderJobsStackParamList } from '@/navigation/types/provider.types';

type Props = NativeStackScreenProps<ProviderJobsStackParamList, 'CompleteService'>;

export function CompleteServiceScreen({ navigation, route }: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const job = getJobRequestById(route.params.jobId);
  const [materials, setMaterials] = useState('');
  const [charges, setCharges] = useState('');
  const [notes, setNotes] = useState('');

  if (!job) return null;

  return (
    <ProviderScreen bottomPadding={40}>
      <View
        style={[styles.summary, { backgroundColor: colors.surface, borderColor: colors.border }]}
      >
        <Text variant="titleSmall" style={{ color: colors.textPrimary, fontWeight: '600' }}>
          {job.service}
        </Text>
        <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
          {job.customerName} · {job.bookingId}
        </Text>
      </View>

      <View style={styles.section}>
        <Text
          variant="titleSmall"
          style={{ color: colors.textPrimary, fontWeight: '600', marginBottom: 12 }}
        >
          After photos
        </Text>
        <UploadButton label="Upload after images" onUploaded={() => {}} />
      </View>

      <View style={styles.section}>
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

      <View style={styles.actions}>
        <SecondaryButton label="Generate Invoice" onPress={() => {}} style={{ flex: 1 }} />
        <PrimaryButton
          label="Complete Service"
          onPress={() => navigation.popToTop()}
          style={{ flex: 1 }}
        />
      </View>
    </ProviderScreen>
  );
}

const styles = StyleSheet.create({
  summary: {
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 20,
    gap: 4,
  },
  section: { paddingHorizontal: 20, marginBottom: 16, gap: 12 },
  actions: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginTop: 8 },
});
