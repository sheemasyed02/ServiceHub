import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { SecondaryButton } from '@/components/ui';

export type SocialAuthButtonsProps = {
  onGooglePress?: () => void;
  onApplePress?: () => void;
  disabled?: boolean;
};

export function SocialAuthButtons({
  onGooglePress,
  onApplePress,
  disabled = false,
}: SocialAuthButtonsProps) {
  return (
    <View style={styles.wrap}>
      <SecondaryButton
        label="Google"
        onPress={onGooglePress ?? (() => undefined)}
        disabled={disabled}
        icon={<MaterialCommunityIcons name="google" size={20} />}
      />
      <SecondaryButton
        label="Apple"
        onPress={onApplePress ?? (() => undefined)}
        disabled={disabled}
        icon={<MaterialCommunityIcons name="apple" size={20} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 12,
    width: '100%',
  },
});
