import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Platform } from 'react-native';

export type PickedMedia = {
  uri: string;
  name: string;
  mimeType?: string;
};

export type UploadPickMode = 'selfie' | 'document';

type PickSource = 'camera' | 'gallery' | 'file';

async function ensureCameraPermission(): Promise<boolean> {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission needed', 'Allow camera access to take photos.');
    return false;
  }
  return true;
}

async function ensureGalleryPermission(): Promise<boolean> {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission needed', 'Allow photo library access to choose images.');
    return false;
  }
  return true;
}

function fileNameFromUri(uri: string, fallback: string): string {
  const segment = uri.split('/').pop();
  return segment && segment.length > 0 ? segment : fallback;
}

async function pickFromCamera(mode: UploadPickMode): Promise<PickedMedia | null> {
  if (!(await ensureCameraPermission())) return null;

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ['images'],
    allowsEditing: mode === 'selfie',
    aspect: mode === 'selfie' ? [1, 1] : undefined,
    quality: 0.85,
    cameraType: mode === 'selfie' ? ImagePicker.CameraType.front : ImagePicker.CameraType.back,
  });

  if (result.canceled || !result.assets[0]) return null;

  const asset = result.assets[0];
  return {
    uri: asset.uri,
    name: asset.fileName ?? fileNameFromUri(asset.uri, `${mode}.jpg`),
    mimeType: asset.mimeType ?? 'image/jpeg',
  };
}

async function pickFromGallery(mode: UploadPickMode): Promise<PickedMedia | null> {
  if (!(await ensureGalleryPermission())) return null;

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: mode === 'selfie',
    aspect: mode === 'selfie' ? [1, 1] : undefined,
    quality: 0.85,
  });

  if (result.canceled || !result.assets[0]) return null;

  const asset = result.assets[0];
  return {
    uri: asset.uri,
    name: asset.fileName ?? fileNameFromUri(asset.uri, `${mode}.jpg`),
    mimeType: asset.mimeType ?? 'image/jpeg',
  };
}

async function pickFromFiles(): Promise<PickedMedia | null> {
  const result = await DocumentPicker.getDocumentAsync({
    type: ['image/*', 'application/pdf'],
    copyToCacheDirectory: true,
    multiple: false,
  });

  if (result.canceled || !result.assets[0]) return null;

  const asset = result.assets[0];
  return {
    uri: asset.uri,
    name: asset.name,
    mimeType: asset.mimeType ?? undefined,
  };
}

function pickSource(mode: UploadPickMode, source: PickSource): Promise<PickedMedia | null> {
  if (source === 'camera') return pickFromCamera(mode);
  if (source === 'gallery') return pickFromGallery(mode);
  return pickFromFiles();
}

export function pickUpload(mode: UploadPickMode): Promise<PickedMedia | null> {
  const title = mode === 'selfie' ? 'Upload selfie' : 'Upload Aadhaar';
  const message =
    mode === 'selfie'
      ? 'Take a photo or choose from your gallery.'
      : 'Take a photo, choose from gallery, or pick a PDF/image file.';

  return new Promise((resolve) => {
    const options =
      mode === 'selfie'
        ? [
            { text: 'Take photo', onPress: () => void pickSource(mode, 'camera').then(resolve) },
            {
              text: 'Choose from photos',
              onPress: () => void pickSource(mode, 'gallery').then(resolve),
            },
            { text: 'Cancel', style: 'cancel' as const, onPress: () => resolve(null) },
          ]
        : [
            { text: 'Take photo', onPress: () => void pickSource(mode, 'camera').then(resolve) },
            {
              text: 'Choose from photos',
              onPress: () => void pickSource(mode, 'gallery').then(resolve),
            },
            { text: 'Choose file', onPress: () => void pickSource(mode, 'file').then(resolve) },
            { text: 'Cancel', style: 'cancel' as const, onPress: () => resolve(null) },
          ];

    if (Platform.OS === 'ios') {
      Alert.alert(title, message, options);
      return;
    }

    Alert.alert(title, message, options, { cancelable: true });
  });
}
