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
  Chat: { label: 'Chat', icon: 'message-text-outline', iconFocused: 'message-text' },
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
          borderTopColor: colors.divider,
          paddingBottom: Math.max(insets.bottom, 8),
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
            <MaterialCommunityIcons
              name={focused ? config.iconFocused : config.icon}
              size={24}
              color={focused ? colors.primaryDark : colors.textTertiary}
            />
            <Text
              variant="labelSmall"
              style={{
                color: focused ? colors.primaryDark : colors.textTertiary,
                fontWeight: focused ? '600' : '400',
                fontSize: 11,
                marginTop: 2,
              }}
            >
              {config.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
      },
      android: { elevation: 4 },
    }),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
});
