import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageData, WeatherData } from "../interfaces";

export const storeData = async (key: string, value: StorageData) => {
  try {
    const stringValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
  } catch (e) {
    console.log(e);
  }
};

export const getStorageData = async (
  key: string
): Promise<StorageData | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const storeLocations = async (newLocation: WeatherData) => {
  const locationsData: StorageData | null = await getStorageData("locations");

  if (locationsData !== null && Array.isArray(locationsData.value)) {
    const existingLocations: WeatherData[] = locationsData.value;
    const locationExists = existingLocations.some(
      (location) => location.name === newLocation.name
    );

    if (!locationExists) {
      const updatedLocations: WeatherData[] = [
        ...existingLocations,
        newLocation,
      ];
      await storeData("locations", { value: updatedLocations });
    }
  } else {
    const locations: object = [newLocation];
    await storeData("locations", { value: locations });
  }
};

export const removeStorageData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("Błąd poczas usuwania danych z storage");
  }
};
