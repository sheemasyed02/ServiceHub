import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { CustomerScreen, ProfileMenuItem } from '@/components/customer';
import { Avatar, SecondaryButton } from '@/components/ui';
import { MOCK_IMAGES } from '@/constants/customer/images';
import { useAppTheme, useCustomerUser } from '@/hooks';
import { useAppDispatch } from '@/hooks';
import { navigateToAuth } from '@/navigation/utils';
import type { ProfileStackParamList } from '@/navigation/types/customer.types';
import { logout } from '@/store';
import { clearAuth } from '@/services/appStorage';

type Props = NativeStackScreenProps<ProfileStackParamList, 'ProfileMain'>;

export function ProfileScreen({ navigation }: Props) {
  const theme = useAppTheme();
  const { colors, shadows } = theme.tokens;
  const dispatch = useAppDispatch();
  const user = useCustomerUser();

  const header = (
    <LinearGradient
      colors={['#FFF4D6', '#E8EBF2']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.hero}
    >
      <View style={[styles.profileCard, { backgroundColor: colors.surface, ...shadows.md }]}>
        <Avatar source={{ uri: MOCK_IMAGES.userAvatar }} name={user.name} size="xl" />
        <View style={styles.profileInfo}>
          <Text variant="titleLarge" style={{ fontWeight: '700', color: colors.textPrimary }}>
            {user.name}
          </Text>
          <View style={styles.metaRow}>
            <MaterialCommunityIcons name="phone-outline" size={14} color={colors.textSecondary} />
            <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
              {user.phone}
            </Text>
          </View>
          <View style={styles.metaRow}>
            <MaterialCommunityIcons name="email-outline" size={14} color={colors.textTertiary} />
            <Text variant="bodySmall" style={{ color: colors.textTertiary }}>
              {user.email}
            </Text>
          </View>
          <View style={styles.metaRow}>
            <MaterialCommunityIcons name="map-marker-outline" size={14} color={colors.primaryDark} />
            <Text variant="bodySmall" style={{ color: colors.textSecondary }} numberOfLines={1}>
              {user.location}
            </Text>
          </View>
        </View>
        <Pressable
          onPress={() => navigation.navigate('EditProfile')}
          style={[
            styles.editBtn,
            { backgroundColor: colors.primary, ...shadows.sm },
          ]}
        >
          <MaterialCommunityIcons name="pencil-outline" size={16} color={colors.onPrimary} />
          <Text variant="labelMedium" style={{ color: colors.onPrimary, fontWeight: '600' }}>
            Edit
          </Text>
        </Pressable>
      </View>
    </LinearGradient>
  );

  return (
    <CustomerScreen fixedHeader={header} contentStyle={styles.body}>
      <View style={[styles.menu, { backgroundColor: colors.surface, borderColor: colors.border, ...shadows.sm }]}>
        <ProfileMenuItem
          icon="account-edit-outline"
          label="Edit Profile"
          onPress={() => navigation.navigate('EditProfile')}
        />
        <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
        <ProfileMenuItem
          icon="map-marker-outline"
          label="Saved Addresses"
          onPress={() => navigation.navigate('EditProfile')}
        />
        <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
        <ProfileMenuItem
          icon="credit-card-outline"
          label="Payment Methods"
          onPress={() => undefined}
        />
        <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
        <ProfileMenuItem
          icon="star-outline"
          label="My Reviews"
          onPress={() => navigation.navigate('Reviews')}
        />
        <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
        <ProfileMenuItem
          icon="cog-outline"
          label="Settings"
          onPress={() => navigation.navigate('Settings')}
        />
        <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />
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
              { text: 'Logout', style: 'destructive', onPress: () => {
                  dispatch(logout());
                  clearAuth();
                  navigateToAuth(navigation);
                }},
            ])
          }
        />
      </View>
    </CustomerScreen>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  profileCard: {
    borderRadius: 20,
    padding: 20,
    gap: 14,
  },
  profileInfo: { gap: 6 },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: 12,
  },
  body: { paddingTop: 4 },
  menu: {
    marginHorizontal: 20,
    borderRadius: 18,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 20,
  },
  divider: {
    height: 1,
    marginLeft: 74,
  },
  logoutWrap: { paddingHorizontal: 20 },
});
