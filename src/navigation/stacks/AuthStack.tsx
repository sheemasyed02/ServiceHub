import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  CustomerLoginScreen,
  CustomerRegisterScreen,
  ForgotPasswordScreen,
  OTPScreen,
  ProviderLoginScreen,
  ProviderRegisterScreen,
  ResetPasswordScreen,
  SplashScreen,
  WelcomeScreen,
} from '@/screens/auth';
import { authStackScreenOptions } from '@/navigation/config';
import type { AuthStackParamList } from '@/navigation/types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={authStackScreenOptions}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="CustomerLogin" component={CustomerLoginScreen} />
      <Stack.Screen name="ProviderLogin" component={ProviderLoginScreen} />
      <Stack.Screen name="CustomerRegister" component={CustomerRegisterScreen} />
      <Stack.Screen name="ProviderRegister" component={ProviderRegisterScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
}
