import { ImageBackground, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { MOCK_IMAGES } from '@/constants/customer/images';
import { useAppTheme } from '@/hooks';

export function MapPlaceholder() {
  const theme = useAppTheme();
  const { colors } = theme.tokens;

  return (
    <View style={styles.wrap}>
      <ImageBackground
        source={{ uri: MOCK_IMAGES.mapPreview }}
        style={styles.map}
        imageStyle={styles.mapImage}
      >
        <View style={styles.overlay} />
        <View style={[styles.pin, styles.customer, { backgroundColor: colors.primary }]}>
          <Text style={{ color: colors.white, fontSize: 10, fontWeight: '700' }}>You</Text>
        </View>
        <View style={[styles.pin, styles.provider, { backgroundColor: colors.surface }]}>
          <Text style={{ color: colors.textPrimary, fontSize: 10, fontWeight: '600' }}>Pro</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  map: {
    height: 260,
    justifyContent: 'center',
  },
  mapImage: {
    borderRadius: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(17, 24, 39, 0.15)',
  },
  pin: {
    position: 'absolute',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  customer: {
    bottom: 48,
    left: 32,
  },
  provider: {
    top: 72,
    right: 40,
  },
});
