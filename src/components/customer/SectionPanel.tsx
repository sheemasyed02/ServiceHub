import { InsetGroup, type InsetGroupProps } from './InsetGroup';

/** @deprecated Prefer InsetGroup — kept for compatibility. */
export function SectionPanel({ children, style, noPadding: _noPadding }: InsetGroupProps & { noPadding?: boolean }) {
  return <InsetGroup style={style}>{children}</InsetGroup>;
}

export type { InsetGroupProps as SectionPanelProps } from './InsetGroup';
