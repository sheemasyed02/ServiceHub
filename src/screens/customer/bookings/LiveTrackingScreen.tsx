import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { CustomerScreen, MapPlaceholder } from '@/components/customer';
import { Card, PrimaryButton, SecondaryButton } from '@/components/ui';
import { useAppDispatch, useAppTheme, useBooking } from '@/hooks';
import type { BookingsStackParamList } from '@/navigation/types/customer.types';
import { cancelBooking } from '@/store';

type Props = NativeStackScreenProps<BookingsStackParamList, 'LiveTracking'>;

export function LiveTrackingScreen({ route, navigation }: Props) {
  const theme = useAppTheme();
  const { colors, shadows } = theme.tokens;
  const dispatch = useAppDispatch();
  const booking = useBooking(route.params.bookingId);

  return (
    <CustomerScreen scroll={false} bottomPadding={0}>
      <MapPlaceholder />

      <View style={[styles.sheet, shadows.lg, { backgroundColor: colors.surface }]}>
        <View style={styles.handle} />

        <Text variant="titleMedium" style={{ fontWeight: '700', color: colors.textPrimary }}>
          {booking?.providerName ?? 'Provider'} is on the way
        </Text>

        <Card variant="filled" padding={16} style={{ marginTop: 16 }}>
          <View style={styles.etaRow}>
            <MaterialCommunityIcons name="clock-outline" size={22} color={colors.primaryDark} />
            <View>
              <Text variant="labelSmall" style={{ color: colors.textTertiary }}>
                Estimated arrival
              </Text>
              <Text variant="titleLarge" style={{ color: colors.primaryDark, fontWeight: '700' }}>
                {booking?.estimatedArrival ?? '12 min'}
              </Text>
            </View>
          </View>
        </Card>

        <View style={styles.actions}>
          <SecondaryButton
            label="Call"
            variant="outline"
            fullWidth={false}
            icon={<MaterialCommunityIcons name="phone" size={18} color={colors.primaryDark} />}
            onPress={() => undefined}
            style={styles.actionBtn}
          />
          <SecondaryButton
            label="Chat"
            variant="outline"
            fullWidth={false}
            icon={
              <MaterialCommunityIcons name="message-text" size={18} color={colors.primaryDark} />
            }
            onPress={() =>
              navigation.getParent()?.navigate('Chat', {
                screen: 'ChatConversation',
                params: { threadId: 't1' },
              })
            }
            style={styles.actionBtn}
          />
          <PrimaryButton
            label="Cancel"
            tone="secondary"
            fullWidth={false}
            onPress={() => {
              if (booking) dispatch(cancelBooking(booking.id));
            }}
            style={styles.actionBtn}
          />
        </View>
      </View>
    </CustomerScreen>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 90,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 24,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E4E4E7',
    alignSelf: 'center',
    marginBottom: 16,
  },
  etaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  actionBtn: {
    flex: 1,
  },
});
