import React, { createContext, useState, useEffect } from "react";
import {
  Colors,
  Coordinates,
  StorageData,
  WeatherContextInterface,
  WeatherData,
  WeatherProviderProps,
} from "../interfaces";
import { colors } from "../config/colors";
import { StyleSheet } from "react-native";

import { fetchLocationData } from "../utils/location";
import { getStorageData } from "../utils/storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { getWeatherData } from "../utils/weather";

const defaultState: WeatherContextInterface = {
  appColors: colors.sunny,
  location: null,
  savedLocations: null,
  setAppColors: () => null,
  setLocation: () => null,
  setSavedLocations: async () => null,
  updateWeather: async () => {},
  fetchData: async () => {},
};

export const WeatherContext = createContext(defaultState);

export default function WeatherProvider({ children }: WeatherProviderProps) {
  const [appColors, setAppColors] = useState<Colors>(colors.sunny);
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [savedLocations, setSavedLocations] = useState<StorageData | null>(
    null
  );

  const updateWeather = async (): Promise<void> => {
    const locations = await getStorageData("locations");

    const storageLocations: WeatherData[] =
      (locations?.value as WeatherData[]) || [];
    const updateWeatherData = await Promise.all(
      storageLocations?.map(async (location) => {
        const locationWeather = await getWeatherData(location.name);
        return locationWeather;
      })
    );
    const updateStorage: StorageData = {
      value: updateWeatherData,
    };

    setSavedLocations(updateStorage);
  };

  const fetchData = async () => {
    const coords = await fetchLocationData();
    setLocation(coords || null);
    // await updateWeather();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        appColors,
        setAppColors,
        location,
        savedLocations,
        setLocation,
        setSavedLocations,
        updateWeather,
        fetchData,
      }}
    >
      <SafeAreaView
        style={[styles.main, { backgroundColor: appColors.primary }]}
      >
        {children}
      </SafeAreaView>
    </WeatherContext.Provider>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});