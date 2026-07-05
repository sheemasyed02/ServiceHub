import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { AuthScreenLayout } from '@/components/auth';
import { LoadingButton, PasswordInput, PasswordStrengthIndicator } from '@/components/ui';
import type { AuthStackParamList } from '@/navigation/types';
import type { ResetPasswordFormValues } from '@/types/forms';
import { validateConfirmPassword, validationRules } from '@/utils/validation';

type Props = NativeStackScreenProps<AuthStackParamList, 'ResetPassword'>;

export function ResetPasswordScreen({ navigation, route }: Props) {
  const [submitting, setSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    defaultValues: { password: '', confirmPassword: '' },
    mode: 'onSubmit',
  });

  const password = watch('password');

  const onSubmit = (_values: ResetPasswordFormValues) => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      navigation.replace('CustomerLogin');
    }, 700);
  };

  return (
    <AuthScreenLayout
      showBack
      onBack={() => navigation.goBack()}
      title="New password"
      subtitle={route.params?.email ? route.params.email : undefined}
    >
      <View style={styles.form}>
        <Controller
          control={control}
          name="password"
          rules={validationRules.password}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ gap: 6 }}>
              <PasswordInput
                label="Password"
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
              label="Confirm"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.confirmPassword?.message}
              leftIcon="lock-check-outline"
            />
          )}
        />

        <LoadingButton
          label="Save"
          loading={submitting}
          loadingLabel="Saving..."
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
  form: { gap: 14 },
});
