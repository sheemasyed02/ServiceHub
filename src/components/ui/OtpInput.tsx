import { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  TextInput as RNTextInput,
  View,
  type ViewStyle,
} from 'react-native';
import { Text } from 'react-native-paper';

import { useAppTheme } from '@/hooks';

export type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  error?: string;
  containerStyle?: ViewStyle;
};

export function OtpInput({ value, onChange, length = 6, error, containerStyle }: OtpInputProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const inputRef = useRef<RNTextInput>(null);
  const shake = useRef(new Animated.Value(0)).current;

  const digits = value.padEnd(length, ' ').slice(0, length).split('');
  const activeIndex = Math.min(value.length, length - 1);

  useEffect(() => {
    if (!error) return;

    Animated.sequence([
      Animated.timing(shake, { toValue: 8, duration: 50, useNativeDriver: true }),
      Animated.timing(shake, { toValue: -8, duration: 50, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  }, [error, shake]);

  return (
    <View style={[styles.wrap, containerStyle]}>
      <Pressable onPress={() => inputRef.current?.focus()}>
        <Animated.View style={[styles.row, { transform: [{ translateX: shake }] }]}>
          {digits.map((digit, index) => {
            const isActive = index === activeIndex && value.length < length;
            const isFilled = digit.trim().length > 0;

            return (
              <View
                key={index}
                style={[
                  styles.box,
                  {
                    borderColor: error
                      ? colors.error
                      : isActive
                        ? colors.inputBorderFocus
                        : isFilled
                          ? colors.textPrimary
                          : colors.inputBorder,
                    backgroundColor: colors.inputBackground,
                  },
                ]}
              >
                <Text variant="titleLarge" style={{ color: colors.textPrimary, fontWeight: '700' }}>
                  {digit.trim()}
                </Text>
              </View>
            );
          })}
        </Animated.View>
      </Pressable>

      <RNTextInput
        ref={inputRef}
        value={value}
        onChangeText={(text) => onChange(text.replace(/\D/g, '').slice(0, length))}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        style={styles.hiddenInput}
        caretHidden
      />

      {error ? (
        <Text variant="bodySmall" style={{ color: colors.error, textAlign: 'center' }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 8 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  box: {
    flex: 1,
    aspectRatio: 1,
    maxWidth: 52,
    borderWidth: 1.5,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
});
