import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AppProviders } from '@/components';
import { RootNavigator } from '@/navigation';

SplashScreen.preventAutoHideAsync().catch(() => undefined);

export default function App() {
  useEffect(() => {
    SplashScreen.hideAsync().catch(() => undefined);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProviders>
        <RootNavigator />
        <StatusBar style="dark" />
      </AppProviders>
    </GestureHandlerRootView>
  );
}
