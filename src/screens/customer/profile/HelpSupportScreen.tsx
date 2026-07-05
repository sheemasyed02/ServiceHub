import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Alert, Linking, Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { CustomerScreen, FaqAccordion, SectionHeader } from '@/components/customer';
import { SecondaryButton } from '@/components/ui';
import { MOCK_FAQS } from '@/constants/customer';
import { useAppTheme } from '@/hooks';

const SUPPORT_ITEMS = [
  {
    id: 'contact',
    icon: 'headset' as const,
    label: 'Contact Support',
    sub: 'support@servicehub.com',
    action: () => Linking.openURL('mailto:support@servicehub.com'),
  },
  {
    id: 'chat',
    icon: 'message-text-outline' as const,
    label: 'Live Chat',
    sub: 'Average reply under 5 min',
    action: () => Alert.alert('Live Chat', 'Connecting to support...'),
  },
  {
    id: 'report',
    icon: 'alert-circle-outline' as const,
    label: 'Report Issue',
    sub: 'Booking or payment problems',
    action: () => Alert.alert('Report Issue', 'We will respond within 24 hours.'),
  },
  {
    id: 'emergency',
    icon: 'phone-outline' as const,
    label: 'Emergency Help',
    sub: 'Urgent safety issues',
    action: () => Linking.openURL('tel:112'),
    danger: true,
  },
];

export function HelpSupportScreen() {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <CustomerScreen>
      <Text
        variant="titleLarge"
        style={{
          fontWeight: '600',
          color: colors.textPrimary,
          paddingHorizontal: 20,
          marginBottom: 16,
        }}
      >
        Help & Support
      </Text>

      <View style={[styles.list, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        {SUPPORT_ITEMS.map((item, index) => (
          <Pressable
            key={item.id}
            onPress={item.action}
            style={[styles.row, index > 0 && { borderTopWidth: 1, borderTopColor: colors.border }]}
          >
            <View style={[styles.icon, { backgroundColor: colors.surfaceVariant }]}>
              <MaterialCommunityIcons
                name={item.icon}
                size={20}
                color={item.danger ? colors.error : colors.textSecondary}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="bodyLarge" style={{ color: colors.textPrimary, fontWeight: '500' }}>
                {item.label}
              </Text>
              <Text variant="bodySmall" style={{ color: colors.textTertiary }}>
                {item.sub}
              </Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textTertiary} />
          </Pressable>
        ))}
      </View>

      <SectionHeader title="FAQs" />
      <FaqAccordion items={MOCK_FAQS} />

      <View style={styles.footer}>
        <SecondaryButton
          label="Email Support"
          variant="outline"
          onPress={() => Linking.openURL('mailto:support@servicehub.com')}
        />
      </View>
    </CustomerScreen>
  );
}

const styles = StyleSheet.create({
  list: {
    marginHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 16,
  },
});
