import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { ProviderScreen } from '@/components/provider';
import { Avatar, PrimaryButton, RatingStars } from '@/components/ui';
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
  const { colors, gradients, shadows } = theme.tokens;
  const user = useCurrentProviderProfile();

  if (!user) {
    return (
      <ProviderScreen>
        <Text style={{ padding: 20 }}>Provider profile not loaded.</Text>
      </ProviderScreen>
    );
  }

  const header = (
    <LinearGradient colors={gradients.hero} style={styles.hero}>
      <View style={[styles.profileCard, { backgroundColor: colors.surfaceElevated, ...shadows.md }]}>
        <Avatar source={{ uri: user.avatar }} name={user.name} size="xl" />
        <View style={styles.nameRow}>
          <Text variant="titleLarge" style={{ color: colors.textPrimary, fontWeight: '800' }}>
            {user.name}
          </Text>
          {user.verified ? (
            <MaterialCommunityIcons name="check-decagram" size={22} color={colors.primary} />
          ) : null}
        </View>
        <Text variant="bodyMedium" style={{ color: colors.textSecondary, textAlign: 'center' }}>
          {user.profession} · {user.experience}
        </Text>
        <View style={styles.ratingRow}>
          <RatingStars rating={user.rating} size={16} readonly />
          <Text variant="labelMedium" style={{ color: colors.textSecondary }}>
            {user.rating} · {user.completedJobs} jobs
          </Text>
        </View>
        <PrimaryButton
          label="Edit Profile"
          tone="secondary"
          onPress={() => navigation.navigate('EditProfile')}
          style={{ marginTop: 14, alignSelf: 'stretch' }}
        />
      </View>
    </LinearGradient>
  );

  return (
    <ProviderScreen fixedHeader={header} bottomPadding={120} contentStyle={styles.body}>
      <View style={[styles.infoCard, { backgroundColor: colors.surfaceElevated, ...shadows.sm }]}>
        <InfoSection title="Languages" items={user.languages} />
        <InfoSection title="Skills" items={user.skills} />
        <InfoSection title="Certificates" items={user.certificates} />
        <InfoBlock title="Working hours" value={user.workingHours} />
        <InfoBlock title="Service areas" value={user.serviceAreas.join(', ')} last />
      </View>

      <View style={[styles.menu, { backgroundColor: colors.surfaceElevated, ...shadows.sm }]}>
        {MENU_ITEMS.map((item, index) => (
          <Pressable
            key={item.label}
            onPress={() => navigation.navigate(item.screen)}
            style={[
              styles.menuItem,
              index < MENU_ITEMS.length - 1 && {
                borderBottomWidth: 1,
                borderBottomColor: colors.borderLight,
              },
            ]}
          >
            <View style={[styles.menuIcon, { backgroundColor: `${colors.primary}12` }]}>
              <MaterialCommunityIcons name={item.icon} size={20} color={colors.primaryDark} />
            </View>
            <Text variant="bodyLarge" style={{ color: colors.textPrimary, flex: 1, fontWeight: '600' }}>
              {item.label}
            </Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textTertiary} />
          </Pressable>
        ))}
      </View>
    </ProviderScreen>
  );
}

function InfoSection({ title, items }: { title: string; items: string[] }) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <View style={styles.section}>
      <Text variant="labelLarge" style={{ color: colors.textPrimary, fontWeight: '700', marginBottom: 8 }}>
        {title}
      </Text>
      <View style={styles.chips}>
        {items.map((item) => (
          <View key={item} style={[styles.chip, { backgroundColor: colors.surfaceVariant }]}>
            <Text variant="labelMedium" style={{ color: colors.textPrimary, fontWeight: '600' }}>
              {item}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function InfoBlock({ title, value, last }: { title: string; value: string; last?: boolean }) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <View style={[styles.section, last && { marginBottom: 0 }]}>
      <Text variant="labelLarge" style={{ color: colors.textPrimary, fontWeight: '700', marginBottom: 4 }}>
        {title}
      </Text>
      <Text variant="bodyMedium" style={{ color: colors.textSecondary, lineHeight: 22 }}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 16,
  },
  profileCard: {
    borderRadius: 22,
    padding: 20,
    alignItems: 'center',
    gap: 6,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  body: {
    paddingTop: 4,
  },
  infoCard: {
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  section: { marginBottom: 16 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10 },
  menu: {
    marginHorizontal: 16,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
