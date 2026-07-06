import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { CustomerScreen, InsetGroup, ProfileMenuItem } from '@/components/customer';
import { Avatar, SecondaryButton } from '@/components/ui';
import { MOCK_IMAGES } from '@/constants/customer/images';
import { useAppTheme, useCustomerUser } from '@/hooks';
import { useAppDispatch } from '@/hooks';
import { navigateToAuth } from '@/navigation/utils';
import type { ProfileStackParamList } from '@/navigation/types/customer.types';
import { logout } from '@/store';
import { clearAuth } from '@/services/appStorage';

type Props = NativeStackScreenProps<ProfileStackParamList, 'ProfileMain'>;

const MENU_ITEMS = [
  { icon: 'account-edit-outline' as const, label: 'Edit Profile', route: 'EditProfile' as const },
  { icon: 'map-marker-outline' as const, label: 'Saved Addresses', route: 'EditProfile' as const },
  { icon: 'credit-card-outline' as const, label: 'Payment Methods', route: null },
  { icon: 'star-outline' as const, label: 'My Reviews', route: 'Reviews' as const },
  { icon: 'cog-outline' as const, label: 'Settings', route: 'Settings' as const },
  { icon: 'help-circle-outline' as const, label: 'Help & Support', route: 'HelpSupport' as const },
];

export function ProfileScreen({ navigation }: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const dispatch = useAppDispatch();
  const user = useCustomerUser();

  const header = (
    <View style={styles.hero}>
      <Avatar source={{ uri: MOCK_IMAGES.userAvatar }} name={user.name} size="lg" />
      <View style={styles.profileInfo}>
        <Text variant="titleLarge" style={{ fontWeight: '600', color: colors.textPrimary }}>
          {user.name}
        </Text>
        <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
          {user.phone}
        </Text>
        <Text variant="bodySmall" style={{ color: colors.textTertiary }}>
          {user.email}
        </Text>
        <View style={styles.metaRow}>
          <MaterialCommunityIcons name="map-marker-outline" size={14} color={colors.textTertiary} />
          <Text variant="bodySmall" style={{ color: colors.textSecondary }} numberOfLines={1}>
            {user.location}
          </Text>
        </View>
      </View>
      <Pressable onPress={() => navigation.navigate('EditProfile')} hitSlop={8}>
        <Text variant="labelLarge" style={{ color: colors.primaryDark, fontWeight: '600' }}>
          Edit
        </Text>
      </Pressable>
    </View>
  );

  return (
    <CustomerScreen fixedHeader={header} contentStyle={styles.body}>
      <InsetGroup style={styles.menu}>
        {MENU_ITEMS.map((item, index) => (
          <ProfileMenuItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            showDivider={index < MENU_ITEMS.length - 1}
            onPress={() => {
              if (item.route) navigation.navigate(item.route);
            }}
          />
        ))}
      </InsetGroup>

      <View style={styles.logoutWrap}>
        <SecondaryButton
          label="Logout"
          variant="outline"
          onPress={() =>
            Alert.alert('Logout', 'Are you sure you want to logout?', [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Logout',
                style: 'destructive',
                onPress: () => {
                  dispatch(logout());
                  clearAuth();
                  navigateToAuth(navigation);
                },
              },
            ])
          }
        />
      </View>
    </CustomerScreen>
  );
}

const styles = StyleSheet.create({
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
  },
  profileInfo: { flex: 1, gap: 2 },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  body: { paddingTop: 0 },
  menu: { marginTop: 4, marginBottom: 20 },
  logoutWrap: { paddingHorizontal: 20 },
});
