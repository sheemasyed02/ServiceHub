import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AuthActions } from '@/components/AuthActions';
import { ScreenLayout } from '@/components/ScreenLayout';
import { navigateToMain } from '@/navigation/utils';
import type { AuthStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'ProviderLogin'>;

export function ProviderLoginScreen({ navigation }: Props) {
  return (
    <ScreenLayout title="Provider Login" subtitle="Sign in to manage your services and bookings.">
      <AuthActions
        actions={[
          {
            label: 'Sign In',
            onPress: () => navigateToMain(navigation),
          },
          {
            label: 'Forgot Password?',
            onPress: () => navigation.navigate('ForgotPassword'),
            mode: 'text',
          },
          {
            label: 'Create Account',
            onPress: () => navigation.navigate('Register'),
            mode: 'outlined',
          },
        ]}
      />
    </ScreenLayout>
  );
}
