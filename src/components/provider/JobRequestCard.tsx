import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { Avatar } from '@/components/ui';
import { useAppTheme } from '@/hooks';
import type { JobRequest } from '@/types/provider';

export type JobRequestCardProps = {
  request: JobRequest;
  onAccept?: () => void;
  onReject?: () => void;
  onPress?: () => void;
  showDivider?: boolean;
  showActions?: boolean;
};

export function JobRequestCard({
  request,
  onAccept,
  onReject,
  onPress,
  showDivider = false,
  showActions = true,
}: JobRequestCardProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.row,
        showDivider && {
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: colors.divider,
        },
      ]}
    >
      <Avatar source={{ uri: request.customerAvatar }} name={request.customerName} size="md" />
      <View style={styles.body}>
        <View style={styles.top}>
          <Text variant="bodyLarge" numberOfLines={1} style={{ color: colors.textPrimary, flex: 1, fontWeight: '600' }}>
            {request.service}
          </Text>
          <Text variant="labelLarge" style={{ color: colors.textPrimary, fontWeight: '700' }}>
            ₹{request.estimatedEarnings}
          </Text>
        </View>
        <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
          {request.customerName}
        </Text>
        <View style={styles.meta}>
          <Meta icon="map-marker-outline" label={request.distance} />
          <Meta icon="clock-outline" label={request.duration} />
          <Meta icon="calendar-clock" label={request.scheduledAt} />
        </View>
        {showActions && onAccept && onReject ? (
          <View style={styles.actions}>
            <Pressable onPress={onReject} hitSlop={8} style={styles.actionBtn}>
              <Text variant="labelLarge" style={{ color: colors.textSecondary }}>Decline</Text>
            </Pressable>
            <Pressable
              onPress={onAccept}
              hitSlop={8}
              style={[styles.acceptBtn, { backgroundColor: colors.primary }]}
            >
              <Text variant="labelLarge" style={{ color: colors.onPrimary, fontWeight: '600' }}>
                Accept
              </Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}

function Meta({
  icon,
  label,
}: {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
}) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <View style={styles.metaItem}>
      <MaterialCommunityIcons name={icon} size={13} color={colors.textTertiary} />
      <Text variant="labelSmall" style={{ color: colors.textTertiary }} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    gap: 12,
  },
  body: { flex: 1, gap: 4 },
  top: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  meta: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 4 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 10,
  },
  actionBtn: { paddingVertical: 6, paddingHorizontal: 4 },
  acceptBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});
