import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AuthActions } from '@/components/AuthActions';
import { ScreenLayout } from '@/components/ScreenLayout';
import type { AuthStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

export function ForgotPasswordScreen({ navigation }: Props) {
  return (
    <ScreenLayout
      title="Forgot Password"
      subtitle="We'll send you instructions to reset your password."
    >
      <AuthActions
        actions={[
          {
            label: 'Send Reset Link',
            onPress: () => navigation.goBack(),
          },
          {
            label: 'Back to Login',
            onPress: () => navigation.navigate('CustomerLogin'),
            mode: 'text',
          },
        ]}
      />
    </ScreenLayout>
  );
}
