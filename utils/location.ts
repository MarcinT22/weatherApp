import * as Location from "expo-location";
import { Coordinates } from "../interfaces";

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
