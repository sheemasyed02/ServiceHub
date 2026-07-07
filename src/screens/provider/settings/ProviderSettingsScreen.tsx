import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Alert, StyleSheet, Switch, View } from 'react-native';
import { Text } from 'react-native-paper';

import { ProfileMenuItem } from '@/components/customer';
import { ProviderScreen } from '@/components/provider';
import { SecondaryButton } from '@/components/ui';
import { useAppDispatch, useAppSelector, useAppTheme } from '@/hooks';
import { navigateToAuth } from '@/navigation/utils';
import type { ProviderDashboardStackParamList } from '@/navigation/types/provider.types';
import { clearAuth } from '@/services/appStorage';
import { logout, setProviderOnline } from '@/store';
type Props = NativeStackScreenProps<ProviderDashboardStackParamList, 'Settings'>;

export function ProviderSettingsScreen({ navigation }: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const dispatch = useAppDispatch();
  const isOnline = useAppSelector((state) => state.provider.isOnline);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <ProviderScreen bottomPadding={40}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={{ color: colors.textPrimary, fontWeight: '700' }}>
          Settings
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <SettingToggle
          icon="theme-light-dark"
          label="Dark mode"
          value={darkMode}
          onValueChange={setDarkMode}
        />
        <SettingToggle
          icon="bell-outline"
          label="Notifications"
          value={notifications}
          onValueChange={setNotifications}
        />
        <SettingToggle
          icon="circle-slice-8"
          label="Online status"
          value={isOnline}
          onValueChange={(value) => dispatch(setProviderOnline(value))}
        />
        <ProfileMenuItem icon="translate" label="Language" value="English" onPress={() => undefined} />
        <ProfileMenuItem icon="shield-lock-outline" label="Privacy" onPress={() => undefined} />
      </View>

      <View style={styles.danger}>
        <SecondaryButton
          label="Delete account"
          variant="outline"
          onPress={() => Alert.alert('Delete account', 'This action cannot be undone.')}
        />
        <SecondaryButton
          label="Logout"
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
    </ProviderScreen>
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
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
  },
});
