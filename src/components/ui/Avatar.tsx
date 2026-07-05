import {
  Image,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
  type ViewStyle,
} from 'react-native';

import { useAppTheme } from '@/hooks';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type AvatarProps = {
  source?: ImageSourcePropType;
  name?: string;
  size?: AvatarSize;
  style?: ViewStyle;
  backgroundColor?: string;
  textColor?: string;
};

const SIZE_MAP: Record<AvatarSize, number> = {
  xs: 32,
  sm: 40,
  md: 48,
  lg: 64,
  xl: 88,
};

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export function Avatar({
  source,
  name = '',
  size = 'md',
  style,
  backgroundColor,
  textColor,
}: AvatarProps) {
  const theme = useAppTheme();
  const { colors } = theme.tokens;
  const dimension = SIZE_MAP[size];
  const fontSize = dimension * 0.36;

  return (
    <View
      style={[
        styles.avatar,
        {
          width: dimension,
          height: dimension,
          borderRadius: dimension / 2,
          backgroundColor: backgroundColor ?? colors.surfaceVariant,
        },
        style,
      ]}
    >
      {source ? (
        <Image
          source={source}
          style={{ width: dimension, height: dimension, borderRadius: dimension / 2 }}
        />
      ) : (
        <Text style={{ color: textColor ?? colors.primaryDark, fontSize, fontWeight: '700' }}>
          {getInitials(name) || '?'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
