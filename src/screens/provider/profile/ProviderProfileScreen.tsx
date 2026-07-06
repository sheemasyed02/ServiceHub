import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { InsetGroup, ProfileMenuItem } from '@/components/customer';
import { ProviderScreen } from '@/components/provider';
import { Avatar, RatingStars } from '@/components/ui';
import { useAppTheme, useCurrentProviderProfile } from '@/hooks';
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
  const user = useCurrentProviderProfile();

  if (!user) {
    return (
      <ProviderScreen>
        <Text style={{ padding: 20 }}>Provider profile not loaded.</Text>
      </ProviderScreen>
    );
  }

  const header = (
    <View style={styles.hero}>
      <Avatar source={{ uri: user.avatar }} name={user.name} size="lg" />
      <View style={styles.profileInfo}>
        <View style={styles.nameRow}>
          <Text variant="titleLarge" style={{ fontWeight: '600', color: colors.textPrimary }}>
            {user.name}
          </Text>
          {user.verified ? (
            <MaterialCommunityIcons name="check-decagram" size={18} color={colors.primary} />
          ) : null}
        </View>
        <Text variant="bodyMedium" style={{ color: colors.textSecondary }}>
          {user.profession} · {user.experience}
        </Text>
        <View style={styles.ratingRow}>
          <RatingStars rating={user.rating} size={12} readonly />
          <Text variant="bodySmall" style={{ color: colors.textTertiary }}>
            {user.rating} · {user.completedJobs} jobs
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
    <ProviderScreen fixedHeader={header} bottomPadding={88} contentStyle={styles.body}>
      <InsetGroup style={styles.infoGroup}>
        <InfoRow label="Languages" value={user.languages.join(', ')} />
        <InfoRow label="Skills" value={user.skills.slice(0, 4).join(', ')} showDivider />
        <InfoRow label="Hours" value={user.workingHours} showDivider />
        <InfoRow label="Areas" value={user.serviceAreas.join(', ')} showDivider />
      </InsetGroup>

      <InsetGroup style={styles.menu}>
        {MENU_ITEMS.map((item, index) => (
          <ProfileMenuItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            showDivider={index < MENU_ITEMS.length - 1}
            onPress={() => navigation.navigate(item.screen)}
          />
        ))}
      </InsetGroup>
    </ProviderScreen>
  );
}

function InfoRow({
  label,
  value,
  showDivider,
}: {
  label: string;
  value: string;
  showDivider?: boolean;
}) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <View
      style={[
        styles.infoRow,
        showDivider && {
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: colors.divider,
        },
      ]}
    >
      <Text variant="labelMedium" style={{ color: colors.textTertiary, width: 72 }}>
        {label}
      </Text>
      <Text variant="bodyMedium" style={{ color: colors.textPrimary, flex: 1 }}>
        {value}
      </Text>
    </View>
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
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  body: { paddingTop: 0 },
  infoGroup: { marginBottom: 16 },
  infoRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  menu: { marginBottom: 16 },
});
