import { ScrollView } from 'react-native';

import { BottomSheet, SheetFooter, SheetOption } from './BottomSheet';
import type { ChooseAddressSheetProps } from './types';

const ADDRESS_ICONS = {
  home: 'home-outline',
  work: 'briefcase-outline',
  other: 'map-marker-outline',
} as const;

export function ChooseAddressSheet({
  visible,
  onClose,
  addresses,
  selectedId,
  onChange,
  onApply,
}: ChooseAddressSheetProps) {
  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title="Choose Address"
      footer={
        <SheetFooter
          label="Use This Address"
          onApply={() => {
            onApply();
            onClose();
          }}
        />
      }
    >
      <ScrollView style={{ maxHeight: 340 }} showsVerticalScrollIndicator={false}>
        {addresses.map((item) => (
          <SheetOption
            key={item.id}
            label={item.label}
            description={item.address}
            icon={ADDRESS_ICONS[item.type]}
            selected={selectedId === item.id}
            onPress={() => onChange(item.id)}
          />
        ))}
      </ScrollView>
    </BottomSheet>
  );
}
