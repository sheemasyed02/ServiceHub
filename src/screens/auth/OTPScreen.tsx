import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native-paper';

import { AuthActions } from '@/components/AuthActions';
import { ScreenLayout } from '@/components/ScreenLayout';
import { navigateToMain } from '@/navigation/utils';
import type { AuthStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'OTP'>;

export function OTPScreen({ navigation, route }: Props) {
  const contact = route.params?.phone ?? route.params?.email ?? 'your registered contact';

  return (
    <ScreenLayout title="Verify OTP" subtitle="Enter the one-time password sent to your device.">
      <Text variant="bodyMedium">Verification sent to: {contact}</Text>
      <AuthActions
        actions={[
          {
            label: 'Verify & Continue',
            onPress: () => navigateToMain(navigation),
          },
          {
            label: 'Resend OTP',
            onPress: () => undefined,
            mode: 'outlined',
          },
        ]}
      />
    </ScreenLayout>
  );
}
