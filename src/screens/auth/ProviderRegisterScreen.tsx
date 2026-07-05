import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { AuthScreenLayout, ProviderBrandHeader } from '@/components/auth';
import {
  LoadingButton,
  PasswordInput,
  SelectInput,
  TextInput,
  UploadButton,
} from '@/components/ui';
import { SERVICE_CATEGORIES } from '@/constants/services';
import { useAppTheme } from '@/hooks';
import type { AuthStackParamList } from '@/navigation/types';
import type { ProviderRegisterFormValues } from '@/types/forms';
import type { PickedMedia } from '@/utils/mediaPicker';
import { validationRules } from '@/utils/validation';

type Props = NativeStackScreenProps<AuthStackParamList, 'ProviderRegister'>;

type UploadErrors = {
  aadhaar?: string;
  selfie?: string;
};

export function ProviderRegisterScreen({ navigation }: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const [submitting, setSubmitting] = useState(false);
  const [aadhaarFile, setAadhaarFile] = useState<PickedMedia | null>(null);
  const [selfieFile, setSelfieFile] = useState<PickedMedia | null>(null);
  const [uploadErrors, setUploadErrors] = useState<UploadErrors>({});

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProviderRegisterFormValues>({
    defaultValues: {
      fullName: '',
      phone: '',
      password: '',
      address: '',
      serviceCategory: '',
      yearsOfExperience: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = (values: ProviderRegisterFormValues) => {
    const nextUploadErrors: UploadErrors = {};

    if (!aadhaarFile) {
      nextUploadErrors.aadhaar = 'Aadhaar is required';
    }
    if (!selfieFile) {
      nextUploadErrors.selfie = 'Selfie is required';
    }

    if (Object.keys(nextUploadErrors).length > 0) {
      setUploadErrors(nextUploadErrors);
      return;
    }

    setUploadErrors({});
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      navigation.navigate('OTP', {
        phone: values.phone,
        flow: 'register',
        role: 'provider',
      });
    }, 700);
  };

  return (
    <AuthScreenLayout
      showBack
      onBack={() => navigation.goBack()}
      header={<ProviderBrandHeader />}
      title="Register"
      footer={
        <Pressable onPress={() => navigation.navigate('ProviderLogin')} style={styles.footerLink}>
          <Text variant="bodyMedium" style={{ color: colors.textSecondary, textAlign: 'center' }}>
            Already have an account?{' '}
            <Text style={{ color: colors.primaryDark, fontWeight: '700' }}>Sign in</Text>
          </Text>
        </Pressable>
      }
    >
      <View style={styles.form}>
        <Controller
          control={control}
          name="fullName"
          rules={validationRules.fullName}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Full Name"
              placeholder="Enter your full name"
              required
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
          name="phone"
          rules={validationRules.phone}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Phone Number"
              placeholder="+91 98765 43210"
              required
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
            <PasswordInput
              label="Password"
              placeholder="Minimum 8 characters"
              required
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.password?.message}
              leftIcon="lock-outline"
            />
          )}
        />

        <Controller
          control={control}
          name="address"
          rules={validationRules.address}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Address"
              placeholder="Street, city, pin code"
              required
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.address?.message}
              leftIcon="map-marker-outline"
              multiline
            />
          )}
        />

        <Controller
          control={control}
          name="serviceCategory"
          rules={validationRules.serviceCategory}
          render={({ field: { onChange, value } }) => (
            <SelectInput
              label="Service Category"
              placeholder="Select a category"
              required
              value={value}
              options={SERVICE_CATEGORIES}
              onSelect={onChange}
              error={errors.serviceCategory?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="yearsOfExperience"
          rules={validationRules.yearsOfExperience}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Years of Experience"
              placeholder="e.g. 5"
              required
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.yearsOfExperience?.message}
              keyboardType="number-pad"
              leftIcon="calendar-clock"
            />
          )}
        />

        <UploadButton
          label="Aadhaar"
          placeholder="Upload photo or PDF"
          required
          mode="document"
          file={aadhaarFile}
          error={uploadErrors.aadhaar}
          onUploaded={(file) => {
            setAadhaarFile(file);
            setUploadErrors((current) => ({ ...current, aadhaar: undefined }));
          }}
        />

        <UploadButton
          label="Selfie"
          placeholder="Upload selfie photo"
          required
          mode="selfie"
          file={selfieFile}
          error={uploadErrors.selfie}
          onUploaded={(file) => {
            setSelfieFile(file);
            setUploadErrors((current) => ({ ...current, selfie: undefined }));
          }}
        />

        <LoadingButton
          label="Register"
          tone="secondary"
          loading={submitting}
          loadingLabel="Registering..."
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
  form: { gap: 14 },
  footerLink: { paddingVertical: 8 },
});
