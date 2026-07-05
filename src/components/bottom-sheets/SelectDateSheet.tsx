import { ScrollView } from 'react-native';

import { BottomSheet, SheetFooter, SheetOption } from './BottomSheet';
import type { SelectDateSheetProps } from './types';

export function SelectDateSheet({
  visible,
  onClose,
  dates,
  selectedDate,
  onChange,
  onApply,
}: SelectDateSheetProps) {
  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title="Select Date"
      footer={
        <SheetFooter
          label="Confirm Date"
          onApply={() => {
            onApply();
            onClose();
          }}
        />
      }
    >
      <ScrollView style={{ maxHeight: 320 }} showsVerticalScrollIndicator={false}>
        {dates.map((date) => (
          <SheetOption
            key={date}
            label={date}
            icon="calendar-outline"
            selected={selectedDate === date}
            onPress={() => onChange(date)}
          />
        ))}
      </ScrollView>
    </BottomSheet>
  );
}
