import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { CustomerScreen, ProfileMenuItem } from '@/components/customer';
import { Avatar, SecondaryButton } from '@/components/ui';
import { MOCK_IMAGES } from '@/constants/customer/images';
import { MOCK_USER } from '@/constants/customer';
import { useAppTheme } from '@/hooks';
import { navigateToAuth } from '@/navigation/utils';
import type { ProfileStackParamList } from '@/navigation/types/customer.types';

type Props = NativeStackScreenProps<ProfileStackParamList, 'ProfileMain'>;

export function ProfileScreen({ navigation }: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <CustomerScreen>
      <View style={[styles.profileHeader, { borderBottomColor: colors.border }]}>
        <Avatar source={{ uri: MOCK_IMAGES.userAvatar }} name={MOCK_USER.name} size="xl" />
        <View style={styles.profileInfo}>
          <Text variant="titleLarge" style={{ fontWeight: '600', color: colors.textPrimary }}>
            {MOCK_USER.name}
          </Text>
          <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
            {MOCK_USER.phone}
          </Text>
          <Text variant="bodySmall" style={{ color: colors.textTertiary }}>
            {MOCK_USER.email}
          </Text>
        </View>
      </View>

      <View style={[styles.menu, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <ProfileMenuItem
          icon="map-marker-outline"
          label="Saved Addresses"
          onPress={() => undefined}
        />
        <ProfileMenuItem
          icon="credit-card-outline"
          label="Payment Methods"
          onPress={() => undefined}
        />
        <ProfileMenuItem
          icon="star-outline"
          label="My Reviews"
          onPress={() => navigation.navigate('Reviews')}
        />
        <ProfileMenuItem
          icon="cog-outline"
          label="Settings"
          onPress={() => navigation.navigate('Settings')}
        />
        <ProfileMenuItem
          icon="help-circle-outline"
          label="Help & Support"
          onPress={() => navigation.navigate('HelpSupport')}
        />
      </View>

      <View style={styles.logoutWrap}>
        <SecondaryButton
          label="Logout"
          variant="outline"
          onPress={() =>
            Alert.alert('Logout', 'Are you sure you want to logout?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Logout', style: 'destructive', onPress: () => navigateToAuth(navigation) },
            ])
          }
        />
      </View>
    </CustomerScreen>
  );
}

const styles = StyleSheet.create({
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  profileInfo: {
    flex: 1,
    gap: 2,
  },
  menu: {
    marginHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 20,
  },
  logoutWrap: {
    paddingHorizontal: 20,
  },
});
