import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { customerStackScreenOptions } from '@/navigation/config';
import { ChatConversationScreen, ChatListScreen } from '@/screens/customer';
import type { ChatStackParamList } from '@/navigation/types/customer.types';

const Stack = createNativeStackNavigator<ChatStackParamList>();

export function ChatStack() {
  return (
    <Stack.Navigator screenOptions={customerStackScreenOptions}>
      <Stack.Screen name="ChatList" component={ChatListScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="ChatConversation"
        component={ChatConversationScreen}
        options={({ route }) => ({
          title: 'Chat',
          headerBackTitle: 'Messages',
        })}
      />
    </Stack.Navigator>
  );
}
