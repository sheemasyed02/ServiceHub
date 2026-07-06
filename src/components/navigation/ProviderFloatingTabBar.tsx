import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useEffect, useRef } from 'react';
import { Animated, Platform, Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppTheme } from '@/hooks';
import type { ProviderTabParamList } from '@/navigation/types/provider.types';

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

const TAB_CONFIG: Record<
  keyof ProviderTabParamList,
  { label: string; icon: IconName; iconFocused: IconName }
> = {
  Dashboard: { label: 'Dashboard', icon: 'view-dashboard-outline', iconFocused: 'view-dashboard' },
  Jobs: { label: 'Jobs', icon: 'briefcase-outline', iconFocused: 'briefcase' },
  Calendar: { label: 'Calendar', icon: 'calendar-month-outline', iconFocused: 'calendar-month' },
  Profile: { label: 'Profile', icon: 'account-outline', iconFocused: 'account' },
};

function AnimatedTabIcon({
  focused,
  icon,
  iconFocused,
  color,
}: {
  focused: boolean;
  icon: IconName;
  iconFocused: IconName;
  color: string;
}) {
  const scale = useRef(new Animated.Value(focused ? 1.1 : 1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1.15 : 1,
      friction: 6,
      useNativeDriver: true,
    }).start();
  }, [focused, scale]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <MaterialCommunityIcons name={focused ? iconFocused : icon} size={24} color={color} />
    </Animated.View>
  );
}

export function ProviderFloatingTabBar({ state, navigation }: BottomTabBarProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <View
        style={[
          styles.bar,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const config = TAB_CONFIG[route.name as keyof ProviderTabParamList];
          const tint = focused ? colors.primaryDark : colors.textTertiary;

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
              <View
                style={[styles.iconPill, focused && { backgroundColor: `${colors.primary}18` }]}
              >
                <AnimatedTabIcon
                  focused={focused}
                  icon={config.icon}
                  iconFocused={config.iconFocused}
                  color={tint}
                />
              </View>
              <Text
                variant="labelSmall"
                style={{
                  color: tint,
                  fontWeight: focused ? '600' : '400',
                  fontSize: 10,
                  marginTop: 2,
                }}
              >
                {config.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 0,
  },
  bar: {
    flexDirection: 'row',
    borderRadius: 24,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 6,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
      },
      android: { elevation: 16 },
    }),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconPill: {
    width: 48,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
