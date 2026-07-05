import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  CustomerLoginScreen,
  ForgotPasswordScreen,
  OTPScreen,
  ProviderLoginScreen,
  RegisterScreen,
  WelcomeScreen,
} from '@/screens/auth';
import { authStackScreenOptions } from '@/navigation/config';
import type { AuthStackParamList } from '@/navigation/types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={authStackScreenOptions}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="CustomerLogin" component={CustomerLoginScreen} />
      <Stack.Screen name="ProviderLogin" component={ProviderLoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}
