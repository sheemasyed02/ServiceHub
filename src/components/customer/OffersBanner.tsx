import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { MOCK_IMAGES } from '@/constants/customer/images';
import { useAppTheme } from '@/hooks';

export type OffersBannerProps = {
  title: string;
  subtitle: string;
  code?: string;
  onPress?: () => void;
};

export function OffersBanner({ title, subtitle, code, onPress }: OffersBannerProps) {
  const theme = useAppTheme();
  const { colors, shadows } = theme.tokens;

  return (
    <Pressable onPress={onPress} style={[styles.wrap, shadows.md]}>
      <ImageBackground
        source={{ uri: MOCK_IMAGES.offerBanner }}
        style={styles.banner}
        imageStyle={styles.bannerImage}
      >
        <LinearGradient
          colors={['rgba(196, 160, 32, 0.85)', 'rgba(17, 24, 39, 0.75)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.overlay}
        />
        <View style={styles.content}>
          <Text variant="labelSmall" style={{ color: 'rgba(255,255,255,0.85)', fontWeight: '500' }}>
            Limited offer
          </Text>
          <Text variant="titleMedium" style={{ color: colors.white, fontWeight: '600' }}>
            {title}
          </Text>
          <Text variant="bodySmall" style={{ color: 'rgba(255,255,255,0.9)' }}>
            {subtitle}
          </Text>
          {code ? (
            <View style={styles.codePill}>
              <Text variant="labelMedium" style={{ color: colors.white, fontWeight: '600' }}>
                {code}
              </Text>
            </View>
          ) : null}
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  banner: {
    minHeight: 132,
    justifyContent: 'flex-end',
  },
  bannerImage: {
    borderRadius: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16,
  },
  content: {
    padding: 16,
    gap: 4,
    zIndex: 1,
  },
  codePill: {
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
});
