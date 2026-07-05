import { useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  Pressable,
  StyleSheet,
  Text,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';

import { useAppTheme } from '@/hooks';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  size?: ButtonSize;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
  tone?: 'primary' | 'secondary';
};

const SIZE_MAP: Record<
  ButtonSize,
  { height: number; fontSize: number; paddingHorizontal: number }
> = {
  sm: { height: 44, fontSize: 14, paddingHorizontal: 16 },
  md: { height: 52, fontSize: 16, paddingHorizontal: 20 },
  lg: { height: 56, fontSize: 17, paddingHorizontal: 24 },
};

export function PrimaryButton({
  label,
  onPress,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = true,
  size = 'md',
  style,
  textStyle,
  testID,
  tone = 'primary',
}: PrimaryButtonProps) {
  const theme = useAppTheme();
  const { colors, shadows } = theme.tokens;
  const scale = useRef(new Animated.Value(1)).current;
  const sizeStyle = SIZE_MAP[size];
  const isDisabled = disabled || loading;
  const backgroundColor = tone === 'secondary' ? colors.secondary : colors.primary;
  const labelColor = tone === 'secondary' ? colors.onSecondary : colors.onPrimary;

  const animatePress = (toValue: number) => {
    Animated.spring(scale, {
      toValue,
      friction: 6,
      tension: 120,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        fullWidth && styles.fullWidth,
        { transform: [{ scale }] },
        !isDisabled && shadows.xs,
        style,
      ]}
    >
      <Pressable
        testID={testID}
        disabled={isDisabled}
        onPress={onPress}
        onPressIn={() => !isDisabled && animatePress(0.97)}
        onPressOut={() => animatePress(1)}
        style={[
          styles.button,
          {
            height: sizeStyle.height,
            paddingHorizontal: sizeStyle.paddingHorizontal,
            backgroundColor: isDisabled ? colors.surfaceDisabled : backgroundColor,
          },
        ]}
      >
        {loading ? (
          <ActivityIndicator color={labelColor} />
        ) : (
          <View style={styles.content}>
            {icon && iconPosition === 'left' ? icon : null}
            <Text
              style={[
                styles.label,
                {
                  color: isDisabled ? colors.onSurfaceDisabled : labelColor,
                  fontSize: sizeStyle.fontSize,
                },
                textStyle,
              ]}
            >
              {label}
            </Text>
            {icon && iconPosition === 'right' ? icon : null}
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  button: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    fontWeight: '700',
    letterSpacing: 0.2,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
});
