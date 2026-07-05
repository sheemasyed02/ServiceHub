import { View } from 'react-native';

import { TextInput } from '@/components/ui';

import { BottomSheet, SheetFooter, SheetOption } from './BottomSheet';
import type { ApplyCouponSheetProps } from './types';

export function ApplyCouponSheet({
  visible,
  onClose,
  coupons,
  selectedCode,
  manualCode,
  onManualCodeChange,
  onSelectCoupon,
  onApply,
}: ApplyCouponSheetProps) {
  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title="Apply Coupon"
      footer={
        <SheetFooter
          label="Apply Coupon"
          onApply={() => {
            onApply();
            onClose();
          }}
        />
      }
    >
      <TextInput
        label="Enter code"
        placeholder="Type coupon code"
        value={manualCode}
        onChangeText={onManualCodeChange}
        autoCapitalize="characters"
        leftIcon="ticket-percent-outline"
      />

      <View style={{ gap: 10, marginTop: 8 }}>
        {coupons.map((coupon) => (
          <SheetOption
            key={coupon.code}
            label={coupon.title}
            description={`${coupon.discount} · ${coupon.code}`}
            icon="tag-outline"
            selected={selectedCode === coupon.code}
            onPress={() => onSelectCoupon(coupon.code)}
          />
        ))}
      </View>
    </BottomSheet>
  );
}
