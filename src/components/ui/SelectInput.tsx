import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Modal, Pressable, ScrollView, StyleSheet, View, type ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';
import { useState } from 'react';

import { useAppTheme } from '@/hooks';

import { FieldLabel } from './FieldLabel';

export type SelectInputProps = {
  label?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  options: readonly string[];
  onSelect: (value: string) => void;
  error?: string;
  containerStyle?: ViewStyle;
};

export function SelectInput({
  label,
  required = false,
  placeholder = 'Select an option',
  value,
  options,
  onSelect,
  error,
  containerStyle,
}: SelectInputProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const [open, setOpen] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <FieldLabel label={label} required={required} /> : null}

      <Pressable
        onPress={() => setOpen(true)}
        style={[
          styles.field,
          {
            borderColor: error ? colors.error : colors.inputBorder,
            backgroundColor: colors.inputBackground,
          },
        ]}
      >
        <Text
          variant="bodyLarge"
          style={{ color: value ? colors.textPrimary : colors.placeholder }}
        >
          {value || placeholder}
        </Text>
        <MaterialCommunityIcons name="chevron-down" size={22} color={colors.textTertiary} />
      </Pressable>

      {error ? (
        <Text variant="bodySmall" style={{ color: colors.error }}>
          {error}
        </Text>
      ) : null}

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <View style={[styles.sheet, { backgroundColor: colors.surface }]}>
            <Text variant="titleMedium" style={{ color: colors.textPrimary, marginBottom: 12 }}>
              {label ?? 'Select'}
            </Text>
            <ScrollView style={{ maxHeight: 320 }}>
              {options.map((option) => (
                <Pressable
                  key={option}
                  onPress={() => {
                    onSelect(option);
                    setOpen(false);
                  }}
                  style={[
                    styles.option,
                    value === option && { backgroundColor: colors.surfaceVariant },
                  ]}
                >
                  <Text variant="bodyLarge" style={{ color: colors.textPrimary }}>
                    {option}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8, width: '100%' },
  field: {
    minHeight: 52,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 32,
  },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
});
