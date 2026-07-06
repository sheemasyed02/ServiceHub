import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, TextInput as RNTextInput, View } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';

import { AuthScreenLayout, SocialAuthButtons } from '@/components/auth';
import { Divider, LoadingButton, PasswordInput, TextInput } from '@/components/ui';
import { useAppTheme } from '@/hooks';
import { useAppDispatch } from '@/hooks';
import { navigateToMain } from '@/navigation/utils';
import type { AuthStackParamList } from '@/navigation/types';
import { loginAsCustomer } from '@/store';
import type { CustomerLoginFormValues } from '@/types/forms';
import { validationRules } from '@/utils/validation';

type Props = NativeStackScreenProps<AuthStackParamList, 'CustomerLogin'>;

export function CustomerLoginScreen({ navigation }: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const dispatch = useAppDispatch();
  const [submitting, setSubmitting] = useState(false);
  const passwordRef = useRef<RNTextInput>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerLoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (_values: CustomerLoginFormValues) => {
    setSubmitting(true);
    dispatch(loginAsCustomer(undefined));
    setTimeout(() => {
      setSubmitting(false);
      navigateToMain(navigation);
    }, 600);
  };

  return (
    <AuthScreenLayout
      showBack
      onBack={() => navigation.goBack()}
      title="Sign in"
      footer={
        <Pressable
          onPress={() => navigation.navigate('CustomerRegister')}
          style={styles.footerLink}
        >
          <Text variant="bodyMedium" style={{ color: colors.textSecondary, textAlign: 'center' }}>
            No account?{' '}
            <Text style={{ color: colors.primaryDark, fontWeight: '700' }}>Register</Text>
          </Text>
        </Pressable>
      }
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
              autoComplete="email"
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

        <View style={styles.row}>
          <Controller
            control={control}
            name="rememberMe"
            render={({ field: { onChange, value } }) => (
              <Pressable style={styles.remember} onPress={() => onChange(!value)}>
                <Checkbox
                  status={value ? 'checked' : 'unchecked'}
                  onPress={() => onChange(!value)}
                  color={colors.primary}
                />
                <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
                  Remember me
                </Text>
              </Pressable>
            )}
          />
          <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
            <Text variant="labelLarge" style={{ color: colors.primaryDark }}>
              Forgot?
            </Text>
          </Pressable>
        </View>

        <LoadingButton
          label="Sign in"
          loading={submitting}
          loadingLabel="Signing in..."
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      <Divider label="or" />

      <SocialAuthButtons disabled={submitting} />
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  remember: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerLink: {
    paddingVertical: 8,
  },
});
