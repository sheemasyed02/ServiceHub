import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { defaultStackScreenOptions } from '@/navigation/config';
import { AuthStack, MainStack } from '@/navigation/stacks';
import type { RootStackParamList } from '@/navigation/types';
import { theme } from '@/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer
      theme={{
        dark: false,
        colors: {
          primary: theme.tokens.colors.primary,
          background: theme.tokens.colors.background,
          card: theme.tokens.colors.surface,
          text: theme.tokens.colors.textPrimary,
          border: theme.tokens.colors.border,
          notification: theme.tokens.colors.secondary,
        },
        fonts: {
          regular: { fontFamily: 'System', fontWeight: '400' },
          medium: { fontFamily: 'System', fontWeight: '500' },
          bold: { fontFamily: 'System', fontWeight: '700' },
          heavy: { fontFamily: 'System', fontWeight: '800' },
        },
      }}
    >
      <Stack.Navigator initialRouteName="Auth" screenOptions={defaultStackScreenOptions}>
        <Stack.Screen name="Auth" component={AuthStack} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainStack} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
