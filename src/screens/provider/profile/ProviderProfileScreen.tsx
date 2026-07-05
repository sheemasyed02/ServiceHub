import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ProviderScreen } from '@/components/provider';
import { Avatar, PrimaryButton, RatingStars } from '@/components/ui';
import { MOCK_PROVIDER_USER } from '@/constants/provider';
import { useAppTheme } from '@/hooks';
import type { ProviderProfileStackParamList } from '@/navigation/types/provider.types';

type Props = NativeStackScreenProps<ProviderProfileStackParamList, 'ProfileMain'>;

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

const MENU_ITEMS: { label: string; icon: IconName; screen: keyof ProviderProfileStackParamList }[] =
  [
    { label: 'My Services', icon: 'toolbox-outline', screen: 'ServiceManagement' as const },
    { label: 'Documents', icon: 'file-document-outline', screen: 'Documents' as const },
    { label: 'Reviews', icon: 'star-outline', screen: 'Reviews' as const },
    { label: 'Settings', icon: 'cog-outline', screen: 'Settings' as const },
    { label: 'Help & Support', icon: 'help-circle-outline', screen: 'HelpSupport' as const },
  ];

export function ProviderProfileScreen({ navigation }: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const insets = useSafeAreaInsets();
  const user = MOCK_PROVIDER_USER;

  return (
    <ProviderScreen edges={[]} bottomPadding={120}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Avatar source={{ uri: user.avatar }} name={user.name} size="xl" />
        <View style={styles.nameRow}>
          <Text variant="headlineSmall" style={{ color: colors.textPrimary }}>
            {user.name}
          </Text>
          {user.verified ? (
            <MaterialCommunityIcons name="check-decagram" size={22} color={colors.primary} />
          ) : null}
        </View>
        <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
          {user.profession} · {user.experience}
        </Text>
        <View style={styles.ratingRow}>
          <RatingStars rating={user.rating} size={16} readonly />
          <Text variant="labelMedium" style={{ color: colors.textSecondary }}>
            {user.rating} · {user.completedJobs} jobs completed
          </Text>
        </View>
        <PrimaryButton
          label="Edit Profile"
          tone="secondary"
          onPress={() => navigation.navigate('EditProfile')}
          style={{ marginTop: 16, maxWidth: 200 }}
          fullWidth={false}
        />
      </View>

      <InfoSection title="Languages" items={user.languages} />
      <InfoSection title="Skills" items={user.skills} />
      <InfoSection title="Certificates" items={user.certificates} />
      <InfoBlock title="Working hours" value={user.workingHours} />
      <InfoBlock title="Service areas" value={user.serviceAreas.join(', ')} />

      <View style={styles.menu}>
        {MENU_ITEMS.map((item) => (
          <Pressable
            key={item.label}
            onPress={() => navigation.navigate(item.screen)}
            style={[
              styles.menuItem,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <MaterialCommunityIcons name={item.icon} size={22} color={colors.primaryDark} />
            <Text variant="bodyLarge" style={{ color: colors.textPrimary, flex: 1 }}>
              {item.label}
            </Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textTertiary} />
          </Pressable>
        ))}
      </View>
      <View style={{ height: 24 }} />
    </ProviderScreen>
  );
}

function InfoSection({ title, items }: { title: string; items: string[] }) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <View style={styles.section}>
      <Text
        variant="titleSmall"
        style={{ color: colors.textPrimary, fontWeight: '600', marginBottom: 8 }}
      >
        {title}
      </Text>
      <View style={styles.chips}>
        {items.map((item) => (
          <View key={item} style={[styles.chip, { backgroundColor: colors.surfaceVariant }]}>
            <Text variant="labelMedium" style={{ color: colors.textPrimary }}>
              {item}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function InfoBlock({ title, value }: { title: string; value: string }) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <View style={styles.section}>
      <Text
        variant="titleSmall"
        style={{ color: colors.textPrimary, fontWeight: '600', marginBottom: 4 }}
      >
        {title}
      </Text>
      <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', paddingHorizontal: 20, marginBottom: 24 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  section: { paddingHorizontal: 20, marginBottom: 16 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  menu: { paddingHorizontal: 20, gap: 8, marginTop: 8 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
});
