import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { customerStackScreenOptions } from '@/navigation/config';
import type { ProviderCalendarStackParamList } from '@/navigation/types/provider.types';
import { ProviderCalendarScreen } from '@/screens/provider';

const Stack = createNativeStackNavigator<ProviderCalendarStackParamList>();

export function ProviderCalendarStack() {
  return (
    <Stack.Navigator screenOptions={customerStackScreenOptions}>
      <Stack.Screen
        name="CalendarMain"
        component={ProviderCalendarScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
