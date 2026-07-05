import { ScrollView } from 'react-native';

import { BottomSheet, SheetFooter, SheetOption } from './BottomSheet';
import type { SortSheetProps } from './types';

export function SortSheet({
  visible,
  onClose,
  options,
  selectedId,
  onChange,
  onApply,
}: SortSheetProps) {
  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title="Sort By"
      footer={
        <SheetFooter
          label="Apply"
          onApply={() => {
            onApply();
            onClose();
          }}
        />
      }
    >
      <ScrollView style={{ maxHeight: 320 }} showsVerticalScrollIndicator={false}>
        {options.map((option) => (
          <SheetOption
            key={option.id}
            label={option.label}
            description={option.description}
            selected={selectedId === option.id}
            onPress={() => onChange(option.id)}
          />
        ))}
      </ScrollView>
    </BottomSheet>
  );
}
