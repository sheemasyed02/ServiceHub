import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, View, type ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';

import { useAppTheme } from '@/hooks';
import { pickUpload, type PickedMedia, type UploadPickMode } from '@/utils/mediaPicker';

import { FieldLabel } from './FieldLabel';

export type UploadButtonProps = {
  label: string;
  placeholder?: string;
  required?: boolean;
  mode?: UploadPickMode;
  file?: PickedMedia | null;
  onUploaded?: (file: PickedMedia) => void;
  error?: string;
  style?: ViewStyle;
};

export function UploadButton({
  label,
  placeholder = 'Tap to upload',
  required = false,
  mode = 'document',
  file,
  onUploaded,
  error,
  style,
}: UploadButtonProps) {
  const theme = useAppTheme();
  const { colors, layout } = theme.tokens;
  const uploaded = Boolean(file?.uri);
  const isImage =
    file?.mimeType?.startsWith('image/') ?? file?.name.match(/\.(jpg|jpeg|png|webp)$/i);

  const handlePress = async () => {
    const picked = await pickUpload(mode);
    if (picked) onUploaded?.(picked);
  };

  return (
    <View style={[styles.container, style]}>
      <FieldLabel label={label} required={required} />

      <Pressable
        onPress={handlePress}
        style={[
          styles.button,
          {
            minHeight: layout.inputHeight,
            borderColor: error
              ? colors.error
              : uploaded
                ? colors.inputBorderFocus
                : colors.inputBorder,
            backgroundColor: colors.inputBackground,
          },
        ]}
      >
        {uploaded && isImage ? (
          <Image source={{ uri: file!.uri }} style={styles.thumb} resizeMode="cover" />
        ) : (
          <MaterialCommunityIcons
            name={uploaded ? 'file-check-outline' : 'upload-outline'}
            size={20}
            color={colors.textTertiary}
          />
        )}

        <Text
          variant="bodyLarge"
          style={[styles.text, { color: uploaded ? colors.textPrimary : colors.placeholder }]}
          numberOfLines={1}
        >
          {uploaded ? file!.name : placeholder}
        </Text>

        <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textTertiary} />
      </Pressable>

      {error ? (
        <Text variant="bodySmall" style={{ color: colors.error }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
    width: '100%',
  },
  button: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  thumb: {
    width: 28,
    height: 28,
    borderRadius: 6,
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
});
