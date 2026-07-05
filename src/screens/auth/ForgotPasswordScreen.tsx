import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { AuthScreenLayout } from '@/components/auth';
import { LoadingButton, TextInput } from '@/components/ui';
import type { AuthStackParamList } from '@/navigation/types';
import type { ForgotPasswordFormValues } from '@/types/forms';
import { validationRules } from '@/utils/validation';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

export function ForgotPasswordScreen({ navigation }: Props) {
  const [submitting, setSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: { email: '' },
    mode: 'onSubmit',
  });

  const onSubmit = (values: ForgotPasswordFormValues) => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      navigation.navigate('OTP', { email: values.email, flow: 'forgot' });
    }, 700);
  };

  return (
    <AuthScreenLayout
      showBack
      onBack={() => navigation.goBack()}
      title="Reset password"
      subtitle="We'll send a code to your email."
    >
      <View style={styles.form}>
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

        <LoadingButton
          label="Send OTP"
          loading={submitting}
          loadingLabel="Sending..."
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
  form: { gap: 16 },
});
