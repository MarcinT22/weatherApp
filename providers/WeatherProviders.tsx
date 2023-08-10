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
import { checkNetworkConnection } from "../utils/networkConnection";
import { useFonts } from "expo-font";

import { fonts } from "../utils/fonts";

const defaultState: WeatherContextInterface = {
  location: null,
  appColors: colors.sunny,
  isUpdating: false,
  savedLocations: null,
  setAppColors: () => null,
  setIsUpdating: () => false,
  setLocation: () => null,
  setSavedLocations: async () => null,
  updateWeather: async () => {},
  fetchData: async () => {},
};

export const WeatherContext = createContext(defaultState);

export default function WeatherProvider({ children }: WeatherProviderProps) {
  const [fontsLoaded] = useFonts(fonts);
  const [appColors, setAppColors] = useState<Colors>(colors.sunny);
  const [savedLocations, setSavedLocations] = useState<StorageData | null>(
    null
  );
  const [location, setLocation] = useState<Coordinates | null>();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

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

  const fetchData = async (): Promise<void> => {
    try {
      const coords = await fetchLocationData();

      if (coords) {
        await updateWeather();
        setLocation(coords);
      }
    } catch (error) {
      console.log("FetchData error", error);
    }
  };

  useEffect(() => {
    const checkNetworkAndFetch = async () => {
      const isNetwork = await checkNetworkConnection();
      if (isNetwork) {
        await fetchData();
      }
    };

    checkNetworkAndFetch();
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        location,
        appColors,
        isUpdating,
        setIsUpdating,
        setAppColors,
        setLocation,
        savedLocations,
        setSavedLocations,
        updateWeather,
        fetchData,
      }}
    >
      <SafeAreaView
        style={[styles.main, { backgroundColor: appColors.primary }]}
      >
        {fontsLoaded && children}
      </SafeAreaView>
    </WeatherContext.Provider>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
