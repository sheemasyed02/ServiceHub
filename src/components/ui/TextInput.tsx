import { MaterialCommunityIcons } from '@expo/vector-icons';
import { forwardRef, useState } from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  View,
  type TextInputProps as RNTextInputProps,
  type ViewStyle,
} from 'react-native';
import { Text } from 'react-native-paper';

import { useAppTheme } from '@/hooks';

import { FieldLabel } from './FieldLabel';

export type AppTextInputProps = RNTextInputProps & {
  label?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  leftIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
  rightIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  returnKeyType?: RNTextInputProps['returnKeyType'];
};

export const TextInput = forwardRef<RNTextInput, AppTextInputProps>(function TextInput(
  {
    label,
    required = false,
    error,
    hint,
    leftIcon,
    rightIcon,
    onRightIconPress,
    containerStyle,
    style,
    editable = true,
    onFocus,
    onBlur,
    placeholderTextColor,
    ...props
  },
  ref,
) {
  const theme = useAppTheme();
  const { colors, layout } = theme.tokens;
  const [focused, setFocused] = useState(false);
  const hasError = Boolean(error);

  const borderColor = hasError
    ? colors.error
    : focused
      ? colors.inputBorderFocus
      : colors.inputBorder;

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <FieldLabel label={label} required={required} /> : null}
      <View
        style={[
          styles.inputWrap,
          {
            minHeight: layout.inputHeight,
            backgroundColor: colors.inputBackground,
            borderColor,
          },
          focused && styles.inputFocused,
          !editable && { opacity: 0.6 },
        ]}
      >
        {leftIcon ? (
          <MaterialCommunityIcons name={leftIcon} size={20} color={colors.textTertiary} />
        ) : null}
        <RNTextInput
          ref={ref}
          placeholderTextColor={placeholderTextColor ?? colors.placeholder}
          style={[styles.input, { color: colors.textPrimary }, style]}
          editable={editable}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          autoCorrect={false}
          spellCheck={false}
          {...props}
        />
        {rightIcon ? (
          <MaterialCommunityIcons
            name={rightIcon}
            size={20}
            color={colors.textTertiary}
            onPress={onRightIconPress}
          />
        ) : null}
      </View>
      {error ? (
        <Text variant="bodySmall" style={{ color: colors.error }}>
          {error}
        </Text>
      ) : hint ? (
        <Text variant="bodySmall" style={{ color: colors.textTertiary }}>
          {hint}
        </Text>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    gap: 6,
    width: '100%',
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    gap: 10,
  },
  inputFocused: {
    borderWidth: 1.5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 14,
    includeFontPadding: false,
  },
});
