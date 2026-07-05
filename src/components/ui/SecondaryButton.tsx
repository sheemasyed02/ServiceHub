import { useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';

import { useAppTheme } from '@/hooks';

import type { ButtonSize } from './PrimaryButton';

export type SecondaryButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  size?: ButtonSize;
  variant?: 'outline' | 'soft' | 'ghost';
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
};

const SIZE_MAP: Record<
  ButtonSize,
  { height: number; fontSize: number; paddingHorizontal: number }
> = {
  sm: { height: 44, fontSize: 14, paddingHorizontal: 16 },
  md: { height: 52, fontSize: 16, paddingHorizontal: 20 },
  lg: { height: 56, fontSize: 17, paddingHorizontal: 24 },
};

export function SecondaryButton({
  label,
  onPress,
  disabled = false,
  icon,
  iconPosition = 'left',
  fullWidth = true,
  size = 'md',
  variant = 'outline',
  style,
  textStyle,
  testID,
}: SecondaryButtonProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const scale = useRef(new Animated.Value(1)).current;
  const sizeStyle = SIZE_MAP[size];

  const variantStyles = {
    outline: {
      backgroundColor: colors.transparent,
      borderColor: colors.outline,
      borderWidth: 1.5,
      textColor: colors.primaryDark,
    },
    soft: {
      backgroundColor: colors.surfaceVariant,
      borderColor: colors.transparent,
      borderWidth: 0,
      textColor: colors.textPrimary,
    },
    ghost: {
      backgroundColor: colors.transparent,
      borderColor: colors.transparent,
      borderWidth: 0,
      textColor: colors.primaryDark,
    },
  }[variant];

  const animatePress = (toValue: number) => {
    Animated.spring(scale, {
      toValue,
      friction: 6,
      tension: 120,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[fullWidth && styles.fullWidth, { transform: [{ scale }] }, style]}>
      <Pressable
        testID={testID}
        disabled={disabled}
        onPress={onPress}
        onPressIn={() => !disabled && animatePress(0.97)}
        onPressOut={() => animatePress(1)}
        style={[
          styles.button,
          {
            height: sizeStyle.height,
            paddingHorizontal: sizeStyle.paddingHorizontal,
            backgroundColor: disabled ? colors.surfaceDisabled : variantStyles.backgroundColor,
            borderColor: variantStyles.borderColor,
            borderWidth: variantStyles.borderWidth,
          },
        ]}
      >
        <View style={styles.content}>
          {icon && iconPosition === 'left' ? icon : null}
          <Text
            style={[
              styles.label,
              {
                color: disabled ? colors.onSurfaceDisabled : variantStyles.textColor,
                fontSize: sizeStyle.fontSize,
              },
              textStyle,
            ]}
          >
            {label}
          </Text>
          {icon && iconPosition === 'right' ? icon : null}
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  button: {
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
