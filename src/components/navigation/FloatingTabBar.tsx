import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppTheme } from '@/hooks';
import type { MainTabParamList } from '@/navigation/types';

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

const TAB_CONFIG: Record<
  keyof MainTabParamList,
  { label: string; icon: IconName; iconFocused: IconName }
> = {
  Home: { label: 'Home', icon: 'home-outline', iconFocused: 'home' },
  Bookings: { label: 'Bookings', icon: 'calendar-check-outline', iconFocused: 'calendar-check' },
  Notifications: { label: 'Alerts', icon: 'bell-outline', iconFocused: 'bell' },
  Profile: { label: 'Profile', icon: 'account-outline', iconFocused: 'account' },
};

export function FloatingTabBar({ state, navigation }: BottomTabBarProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.bar,
        {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          paddingBottom: Math.max(insets.bottom, 10),
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const config = TAB_CONFIG[route.name as keyof MainTabParamList];

        return (
          <Pressable
            key={route.key}
            style={styles.tab}
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!focused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }}
          >
            <View style={[styles.iconPill, focused && { backgroundColor: `${colors.primary}18` }]}>
              <MaterialCommunityIcons
                name={focused ? config.iconFocused : config.icon}
                size={22}
                color={focused ? colors.primaryDark : colors.textTertiary}
              />
            </View>
            <Text
              variant="labelSmall"
              style={{
                color: focused ? colors.primaryDark : colors.textTertiary,
                fontWeight: focused ? '600' : '400',
                fontSize: 11,
                marginTop: 4,
              }}
            >
              {config.label}
            </Text>
            {focused ? (
              <View style={[styles.indicator, { backgroundColor: colors.primary }]} />
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingTop: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
      },
      android: { elevation: 12 },
    }),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    position: 'relative',
  },
  iconPill: {
    width: 44,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    position: 'absolute',
    top: 0,
    width: 20,
    height: 3,
    borderRadius: 999,
  },
});
