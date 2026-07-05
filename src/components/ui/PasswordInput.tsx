import { forwardRef, useState } from 'react';
import { TextInput as RNTextInput } from 'react-native';

import { TextInput, type AppTextInputProps } from './TextInput';

export type PasswordInputProps = Omit<
  AppTextInputProps,
  'secureTextEntry' | 'rightIcon' | 'onRightIconPress'
>;

export const PasswordInput = forwardRef<RNTextInput, PasswordInputProps>(
  function PasswordInput(props, ref) {
    const [visible, setVisible] = useState(false);

    return (
      <TextInput
        ref={ref}
        {...props}
        secureTextEntry={!visible}
        rightIcon={visible ? 'eye-off-outline' : 'eye-outline'}
        onRightIconPress={() => setVisible((current) => !current)}
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="password"
      />
    );
  },
);
