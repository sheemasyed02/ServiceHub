import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { FaqAccordion } from '@/components/customer';
import { ProviderScreen } from '@/components/provider';
import { PrimaryButton } from '@/components/ui';
import { MOCK_PROVIDER_FAQS } from '@/constants/provider';
import { useAppTheme } from '@/hooks';
import type { ProviderDashboardStackParamList } from '@/navigation/types/provider.types';

type Props = NativeStackScreenProps<ProviderDashboardStackParamList, 'HelpSupport'>;

export function ProviderHelpSupportScreen(_props: Props) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <ProviderScreen bottomPadding={40}>
      <View style={styles.section}>
        <Text
          variant="titleSmall"
          style={{ color: colors.textPrimary, fontWeight: '600', marginBottom: 12 }}
        >
          FAQ
        </Text>
        <FaqAccordion items={MOCK_PROVIDER_FAQS} />
      </View>

      <View style={styles.actions}>
        <SupportCard
          icon="chat-processing-outline"
          title="Live chat"
          description="Chat with our support team"
          onPress={() => {}}
        />
        <SupportCard
          icon="alert-circle-outline"
          title="Report customer"
          description="Report inappropriate behavior"
          onPress={() => {}}
        />
        <SupportCard
          icon="phone-alert-outline"
          title="Emergency support"
          description="24/7 urgent assistance"
          onPress={() => {}}
          urgent
        />
      </View>

      <PrimaryButton
        label="Contact admin"
        onPress={() => {}}
        style={{ marginHorizontal: 20, marginTop: 8 }}
      />
    </ProviderScreen>
  );
}

function SupportCard({
  icon,
  title,
  description,
  onPress,
  urgent,
}: {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  description: string;
  onPress: () => void;
  urgent?: boolean;
}) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: urgent ? colors.errorContainer : colors.surface,
          borderColor: urgent ? colors.error : colors.border,
        },
      ]}
    >
      <MaterialCommunityIcons
        name={icon}
        size={24}
        color={urgent ? colors.error : colors.primaryDark}
      />
      <View style={{ flex: 1 }}>
        <Text variant="titleSmall" style={{ color: colors.textPrimary }}>
          {title}
        </Text>
        <Text variant="bodySmall" style={{ color: colors.textSecondary }}>
          {description}
        </Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textTertiary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: 20 },
  actions: { paddingHorizontal: 20, gap: 10 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
});
