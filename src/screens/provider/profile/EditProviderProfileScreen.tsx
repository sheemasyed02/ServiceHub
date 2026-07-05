import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { ProviderScreen } from '@/components/provider';
import { PrimaryButton, TextInput, UploadButton } from '@/components/ui';
import { MOCK_PROVIDER_USER } from '@/constants/provider';
import type { ProviderProfileStackParamList } from '@/navigation/types/provider.types';
import { validationRules } from '@/utils/validation';

type Props = NativeStackScreenProps<ProviderProfileStackParamList, 'EditProfile'>;

type EditProfileForm = {
  name: string;
  phone: string;
  email: string;
  address: string;
  experience: string;
  skills: string;
  languages: string;
  workingHours: string;
};

export function EditProviderProfileScreen({ navigation }: Props) {
  const user = MOCK_PROVIDER_USER;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileForm>({
    defaultValues: {
      name: user.name,
      phone: user.phone,
      email: user.email,
      address: user.address,
      experience: user.experience,
      skills: user.skills.join(', '),
      languages: user.languages.join(', '),
      workingHours: user.workingHours,
    },
  });

  const onSubmit = (_values: EditProfileForm) => {
    navigation.goBack();
  };

  return (
    <ProviderScreen bottomPadding={40}>
      <View style={styles.form}>
        <UploadButton label="Profile picture" mode="selfie" onUploaded={() => {}} />

        <Controller
          control={control}
          name="name"
          rules={{ required: 'Name is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Name"
              required
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.name?.message}
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
              required
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.phone?.message}
              keyboardType="phone-pad"
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
              required
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.email?.message}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />

        <Controller
          control={control}
          name="address"
          rules={{ required: 'Address is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Address"
              required
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.address?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="experience"
          rules={{ required: 'Experience is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Experience"
              required
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.experience?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="skills"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Skills"
              placeholder="Comma separated"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />

        <Controller
          control={control}
          name="languages"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Languages"
              placeholder="Comma separated"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />

        <Controller
          control={control}
          name="workingHours"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Working hours"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />

        <PrimaryButton
          label="Save changes"
          onPress={handleSubmit(onSubmit)}
          style={{ marginTop: 8 }}
        />
      </View>
    </ProviderScreen>
  );
}

const styles = StyleSheet.create({
  form: { paddingHorizontal: 20, gap: 12 },
});
