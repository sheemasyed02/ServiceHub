import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, View } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';

import { AuthScreenLayout } from '@/components/auth';
import {
  LoadingButton,
  PasswordInput,
  PasswordStrengthIndicator,
  TextInput,
} from '@/components/ui';
import { useAppTheme } from '@/hooks';
import type { AuthStackParamList } from '@/navigation/types';
import type { CustomerRegisterFormValues } from '@/types/forms';
import { validateConfirmPassword, validationRules } from '@/utils/validation';

type Props = NativeStackScreenProps<AuthStackParamList, 'CustomerRegister'>;

export function CustomerRegisterScreen({ navigation }: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const [submitting, setSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CustomerRegisterFormValues>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
    mode: 'onSubmit',
  });

  const password = watch('password');

  const onSubmit = (_values: CustomerRegisterFormValues) => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      navigation.navigate('OTP', {
        phone: _values.phone,
        email: _values.email,
        flow: 'register',
        role: 'customer',
      });
    }, 700);
  };

  return (
    <AuthScreenLayout showBack onBack={() => navigation.goBack()} title="Register">
      <View style={styles.form}>
        <Controller
          control={control}
          name="fullName"
          rules={validationRules.fullName}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Full Name"
              placeholder="John Doe"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.fullName?.message}
              leftIcon="account-outline"
              autoCapitalize="words"
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          rules={validationRules.email}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Email"
              placeholder="you@example.com"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.email?.message}
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon="email-outline"
            />
          )}
        />

        <Controller
          control={control}
          name="phone"
          rules={validationRules.phone}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Phone"
              placeholder="+91 98765 43210"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.phone?.message}
              keyboardType="phone-pad"
              leftIcon="phone-outline"
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={validationRules.password}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ gap: 8 }}>
              <PasswordInput
                label="Password"
                placeholder="Create a password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password?.message}
                leftIcon="lock-outline"
              />
              <PasswordStrengthIndicator password={value} />
            </View>
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: 'Confirm your password',
            validate: (value) => validateConfirmPassword(password, value),
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <PasswordInput
              label="Confirm Password"
              placeholder="Re-enter password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.confirmPassword?.message}
              leftIcon="lock-check-outline"
            />
          )}
        />

        <Controller
          control={control}
          name="acceptTerms"
          rules={{ validate: validationRules.terms.validate }}
          render={({ field: { onChange, value } }) => (
            <Pressable style={styles.terms} onPress={() => onChange(!value)}>
              <Checkbox status={value ? 'checked' : 'unchecked'} onPress={() => onChange(!value)} />
              <Text variant="bodyMedium" style={{ color: colors.textSecondary, flex: 1 }}>
                I agree to Terms & Privacy
              </Text>
            </Pressable>
          )}
        />
        {errors.acceptTerms ? (
          <Text variant="bodySmall" style={{ color: colors.error }}>
            {errors.acceptTerms.message}
          </Text>
        ) : null}

        <LoadingButton
          label="Register"
          loading={submitting}
          loadingLabel="Please wait..."
          onPress={handleSubmit(onSubmit)}
        />

        <Pressable onPress={() => navigation.navigate('CustomerLogin')}>
          <Text variant="bodyMedium" style={{ color: colors.textSecondary, textAlign: 'center' }}>
            Already have an account?{' '}
            <Text style={{ color: colors.primaryDark, fontWeight: '700' }}>Sign in</Text>
          </Text>
        </Pressable>
      </View>
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
  form: { gap: 16 },
  terms: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
  },
});
