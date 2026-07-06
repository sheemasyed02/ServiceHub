import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { ProviderScreen } from '@/components/provider';
import { PrimaryButton } from '@/components/ui';
import { NoServicesEmptyState } from '@/components/ui/empty-states';
import { MOCK_PROVIDER_SERVICES } from '@/constants/provider';
import { useAppTheme } from '@/hooks';
import type { ProviderProfileStackParamList } from '@/navigation/types/provider.types';

type Props = NativeStackScreenProps<ProviderProfileStackParamList, 'ServiceManagement'>;

export function ServiceManagementScreen({ navigation }: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const services = MOCK_PROVIDER_SERVICES;

  if (services.length === 0) {
    return (
      <ProviderScreen scroll={false}>
        <NoServicesEmptyState
          onAction={() => navigation.navigate('AddService')}
          style={{ flex: 1 }}
        />
      </ProviderScreen>
    );
  }

  return (
    <ProviderScreen bottomPadding={40}>
      {services.map((service) => (
        <View
          key={service.id}
          style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <View style={styles.cardTop}>
            <View style={{ flex: 1 }}>
              <Text variant="labelSmall" style={{ color: colors.textTertiary }}>
                {service.category}
              </Text>
              <Text variant="titleSmall" style={{ color: colors.textPrimary }}>
                {service.name}
              </Text>
              <Text variant="bodySmall" style={{ color: colors.textSecondary, marginTop: 4 }}>
                ₹{service.basePrice} · {service.duration}
              </Text>
            </View>
            <View style={styles.actions}>
              <Pressable
                hitSlop={8}
                onPress={() => navigation.navigate('AddService', { serviceId: service.id })}
              >
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={20}
                  color={colors.primaryDark}
                />
              </Pressable>
              <Pressable hitSlop={8} onPress={() => {}}>
                <MaterialCommunityIcons name="delete-outline" size={20} color={colors.error} />
              </Pressable>
            </View>
          </View>
        </View>
      ))}

      <PrimaryButton
        label="Add new service"
        onPress={() => navigation.navigate('AddService')}
        style={{ marginHorizontal: 20, marginTop: 8 }}
      />
    </ProviderScreen>
  );
}

const styles = StyleSheet.create({
  card: { marginHorizontal: 20, padding: 14, borderRadius: 14, borderWidth: 1, marginBottom: 10 },
  cardTop: { flexDirection: 'row', alignItems: 'flex-start' },
  actions: { flexDirection: 'row', gap: 12 },
});
