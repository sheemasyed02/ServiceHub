import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, TextInput as RNTextInput, View } from 'react-native';
import { Text } from 'react-native-paper';

import { AuthScreenLayout, ProviderBrandHeader } from '@/components/auth';
import { LoadingButton, PasswordInput, SecondaryButton, TextInput } from '@/components/ui';
import { useAppTheme } from '@/hooks';
import { resolveProviderIdFromEmail } from '@/constants/provider/accounts';
import { useAppDispatch } from '@/hooks';
import { navigateToProviderMain } from '@/navigation/utils';
import type { AuthStackParamList } from '@/navigation/types';
import { loginAsProvider } from '@/store';
import type { ProviderLoginFormValues } from '@/types/forms';
import { validationRules } from '@/utils/validation';

type Props = NativeStackScreenProps<AuthStackParamList, 'ProviderLogin'>;

export function ProviderLoginScreen({ navigation }: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const dispatch = useAppDispatch();
  const [submitting, setSubmitting] = useState(false);
  const passwordRef = useRef<RNTextInput>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProviderLoginFormValues>({
    defaultValues: { email: '', password: '' },
    mode: 'onSubmit',
  });

  const onSubmit = async (values: ProviderLoginFormValues) => {
    setSubmitting(true);
    const providerId = resolveProviderIdFromEmail(values.email);
    dispatch(loginAsProvider({ providerId }));
    setTimeout(() => {
      setSubmitting(false);
      navigateToProviderMain(navigation);
    }, 600);
  };

  return (
    <AuthScreenLayout
      showBack
      onBack={() => navigation.goBack()}
      header={<ProviderBrandHeader />}
      title="Sign in"
    >
      <View style={styles.form}>
        <Controller
          control={control}
          name="email"
          rules={validationRules.email}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Email"
              placeholder="you@business.com"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.email?.message}
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon="email-outline"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => passwordRef.current?.focus()}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={validationRules.password}
          render={({ field: { onChange, onBlur, value } }) => (
            <PasswordInput
              ref={passwordRef}
              label="Password"
              placeholder="Your password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.password?.message}
              leftIcon="lock-outline"
              returnKeyType="done"
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          )}
        />

        <Pressable onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgot}>
          <Text variant="labelLarge" style={{ color: colors.primaryDark }}>
            Forgot?
          </Text>
        </Pressable>

        <LoadingButton
          label="Sign in"
          loading={submitting}
          loadingLabel="Signing in..."
          onPress={handleSubmit(onSubmit)}
          tone="secondary"
        />
      </View>

      <SecondaryButton
        label="Register"
        onPress={() => navigation.navigate('ProviderRegister')}
        variant="outline"
      />

      <Text variant="bodySmall" style={{ color: colors.textTertiary, textAlign: 'center', marginTop: 8 }}>
        Demo logins: rajesh@servicehub.com (plumber), anjali@servicehub.com or salon@servicehub.com (salon)
      </Text>

      <Pressable onPress={() => navigation.navigate('CustomerLogin')} style={styles.switch}>
        <Text variant="bodyMedium" style={{ color: colors.textSecondary, textAlign: 'center' }}>
          Customer?{' '}
          <Text style={{ color: colors.primaryDark, fontWeight: '700' }}>Sign in here</Text>
        </Text>
      </Pressable>
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 14,
  },
  forgot: {
    alignSelf: 'flex-end',
  },
  switch: {
    paddingVertical: 8,
  },
});
