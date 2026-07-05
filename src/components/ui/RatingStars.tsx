import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View, type ViewStyle } from 'react-native';

import { useAppTheme } from '@/hooks';

export type RatingStarsProps = {
  rating: number;
  maxStars?: number;
  size?: number;
  readonly?: boolean;
  onRate?: (rating: number) => void;
  style?: ViewStyle;
};

export function RatingStars({
  rating,
  maxStars = 5,
  size = 22,
  readonly = false,
  onRate,
  style,
}: RatingStarsProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <View style={[styles.row, style]}>
      {Array.from({ length: maxStars }, (_, index) => {
        const starValue = index + 1;
        const filled = starValue <= Math.floor(rating);
        const half = !filled && starValue - rating < 1 && starValue - rating > 0;

        const iconName = filled ? 'star' : half ? 'star-half-full' : 'star-outline';
        const color = filled || half ? colors.secondary : colors.border;

        if (readonly) {
          return (
            <MaterialCommunityIcons key={starValue} name={iconName} size={size} color={color} />
          );
        }

        return (
          <Pressable key={starValue} onPress={() => onRate?.(starValue)} hitSlop={8}>
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
