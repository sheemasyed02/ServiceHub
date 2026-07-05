import { Image, StyleSheet, View, type ImageProps, type ViewStyle } from 'react-native';

import { useAppTheme } from '@/hooks';

export type AppImageProps = Omit<ImageProps, 'source'> & {
  uri: string;
  aspectRatio?: number;
  radius?: number;
  style?: ViewStyle;
};

export function AppImage({ uri, aspectRatio = 1, radius = 10, style, ...props }: AppImageProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <View
      style={[styles.wrap, { borderRadius: radius, backgroundColor: colors.surfaceVariant }, style]}
    >
      <Image
        source={{ uri }}
        style={[styles.image, { aspectRatio, borderRadius: radius }]}
        resizeMode="cover"
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
  },
});
