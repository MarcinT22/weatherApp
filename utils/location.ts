import * as Location from "expo-location";
import { Coordinates } from "../interfaces";

export const getDeviceLocation =
  async (): Promise<Location.LocationObject | null> => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("Brak uprawnień do pobrania lokalizacji");
        return null;
      }

      const location = await Location.getCurrentPositionAsync();

      return location;
    } catch (error) {
      console.log("Brak uprawnien do lokalizacji", error);
      return null;
    }
  };

export const fetchLocationData = async (): Promise<Coordinates | null> => {
  try {
    const currentLocation = await getDeviceLocation();

    if (currentLocation) {
      const coords = {
        lat: currentLocation.coords.latitude,
        lon: currentLocation.coords.longitude,
      };
      return coords;
    }
    return null;
  } catch (error) {
    console.log("Błąd podczas pobierania lokalizacji:", error);
    return null;
  }
};

export const isLocationNearby = (
  currentLat: number,
  currentLon: number,
  targetLat: number,
  targetLon: number
): boolean => {
  const distanceThreshold = 0.01;

  const distance = Math.sqrt(
    Math.pow(currentLat - targetLat, 2) + Math.pow(currentLon - targetLon, 2)
  );

  return distance < distanceThreshold;
};
