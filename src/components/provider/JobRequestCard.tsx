import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

import { Avatar, PrimaryButton, SecondaryButton } from '@/components/ui';
import { useAppTheme } from '@/hooks';
import type { JobRequest } from '@/types/provider';

export type JobRequestCardProps = {
  request: JobRequest;
  onAccept: () => void;
  onReject: () => void;
  onPress?: () => void;
};

export function JobRequestCard({ request, onAccept, onReject, onPress }: JobRequestCardProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  const renderRightActions = (
    _progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
  ) => {
    const trans = dragX.interpolate({
      inputRange: [-160, 0],
      outputRange: [0, 160],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[styles.swipeActions, { transform: [{ translateX: trans }] }]}>
        <RectButton
          style={[styles.swipeBtn, { backgroundColor: colors.success }]}
          onPress={onAccept}
        >
          <MaterialCommunityIcons name="check" size={22} color={colors.white} />
          <Text variant="labelSmall" style={{ color: colors.white }}>
            Accept
          </Text>
        </RectButton>
        <RectButton style={[styles.swipeBtn, { backgroundColor: colors.error }]} onPress={onReject}>
          <MaterialCommunityIcons name="close" size={22} color={colors.white} />
          <Text variant="labelSmall" style={{ color: colors.white }}>
            Reject
          </Text>
        </RectButton>
      </Animated.View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions} overshootRight={false}>
      <Pressable
        onPress={onPress}
        style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
      >
        <View style={styles.topRow}>
          <Avatar source={{ uri: request.customerAvatar }} name={request.customerName} size="md" />
          <View style={{ flex: 1 }}>
            <Text variant="titleSmall" style={{ color: colors.textPrimary }}>
              {request.customerName}
            </Text>
            <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
              {request.service}
            </Text>
          </View>
          <Text variant="labelLarge" style={{ color: colors.primaryDark, fontWeight: '700' }}>
            ₹{request.estimatedEarnings}
          </Text>
        </View>

        <View style={styles.metaRow}>
          <MetaChip icon="map-marker-outline" label={request.distance} />
          <MetaChip icon="clock-outline" label={request.duration} />
          <MetaChip icon="calendar-clock" label={request.scheduledAt} />
        </View>

        <View style={styles.actions}>
          <SecondaryButton label="Reject" onPress={onReject} size="sm" style={{ flex: 1 }} />
          <PrimaryButton label="Accept" onPress={onAccept} size="sm" style={{ flex: 1 }} />
        </View>
      </Pressable>
    </Swipeable>
  );
}

function MetaChip({
  icon,
  label,
}: {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
}) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <View style={styles.chip}>
      <MaterialCommunityIcons name={icon} size={14} color={colors.textTertiary} />
      <Text variant="labelSmall" style={{ color: colors.textSecondary }} numberOfLines={1}>
        {label}
      </Text>
    </View>
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
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  actions: { flexDirection: 'row', gap: 10 },
  swipeActions: {
    flexDirection: 'row',
    width: 160,
    marginRight: 20,
  },
  swipeBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderRadius: 14,
    marginLeft: 4,
  },
});
