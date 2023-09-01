import * as Location from "expo-location";
import { Coordinates, LocationRange } from "../interfaces";

export const getDeviceLocation =
  async (): Promise<Location.LocationObject | null> => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.error("Brak uprawnień do pobrania lokalizacji");
        return null;
      }

      const location = await Location.getCurrentPositionAsync();

      return location;
    } catch (error) {
      console.error("Brak uprawnien do lokalizacji", error);
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
    console.error("Błąd podczas pobierania lokalizacji:", error);
    return null;
  }
};

export const checkLocationRange = (
  latitude: number,
  comparedLatitude: number,
  longitude: number,
  comparedLontitude: number
): boolean => {
  let isWithinLat =
    Math.abs(latitude - comparedLatitude) <= 0.009 ? true : false;
  let isWithinLon =
    Math.abs(longitude - comparedLontitude) <= 0.009 ? true : false;

  return isWithinLat && isWithinLon;
};
