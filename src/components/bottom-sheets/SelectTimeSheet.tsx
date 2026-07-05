import { ScrollView } from 'react-native';

import { BottomSheet, SheetFooter, SheetOption } from './BottomSheet';
import type { SelectTimeSheetProps } from './types';

export function SelectTimeSheet({
  visible,
  onClose,
  times,
  selectedTime,
  onChange,
  onApply,
}: SelectTimeSheetProps) {
  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title="Select Time"
      footer={
        <SheetFooter
          label="Confirm Time"
          onApply={() => {
            onApply();
            onClose();
          }}
        />
      }
    >
      <ScrollView style={{ maxHeight: 320 }} showsVerticalScrollIndicator={false}>
        {times.map((time) => (
          <SheetOption
            key={time}
            label={time}
            icon="clock-outline"
            selected={selectedTime === time}
            onPress={() => onChange(time)}
          />
        ))}
      </ScrollView>
    </BottomSheet>
  );
}
