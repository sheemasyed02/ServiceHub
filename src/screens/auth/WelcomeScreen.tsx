import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AuthActions } from '@/components/AuthActions';
import { ScreenLayout } from '@/components/ScreenLayout';
import type { AuthStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

export function WelcomeScreen({ navigation }: Props) {
  return (
    <ScreenLayout
      title="Welcome to ServiceHub"
      subtitle="Book trusted services or grow your business as a provider."
    >
      <AuthActions
        actions={[
          {
            label: 'Customer Login',
            onPress: () => navigation.navigate('CustomerLogin'),
          },
          {
            label: 'Provider Login',
            onPress: () => navigation.navigate('ProviderLogin'),
            mode: 'outlined',
          },
          {
            label: 'Create Account',
            onPress: () => navigation.navigate('Register'),
            mode: 'text',
          },
        ]}
      />
    </ScreenLayout>
  );
}
