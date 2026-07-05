import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ScreenLayout } from '@/components/ScreenLayout';
import { useAppTheme } from '@/hooks';
import { navigateToAuth } from '@/navigation/utils';
import type { MainStackParamList, MainTabParamList } from '@/navigation/types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Profile'>,
  NativeStackScreenProps<MainStackParamList>
>;

export function ProfileTabScreen({ navigation }: Props) {
  const theme = useAppTheme();
  const { spacing } = theme.tokens;

  return (
    <ScreenLayout
      title="Profile"
      subtitle="Manage your account, preferences, and role dashboards."
      edges={['left', 'right']}
    >
      <View style={[styles.actions, { gap: spacing.sm, marginTop: spacing.md }]}>
        <Button mode="contained" onPress={() => navigation.navigate('CustomerDashboard')}>
          Customer Dashboard
        </Button>
        <Button mode="outlined" onPress={() => navigation.navigate('ProviderDashboard')}>
          Provider Dashboard
        </Button>
        <Button mode="outlined" onPress={() => navigation.navigate('AdminDashboard')}>
          Admin Dashboard
        </Button>
        <Button mode="text" onPress={() => navigateToAuth(navigation)}>
          Sign Out
        </Button>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  actions: {
    width: '100%',
  },
});
