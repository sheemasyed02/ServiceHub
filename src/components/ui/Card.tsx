import { Pressable, StyleSheet, View, type ViewStyle } from 'react-native';

import { useAppTheme } from '@/hooks';

export type CardVariant = 'elevated' | 'outlined' | 'filled' | 'featured';

export type CardProps = {
  children: React.ReactNode;
  variant?: CardVariant;
  onPress?: () => void;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  padding?: number;
};

export function Card({
  children,
  variant = 'elevated',
  onPress,
  style,
  contentStyle,
  padding,
}: CardProps) {
  const theme = useAppTheme();
  const { colors, cardStyles, spacing } = theme.tokens;
  const cardPadding = padding ?? spacing.lg;

  const variantStyle = {
    elevated: cardStyles.elevated,
    outlined: cardStyles.outlined,
    filled: cardStyles.filled,
    featured: cardStyles.featured,
  }[variant];

  const content = (
    <View
      style={[
        styles.card,
        variantStyle,
        { padding: cardPadding, backgroundColor: variantStyle.backgroundColor ?? colors.surface },
        contentStyle,
      ]}
    >
      {children}
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [style, pressed && styles.pressed]}>
        {content}
      </Pressable>
    );
  }

  return <View style={style}>{content}</View>;
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
  pressed: {
    opacity: 0.92,
  },
});
