import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import {
  ApplyCouponSheet,
  ChooseAddressSheet,
  SelectDateSheet,
  SelectTimeSheet,
} from '@/components/bottom-sheets';
import { CustomerScreen } from '@/components/customer';
import { Card, LoadingButton, SelectInput, TextInput, UploadButton } from '@/components/ui';
import {
  BOOKING_DATES,
  BOOKING_TIMES,
  COUPON_OPTIONS,
  SAVED_ADDRESSES,
  getProviderById,
} from '@/constants/customer';
import { useAppTheme } from '@/hooks';
import type { HomeStackParamList } from '@/navigation/types/customer.types';
import type { PickedMedia } from '@/utils/mediaPicker';

type Props = NativeStackScreenProps<HomeStackParamList, 'Booking'>;

type BookingForm = {
  service: string;
  date: string;
  time: string;
  description: string;
  coupon: string;
};

function getDiscount(code: string, basePrice: number) {
  const normalized = code.toUpperCase();
  if (normalized === 'COOL20') return Math.round(basePrice * 0.2);
  if (normalized === 'FIRST100') return Math.min(100, basePrice);
  if (normalized === 'CLEAN15') return Math.round(basePrice * 0.15);
  return 0;
}

export function BookingScreen({ navigation, route }: Props) {
  const theme = useAppTheme();
  const { colors, shadows } = theme.tokens;
  const provider = getProviderById(route.params.providerId);
  const [images, setImages] = useState<PickedMedia[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [addressId, setAddressId] = useState(SAVED_ADDRESSES[0]?.id);
  const [dateOpen, setDateOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);
  const [couponOpen, setCouponOpen] = useState(false);
  const [manualCoupon, setManualCoupon] = useState('');

  const { control, handleSubmit, watch, setValue } = useForm<BookingForm>({
    defaultValues: {
      service: provider?.services[0]?.name ?? '',
      date: '',
      time: '',
      description: '',
      coupon: '',
    },
    mode: 'onSubmit',
  });

  const selectedService = provider?.services.find((s) => s.name === watch('service'));
  const basePrice = selectedService?.price ?? provider?.priceFrom ?? 0;
  const couponCode = watch('coupon');
  const discount = getDiscount(couponCode, basePrice);
  const total = basePrice - discount;
  const selectedAddress = SAVED_ADDRESSES.find((a) => a.id === addressId);

  if (!provider) {
    return (
      <CustomerScreen>
        <Text style={{ padding: 20 }}>Provider not found.</Text>
      </CustomerScreen>
    );
  }

  const onSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      navigation.replace('BookingConfirmation', { bookingId: 'BK-1025' });
    }, 900);
  };

  return (
    <CustomerScreen>
      <View style={styles.form}>
        <Card variant="filled" padding={14}>
          <Text variant="labelSmall" style={{ color: colors.textTertiary }}>
            Provider
          </Text>
          <Text variant="titleMedium" style={{ fontWeight: '700', color: colors.textPrimary }}>
            {provider.name}
          </Text>
          <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
            {provider.profession}
          </Text>
        </Card>

        <Controller
          control={control}
          name="service"
          rules={{ required: 'Select a service' }}
          render={({ field: { onChange, value } }) => (
            <SelectInput
              label="Service"
              required
              placeholder="Select service"
              value={value}
              options={provider.services.map((s) => s.name)}
              onSelect={onChange}
            />
          )}
        />

        <SheetField
          label="Date *"
          value={watch('date')}
          placeholder="Select date"
          onPress={() => setDateOpen(true)}
        />
        <SheetField
          label="Time *"
          value={watch('time')}
          placeholder="Select time"
          onPress={() => setTimeOpen(true)}
        />
        <SheetField
          label="Address *"
          value={selectedAddress?.label}
          placeholder="Choose address"
          description={selectedAddress?.address}
          onPress={() => setAddressOpen(true)}
        />

        <Controller
          control={control}
          name="description"
          rules={{ required: 'Describe the problem' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Problem Description"
              required
              placeholder="Describe the issue..."
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              multiline
              leftIcon="text-box-outline"
            />
          )}
        />

        <UploadButton
          label="Upload Images"
          placeholder="Add photos (optional)"
          mode="document"
          file={images[0] ?? null}
          onUploaded={(file) => setImages((prev) => [...prev, file])}
        />

        <Card variant="outlined" padding={16} style={shadows.sm}>
          <Text variant="labelSmall" style={{ color: colors.textTertiary }}>
            Estimated Price
          </Text>
          <Text variant="headlineSmall" style={{ color: colors.primaryDark, fontWeight: '700' }}>
            ₹{basePrice}
          </Text>
        </Card>

        <SheetField
          label="Coupon"
          value={couponCode}
          placeholder="Apply coupon"
          onPress={() => setCouponOpen(true)}
        />

        <Card variant="filled" padding={16}>
          <SummaryRow label="Service" value={`₹${basePrice}`} />
          {discount > 0 ? <SummaryRow label="Discount" value={`-₹${discount}`} accent /> : null}
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <SummaryRow label="Total" value={`₹${total}`} bold />
        </Card>

        <LoadingButton
          label="Proceed to Book"
          loading={submitting}
          loadingLabel="Processing..."
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      <SelectDateSheet
        visible={dateOpen}
        onClose={() => setDateOpen(false)}
        dates={BOOKING_DATES}
        selectedDate={watch('date')}
        onChange={(date) => setValue('date', date, { shouldValidate: true })}
        onApply={() => undefined}
      />
      <SelectTimeSheet
        visible={timeOpen}
        onClose={() => setTimeOpen(false)}
        times={BOOKING_TIMES}
        selectedTime={watch('time')}
        onChange={(time) => setValue('time', time, { shouldValidate: true })}
        onApply={() => undefined}
      />
      <ChooseAddressSheet
        visible={addressOpen}
        onClose={() => setAddressOpen(false)}
        addresses={SAVED_ADDRESSES}
        selectedId={addressId}
        onChange={setAddressId}
        onApply={() => undefined}
      />
      <ApplyCouponSheet
        visible={couponOpen}
        onClose={() => setCouponOpen(false)}
        coupons={COUPON_OPTIONS}
        selectedCode={couponCode}
        manualCode={manualCoupon}
        onManualCodeChange={setManualCoupon}
        onSelectCoupon={(code) => {
          setManualCoupon(code);
          setValue('coupon', code);
        }}
        onApply={() => setValue('coupon', manualCoupon || couponCode)}
      />
    </CustomerScreen>
  );
}

function SheetField({
  label,
  value,
  placeholder,
  description,
  onPress,
}: {
  label: string;
  value?: string;
  placeholder: string;
  description?: string;
  onPress: () => void;
}) {
  const theme = useAppTheme();
  const { colors, layout } = theme.tokens;

  return (
    <View style={{ gap: 6 }}>
      <Text variant="labelMedium" style={{ fontWeight: '600', color: colors.textPrimary }}>
        {label}
      </Text>
      <Pressable
        onPress={onPress}
        style={[
          styles.sheetField,
          {
            minHeight: layout.inputHeight,
            borderColor: colors.inputBorder,
            backgroundColor: colors.inputBackground,
          },
        ]}
      >
        <View style={{ flex: 1 }}>
          <Text
            variant="bodyLarge"
            style={{ color: value ? colors.textPrimary : colors.placeholder }}
          >
            {value || placeholder}
          </Text>
          {description ? (
            <Text
              variant="bodySmall"
              style={{ color: colors.textTertiary, marginTop: 2 }}
              numberOfLines={1}
            >
              {description}
            </Text>
          ) : null}
        </View>
      </Pressable>
    </View>
  );
}

function SummaryRow({
  label,
  value,
  bold,
  accent,
}: {
  label: string;
  value: string;
  bold?: boolean;
  accent?: boolean;
}) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <View style={styles.summaryRow}>
      <Text
        variant={bold ? 'titleSmall' : 'bodyMedium'}
        style={{ color: colors.textSecondary, fontWeight: bold ? '700' : '400' }}
      >
        {label}
      </Text>
      <Text
        variant={bold ? 'titleSmall' : 'bodyMedium'}
        style={{
          color: accent ? colors.success : colors.textPrimary,
          fontWeight: bold ? '700' : '600',
        }}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { paddingHorizontal: 20, gap: 14 },
  sheetField: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    justifyContent: 'center',
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  divider: { height: 1, marginVertical: 8 },
});
