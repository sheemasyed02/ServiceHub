import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';
import { Alert, StyleSheet, View } from 'react-native';

import { CustomerScreen } from '@/components/customer';
import { PrimaryButton, TextInput } from '@/components/ui';
import { useAppDispatch, useCustomerUser } from '@/hooks';
import type { ProfileStackParamList } from '@/navigation/types/customer.types';
import { saveCustomerUser } from '@/services/customerStorage';
import { updateUser } from '@/store';
import { validationRules } from '@/utils/validation';

type Props = NativeStackScreenProps<ProfileStackParamList, 'EditProfile'>;

type EditProfileForm = {
  name: string;
  phone: string;
  email: string;
  location: string;
};

export function EditProfileScreen({ navigation }: Props) {
  const user = useCustomerUser();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileForm>({
    defaultValues: {
      name: user.name,
      phone: user.phone,
      email: user.email,
      location: user.location,
    },
  });

  const onSubmit = async (values: EditProfileForm) => {
    dispatch(updateUser(values));
    await saveCustomerUser({ ...user, ...values });
    Alert.alert('Saved', 'Your profile has been updated.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <CustomerScreen bottomPadding={40} edges={['left', 'right']}>
      <View style={styles.form}>
        <Controller
          control={control}
          name="name"
          rules={{ required: 'Name is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Full name"
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
          name="location"
          rules={{ required: 'Location is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Location"
              required
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.location?.message}
            />
          )}
        />
        <PrimaryButton
          label="Save changes"
          onPress={handleSubmit(onSubmit)}
          style={{ marginTop: 8 }}
        />
      </View>
    </CustomerScreen>
  );
}

const styles = StyleSheet.create({
  form: { paddingHorizontal: 20, gap: 12 },
});
