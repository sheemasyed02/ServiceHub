import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, type ViewStyle } from 'react-native';

import { useAppTheme } from '@/hooks';

export type ShimmerProps = {
  width?: number | `${number}%`;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
};

export function Shimmer({ width = '100%', height = 16, borderRadius = 8, style }: ShimmerProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const opacity = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.75, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.35, duration: 700, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.base,
        {
          width,
          height,
          borderRadius,
          backgroundColor: colors.border,
          opacity,
        },
        style,
      ]}
    />
  );
}

export function ShimmerRow({ count = 3, gap = 12 }: { count?: number; gap?: number }) {
  return (
    <View style={{ gap }}>
      {Array.from({ length: count }).map((_, i) => (
        <Shimmer key={i} height={14} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
});
