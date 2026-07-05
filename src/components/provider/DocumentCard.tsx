import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useAppTheme } from '@/hooks';
import type { VerificationStatus } from '@/types/provider';

const STATUS_CONFIG: Record<
  VerificationStatus,
  { label: string; colorKey: 'success' | 'warning' | 'error' | 'textTertiary' }
> = {
  verified: { label: 'Verified', colorKey: 'success' },
  pending: { label: 'Pending', colorKey: 'warning' },
  rejected: { label: 'Rejected', colorKey: 'error' },
  not_uploaded: { label: 'Not uploaded', colorKey: 'textTertiary' },
};

export type DocumentCardProps = {
  title: string;
  status: VerificationStatus;
  uploadedAt?: string;
  onUpload: () => void;
  onReplace: () => void;
  onPreview: () => void;
};

export function DocumentCard({
  title,
  status,
  uploadedAt,
  onUpload,
  onReplace,
  onPreview,
}: DocumentCardProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const config = STATUS_CONFIG[status];
  const statusColor = colors[config.colorKey];

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.header}>
        <View style={[styles.docIcon, { backgroundColor: `${colors.primary}12` }]}>
          <MaterialCommunityIcons
            name="file-document-outline"
            size={22}
            color={colors.primaryDark}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text variant="titleSmall" style={{ color: colors.textPrimary }}>
            {title}
          </Text>
          <View style={styles.statusRow}>
            <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
            <Text variant="labelSmall" style={{ color: statusColor }}>
              {config.label}
            </Text>
            {uploadedAt ? (
              <Text variant="labelSmall" style={{ color: colors.textTertiary }}>
                · {uploadedAt}
              </Text>
            ) : null}
          </View>
        </View>
      </View>
      <View style={styles.actions}>
        {status === 'not_uploaded' ? (
          <ActionBtn label="Upload" icon="upload" onPress={onUpload} primary />
        ) : (
          <>
            <ActionBtn label="Preview" icon="eye-outline" onPress={onPreview} />
            <ActionBtn label="Replace" icon="swap-horizontal" onPress={onReplace} />
          </>
        )}
      </View>
    </View>
  );
}

function ActionBtn({
  label,
  icon,
  onPress,
  primary,
}: {
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress: () => void;
  primary?: boolean;
}) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.actionBtn,
        primary
          ? { backgroundColor: colors.primary }
          : { backgroundColor: colors.surfaceVariant, borderColor: colors.border, borderWidth: 1 },
      ]}
    >
      <MaterialCommunityIcons
        name={icon}
        size={16}
        color={primary ? colors.onPrimary : colors.textPrimary}
      />
      <Text
        variant="labelMedium"
        style={{ color: primary ? colors.onPrimary : colors.textPrimary, fontWeight: '600' }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    gap: 12,
  },
  header: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  docIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  actions: { flexDirection: 'row', gap: 8 },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
