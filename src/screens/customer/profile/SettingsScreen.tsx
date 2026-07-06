import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert, StyleSheet, Switch, View } from 'react-native';

import { CustomerScreen, ProfileMenuItem } from '@/components/customer';
import { SecondaryButton } from '@/components/ui';
import { useAppDispatch, useAppTheme } from '@/hooks';
import { navigateToAuth } from '@/navigation/utils';
import type { ProfileStackParamList } from '@/navigation/types/customer.types';
import { logout } from '@/store';
import { clearAuth } from '@/services/appStorage';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Settings'>;

export function SettingsScreen({ navigation }: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const dispatch = useAppDispatch();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <CustomerScreen edges={['left', 'right']}>
      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <SettingToggle
          icon="theme-light-dark"
          label="Dark Mode"
          value={darkMode}
          onValueChange={setDarkMode}
        />
        <SettingToggle
          icon="bell-outline"
          label="Notifications"
          value={notifications}
          onValueChange={setNotifications}
        />
        <ProfileMenuItem
          icon="translate"
          label="Language"
          value="English"
          onPress={() => undefined}
        />
        <ProfileMenuItem icon="shield-lock-outline" label="Privacy" onPress={() => undefined} />
        <ProfileMenuItem
          icon="file-document-outline"
          label="Terms of Service"
          onPress={() => undefined}
        />
        <ProfileMenuItem
          icon="information-outline"
          label="About"
          value="v1.0.0"
          onPress={() => undefined}
        />
      </View>

      <View style={styles.danger}>
        <SecondaryButton
          label="Delete Account"
          variant="outline"
          onPress={() => Alert.alert('Delete Account', 'This action cannot be undone.')}
        />
        <SecondaryButton
          label="Logout"
          onPress={() =>
            Alert.alert('Logout', 'Are you sure?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Logout', onPress: () => {
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

function SettingToggle({
  icon,
  label,
  value,
  onValueChange,
}: {
  icon: keyof typeof import('@expo/vector-icons').MaterialCommunityIcons.glyphMap;
  label: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
}) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <View style={styles.toggleRow}>
      <ProfileMenuItem icon={icon} label={label} onPress={() => onValueChange(!value)} />
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.border, true: colors.primaryLight }}
        thumbColor={value ? colors.primary : colors.surface}
        style={styles.switch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    borderRadius: 20,
    marginHorizontal: 20,
    overflow: 'hidden',
    marginBottom: 24,
  },
  toggleRow: {
    position: 'relative',
  },
  switch: {
    position: 'absolute',
    right: 20,
    top: 18,
  },
  danger: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
});
