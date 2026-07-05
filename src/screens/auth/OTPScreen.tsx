import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { AuthScreenLayout } from '@/components/auth';
import { LoadingButton, OtpInput } from '@/components/ui';
import { useAppTheme } from '@/hooks';
import { navigateToMain, navigateToProviderMain } from '@/navigation/utils';
import type { AuthStackParamList } from '@/navigation/types';
import type { OtpFormValues } from '@/types/forms';

type Props = NativeStackScreenProps<AuthStackParamList, 'OTP'>;

const RESEND_SECONDS = 30;

export function OTPScreen({ navigation, route }: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const [submitting, setSubmitting] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const fade = useRef(new Animated.Value(0)).current;

  const contact = route.params?.phone ?? route.params?.email ?? 'your registered contact';
  const flow = route.params?.flow ?? 'register';
  const role = route.params?.role ?? 'customer';

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OtpFormValues>({
    defaultValues: { otp: '' },
    mode: 'onSubmit',
  });

  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 400, useNativeDriver: true }).start();
  }, [fade]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const onSubmit = (_values: OtpFormValues) => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      if (flow === 'forgot') {
        navigation.replace('ResetPassword', { email: route.params?.email });
        return;
      }
      if (role === 'provider') {
        navigateToProviderMain(navigation);
        return;
      }
      navigateToMain(navigation);
    }, 800);
  };

  const handleResend = () => {
    setSecondsLeft(RESEND_SECONDS);
    setValue('otp', '');
  };

  return (
    <AuthScreenLayout
      showBack
      onBack={() => navigation.goBack()}
      title="Enter code"
      subtitle={`Sent to ${contact}`}
    >
      <Animated.View style={{ opacity: fade, gap: 24 }}>
        <Controller
          control={control}
          name="otp"
          rules={{
            required: 'Enter the 6-digit OTP',
            minLength: { value: 6, message: 'OTP must be 6 digits' },
          }}
          render={({ field: { onChange, value } }) => (
            <OtpInput value={value} onChange={onChange} error={errors.otp?.message} />
          )}
        />

        <View style={styles.timerRow}>
          {secondsLeft > 0 ? (
            <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
              Resend in 0:{secondsLeft.toString().padStart(2, '0')}
            </Text>
          ) : (
            <Pressable onPress={handleResend}>
              <Text variant="labelLarge" style={{ color: colors.primaryDark, fontWeight: '700' }}>
                Resend OTP
              </Text>
            </Pressable>
          )}
        </View>

        <LoadingButton
          label="Verify"
          loading={submitting}
          loadingLabel="Verifying..."
          onPress={handleSubmit(onSubmit)}
        />
      </Animated.View>
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
  timerRow: {
    alignItems: 'center',
  },
});
