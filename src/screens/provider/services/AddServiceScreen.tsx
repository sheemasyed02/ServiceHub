import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { ProviderScreen } from '@/components/provider';
import { PrimaryButton, SelectInput, TextInput } from '@/components/ui';
import { getProviderServiceById } from '@/constants/provider';
import { SERVICE_CATEGORIES } from '@/constants/services';
import type { ProviderProfileStackParamList } from '@/navigation/types/provider.types';

type Props = NativeStackScreenProps<ProviderProfileStackParamList, 'AddService'>;

type AddServiceForm = {
  category: string;
  name: string;
  description: string;
  basePrice: string;
  duration: string;
  availableDays: string;
};

export function AddServiceScreen({ navigation, route }: Props) {
  const existing = route.params?.serviceId
    ? getProviderServiceById(route.params.serviceId)
    : undefined;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddServiceForm>({
    defaultValues: {
      category: existing?.category ?? '',
      name: existing?.name ?? '',
      description: existing?.description ?? '',
      basePrice: existing ? String(existing.basePrice) : '',
      duration: existing?.duration ?? '',
      availableDays: existing?.availableDays.join(', ') ?? 'Mon, Tue, Wed, Thu, Fri, Sat',
    },
  });

  const onSubmit = (_values: AddServiceForm) => {
    navigation.goBack();
  };

  return (
    <ProviderScreen bottomPadding={40}>
      <View style={styles.form}>
        <Controller
          control={control}
          name="category"
          rules={{ required: 'Category is required' }}
          render={({ field: { onChange, value } }) => (
            <SelectInput
              label="Service category"
              required
              value={value}
              onSelect={onChange}
              options={SERVICE_CATEGORIES}
              error={errors.category?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="name"
          rules={{ required: 'Service name is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Service name"
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
          name="description"
          rules={{ required: 'Description is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Description"
              required
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.description?.message}
              multiline
              numberOfLines={3}
            />
          )}
        />

        <Controller
          control={control}
          name="basePrice"
          rules={{ required: 'Base price is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Base price (₹)"
              required
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.basePrice?.message}
              keyboardType="numeric"
            />
          )}
        />

        <Controller
          control={control}
          name="duration"
          rules={{ required: 'Duration is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Estimated duration"
              required
              placeholder="e.g. 45 min"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.duration?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="availableDays"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Available days"
              placeholder="Mon, Tue, Wed..."
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />

        <PrimaryButton
          label="Save service"
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
