import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { useAppTheme } from '@/hooks';

type SplashLoadingIndicatorProps = {
  size?: 'sm' | 'md';
};

export function SplashLoadingIndicator({ size = 'md' }: SplashLoadingIndicatorProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;
  const progress = useRef(new Animated.Value(0)).current;

  const dotSize = size === 'sm' ? 7 : 9;
  const barWidth = size === 'sm' ? 120 : 160;

  useEffect(() => {
    const animateDot = (value: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(value, {
            toValue: 1,
            duration: 420,
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0.3,
            duration: 420,
            useNativeDriver: true,
          }),
        ]),
      );

    const dotAnimation = Animated.parallel([
      animateDot(dot1, 0),
      animateDot(dot2, 160),
      animateDot(dot3, 320),
    ]);

    const progressAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: 1400,
          useNativeDriver: false,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }),
      ]),
    );

    dotAnimation.start();
    progressAnimation.start();

    return () => {
      dotAnimation.stop();
      progressAnimation.stop();
    };
  }, [dot1, dot2, dot3, progress]);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [barWidth * 0.15, barWidth],
  });

  return (
    <View style={styles.container}>
      <View style={[styles.track, { width: barWidth, backgroundColor: colors.borderLight }]}>
        <Animated.View
          style={[
            styles.fill,
            {
              width: progressWidth,
              backgroundColor: colors.primary,
            },
          ]}
        />
      </View>
      <View style={styles.dots}>
        {[dot1, dot2, dot3].map((dot, index) => (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                width: dotSize,
                height: dotSize,
                borderRadius: dotSize / 2,
                backgroundColor: colors.secondary,
                opacity: dot,
                transform: [
                  {
                    scale: dot.interpolate({
                      inputRange: [0.3, 1],
                      outputRange: [0.85, 1.15],
                    }),
                  },
                ],
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 16,
  },
  track: {
    height: 3,
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {},
});
