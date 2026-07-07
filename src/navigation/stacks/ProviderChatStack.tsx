import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { customerStackScreenOptions } from '@/navigation/config';
import { ProviderChatConversationScreen, ProviderChatListScreen } from '@/screens/provider';
import type { ProviderChatStackParamList } from '@/navigation/types/provider.types';

const Stack = createNativeStackNavigator<ProviderChatStackParamList>();

export function ProviderChatStack() {
  return (
    <Stack.Navigator screenOptions={customerStackScreenOptions}>
      <Stack.Screen name="ChatList" component={ProviderChatListScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="ChatConversation"
        component={ProviderChatConversationScreen}
        options={{ title: 'Chat', headerBackTitle: 'Messages' }}
      />
    </Stack.Navigator>
  );
}
