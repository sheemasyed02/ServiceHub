import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { customerStackScreenOptions } from '@/navigation/config';
import type { ProviderJobsStackParamList } from '@/navigation/types/provider.types';
import {
  ActiveJobScreen,
  CompleteServiceScreen,
  JobRequestsScreen,
  ServiceStartScreen,
} from '@/screens/provider';

const Stack = createNativeStackNavigator<ProviderJobsStackParamList>();

export function ProviderJobsStack() {
  return (
    <Stack.Navigator screenOptions={customerStackScreenOptions}>
      <Stack.Screen
        name="JobRequests"
        component={JobRequestsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ActiveJob"
        component={ActiveJobScreen}
        options={{ title: 'Active Job' }}
      />
      <Stack.Screen
        name="ServiceStart"
        component={ServiceStartScreen}
        options={{ title: 'Start Service' }}
      />
      <Stack.Screen
        name="CompleteService"
        component={CompleteServiceScreen}
        options={{ title: 'Complete Service' }}
      />
    </Stack.Navigator>
  );
}
