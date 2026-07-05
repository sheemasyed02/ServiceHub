import { PrimaryButton, type PrimaryButtonProps } from './PrimaryButton';

export type LoadingButtonProps = Omit<PrimaryButtonProps, 'loading'> & {
  loading: boolean;
  loadingLabel?: string;
};

export function LoadingButton({
  loading,
  loadingLabel,
  label,
  tone,
  ...props
}: LoadingButtonProps) {
  return (
    <PrimaryButton
      {...props}
      tone={tone}
      label={loading ? (loadingLabel ?? label) : label}
      loading={loading}
    />
  );
}
