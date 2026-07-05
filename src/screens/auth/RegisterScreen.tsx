import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AuthActions } from '@/components/AuthActions';
import { ScreenLayout } from '@/components/ScreenLayout';
import type { AuthStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {
  return (
    <ScreenLayout title="Register" subtitle="Create your ServiceHub account to get started.">
      <AuthActions
        actions={[
          {
            label: 'Continue',
            onPress: () => navigation.navigate('OTP', { phone: '+91 00000 00000' }),
          },
          {
            label: 'Already have an account?',
            onPress: () => navigation.navigate('CustomerLogin'),
            mode: 'text',
          },
        ]}
      />
    </ScreenLayout>
  );
}
