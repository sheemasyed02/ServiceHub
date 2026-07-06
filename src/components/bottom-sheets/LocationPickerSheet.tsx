import { ActivityIndicator, ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';

import { SAVED_ADDRESSES } from '@/constants/customer';
import { useAppTheme } from '@/hooks';

import { BottomSheet, SheetOption } from './BottomSheet';
import type { AddressOption } from './types';

export type LocationPickerSheetProps = {
  visible: boolean;
  onClose: () => void;
  loading?: boolean;
  currentLabel?: string;
  onUseCurrentLocation: () => void;
  onSelectAddress: (address: AddressOption) => void;
};

export function LocationPickerSheet({
  visible,
  onClose,
  loading = false,
  currentLabel,
  onUseCurrentLocation,
  onSelectAddress,
}: LocationPickerSheetProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <BottomSheet visible={visible} onClose={onClose} title="Choose location">
      <ScrollView style={{ maxHeight: 380 }} showsVerticalScrollIndicator={false}>
        <SheetOption
          label="Use current location"
          description={loading ? 'Detecting your area…' : 'Based on GPS'}
          icon="crosshairs-gps"
          selected={false}
          onPress={onUseCurrentLocation}
        />

        {loading ? (
          <View style={{ alignItems: 'center', paddingVertical: 16 }}>
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : null}

        {currentLabel ? (
          <Text
            variant="labelMedium"
            style={{ color: colors.textTertiary, marginTop: 8, marginBottom: 4 }}
          >
            Currently: {currentLabel}
          </Text>
        ) : null}

        <Text
          variant="labelMedium"
          style={{ color: colors.textTertiary, marginTop: 12, marginBottom: 4 }}
        >
          Saved addresses
        </Text>

        {SAVED_ADDRESSES.map((item) => (
          <SheetOption
            key={item.id}
            label={item.label}
            description={item.address}
            icon={
              item.type === 'home'
                ? 'home-outline'
                : item.type === 'work'
                  ? 'briefcase-outline'
                  : 'map-marker-outline'
            }
            selected={false}
            onPress={() => {
              onSelectAddress(item);
              onClose();
            }}
          />
        ))}
      </ScrollView>
    </BottomSheet>
  );
}
