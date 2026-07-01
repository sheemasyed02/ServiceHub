import { StatusBar } from 'expo-status-bar';

import { AppProviders } from '@/components';
import { RootNavigator } from '@/navigation';

export default function App() {
  return (
    <AppProviders>
      <RootNavigator />
      <StatusBar style="auto" />
    </AppProviders>
  );
}
