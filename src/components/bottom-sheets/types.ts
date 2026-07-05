export type FilterOption = {
  id: string;
  label: string;
};

export type SortOption = {
  id: string;
  label: string;
  description?: string;
};

export type AddressOption = {
  id: string;
  label: string;
  address: string;
  type: 'home' | 'work' | 'other';
};

export type CouponOption = {
  code: string;
  title: string;
  discount: string;
};

export type FilterSheetProps = {
  visible: boolean;
  onClose: () => void;
  options: FilterOption[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  onApply: () => void;
};

export type SortSheetProps = {
  visible: boolean;
  onClose: () => void;
  options: SortOption[];
  selectedId: string;
  onChange: (id: string) => void;
  onApply: () => void;
};

export type SelectDateSheetProps = {
  visible: boolean;
  onClose: () => void;
  dates: string[];
  selectedDate?: string;
  onChange: (date: string) => void;
  onApply: () => void;
};

export type SelectTimeSheetProps = {
  visible: boolean;
  onClose: () => void;
  times: string[];
  selectedTime?: string;
  onChange: (time: string) => void;
  onApply: () => void;
};

export type ChooseAddressSheetProps = {
  visible: boolean;
  onClose: () => void;
  addresses: AddressOption[];
  selectedId?: string;
  onChange: (id: string) => void;
  onApply: () => void;
};

export type ApplyCouponSheetProps = {
  visible: boolean;
  onClose: () => void;
  coupons: CouponOption[];
  selectedCode?: string;
  manualCode: string;
  onManualCodeChange: (code: string) => void;
  onSelectCoupon: (code: string) => void;
  onApply: () => void;
};
