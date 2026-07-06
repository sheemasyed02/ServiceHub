import * as Location from 'expo-location';

export type PlaceResult = {
  label: string;
  full: string;
  coords: { latitude: number; longitude: number };
};

export async function requestLocationPermission(): Promise<boolean> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === 'granted';
}

function formatPlace(
  place: Location.LocationGeocodedAddress,
  coords: { latitude: number; longitude: number },
): PlaceResult {
  const area = place.district || place.subregion || place.street || place.name;
  const city = place.city || place.region;
  const label = [area, city].filter(Boolean).join(', ') || 'Current location';
  const full = [place.name, place.street, area, city, place.postalCode]
    .filter(Boolean)
    .join(', ');

  return {
    label,
    full: full || label,
    coords,
  };
}

export async function getCurrentPlace(): Promise<PlaceResult | null> {
  const granted = await requestLocationPermission();
  if (!granted) return null;

  const position = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });

  const coords = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };

  const places = await Location.reverseGeocodeAsync(coords);
  if (places[0]) {
    return formatPlace(places[0], coords);
  }

  return {
    label: 'Current location',
    full: `${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`,
    coords,
  };
}
