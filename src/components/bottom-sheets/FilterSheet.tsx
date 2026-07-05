import { ScrollView } from 'react-native';

import { BottomSheet, SheetFooter, SheetOption } from './BottomSheet';
import type { FilterSheetProps } from './types';

export function FilterSheet({
  visible,
  onClose,
  options,
  selectedIds,
  onChange,
  onApply,
}: FilterSheetProps) {
  const toggle = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((item) => item !== id));
      return;
    }
    onChange([...selectedIds, id]);
  };

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title="Filters"
      footer={
        <SheetFooter
          label="Apply Filters"
          onReset={() => onChange([])}
          onApply={() => {
            onApply();
            onClose();
          }}
        />
      }
    >
      <ScrollView style={{ maxHeight: 360 }} showsVerticalScrollIndicator={false}>
        {options.map((option) => (
          <SheetOption
            key={option.id}
            label={option.label}
            selected={selectedIds.includes(option.id)}
            onPress={() => toggle(option.id)}
          />
        ))}
      </ScrollView>
    </BottomSheet>
  );
}
