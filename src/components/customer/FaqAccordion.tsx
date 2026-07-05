import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import type { FaqItem } from '@/constants/customer';
import { useAppTheme } from '@/hooks';

export type FaqAccordionProps = {
  items: FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <View style={[styles.wrap, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      {items.map((item, index) => (
        <FaqItemRow
          key={item.id}
          item={item}
          isLast={index === items.length - 1}
          borderColor={colors.border}
        />
      ))}
    </View>
  );
}

function FaqItemRow({
  item,
  isLast,
  borderColor,
}: {
  item: FaqItem;
  isLast: boolean;
  borderColor: string;
}) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const [expanded, setExpanded] = useState(false);

  return (
    <View
      style={[styles.item, !isLast && { borderBottomWidth: 1, borderBottomColor: borderColor }]}
    >
      <Pressable onPress={() => setExpanded((v) => !v)} style={styles.questionRow}>
        <Text
          variant="bodyMedium"
          style={{ color: colors.textPrimary, fontWeight: '500', flex: 1 }}
        >
          {item.question}
        </Text>
        <Text variant="labelLarge" style={{ color: colors.primaryDark }}>
          {expanded ? '−' : '+'}
        </Text>
      </Pressable>
      {expanded ? (
        <Text
          variant="bodySmall"
          style={{ color: colors.textSecondary, lineHeight: 20, paddingTop: 8, paddingBottom: 4 }}
        >
          {item.answer}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  item: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
