import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Switch, View } from 'react-native';
import { Text } from 'react-native-paper';

import { ProviderScreen } from '@/components/provider';
import { SecondaryButton } from '@/components/ui';
import { useAppTheme } from '@/hooks';
import { navigateToAuth } from '@/navigation/utils';
import type { ProviderDashboardStackParamList } from '@/navigation/types/provider.types';
import { useState } from 'react';

type Props = NativeStackScreenProps<ProviderDashboardStackParamList, 'Settings'>;

export function ProviderSettingsScreen({ navigation }: Props) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [onlineStatus, setOnlineStatus] = useState(true);

  return (
    <ProviderScreen bottomPadding={40}>
      <SettingsToggle label="Dark mode" value={darkMode} onChange={setDarkMode} />
      <SettingsRow label="Language" value="English" onPress={() => {}} />
      <SettingsToggle
        label="Notification preferences"
        value={notifications}
        onChange={setNotifications}
      />
      <SettingsToggle
        label="Online status"
        value={onlineStatus}
        onChange={setOnlineStatus}
        subtitle="Show as available for jobs"
      />

      <View style={{ marginTop: 24, paddingHorizontal: 20, gap: 10 }}>
        <SecondaryButton label="Delete account" onPress={() => {}} variant="outline" />
        <SecondaryButton label="Logout" onPress={() => navigateToAuth(navigation)} variant="soft" />
      </View>
    </ProviderScreen>
  );
}

function SettingsToggle({
  label,
  subtitle,
  value,
  onChange,
}: {
  label: string;
  subtitle?: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <View style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={{ flex: 1 }}>
        <Text variant="bodyLarge" style={{ color: colors.textPrimary }}>
          {label}
        </Text>
        {subtitle ? (
          <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: colors.border, true: `${colors.primary}66` }}
        thumbColor={value ? colors.primary : colors.surface}
      />
    </View>
  );
}

function SettingsRow({
  label,
  value,
  onPress,
}: {
  label: string;
  value: string;
  onPress: () => void;
}) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <Pressable
      onPress={onPress}
      style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.border }]}
    >
      <Text variant="bodyLarge" style={{ color: colors.textPrimary, flex: 1 }}>
        {label}
      </Text>
      <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
        {value}
      </Text>
      <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textTertiary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 20,
    marginBottom: 8,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
});
