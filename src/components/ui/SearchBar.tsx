import { useState } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import { TextInput, type AppTextInputProps } from './TextInput';

export type SearchBarProps = Omit<AppTextInputProps, 'leftIcon'> & {
  onClear?: () => void;
  containerStyle?: ViewStyle;
  dense?: boolean;
};

export function SearchBar({
  value,
  onChangeText,
  onClear,
  placeholder = 'Search services, providers...',
  containerStyle,
  dense = false,
  ...props
}: SearchBarProps) {
  const [query, setQuery] = useState(value ?? '');

  const handleChange = (text: string) => {
    setQuery(text);
    onChangeText?.(text);
  };

  const handleClear = () => {
    setQuery('');
    onChangeText?.('');
    onClear?.();
  };

  return (
    <View style={[styles.wrap, containerStyle]}>
      <TextInput
        {...props}
        value={value ?? query}
        onChangeText={handleChange}
        placeholder={placeholder}
        leftIcon="magnify"
        rightIcon={(value ?? query).length > 0 ? 'close-circle' : undefined}
        onRightIconPress={handleClear}
        returnKeyType="search"
        style={dense ? styles.denseInput : undefined}
        containerStyle={dense ? styles.denseContainer : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
  },
  denseContainer: {
    gap: 0,
  },
  denseInput: {
    paddingVertical: 10,
    fontSize: 15,
  },
});
