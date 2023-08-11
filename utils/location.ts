import * as Location from "expo-location";
import { Coordinates } from "../interfaces";

export const getDeviceLocation = async (): Promise<
  Location.LocationObject | undefined
> => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      console.log("Brak uprawnień do pobrania lokalizacji");
      return;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.LocationAccuracy.Balanced,
    });

    return location;
  } catch (error) {
    console.log("Brak uprawnien do lokalizacji", error);
    return undefined;
  }
};

export const fetchLocationData = async (): Promise<Coordinates | undefined> => {
  try {
    const currentLocation = await getDeviceLocation();

    if (currentLocation) {
      const coords = {
        lat: currentLocation.coords.latitude,
        lon: currentLocation.coords.longitude,
      };
      return coords;
    }
    return undefined;
  } catch (error) {
    console.log("Błąd podczas pobierania lokalizacji:", error);
    return undefined;
  }
};
