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

const defaultState: WeatherContextInterface = {
  location: null,
  appColors: colors.sunny,
  isUpdating: false,
  savedLocations: null,
  setAppColors: () => {},
  setIsUpdating: () => {},
  setLocation: () => {},
  setSavedLocations: async () => null,
  updateWeather: async () => {},
  fetchData: async () => {},
};

export const WeatherContext = createContext(defaultState);

export default function WeatherProvider({
  children,
  fontsLoaded,
}: WeatherProviderProps) {
  const [appColors, setAppColors] = useState<Colors>(colors.sunny);
  const [savedLocations, setSavedLocations] = useState<StorageData | null>(
    null
  );
  const [location, setLocation] = useState<Coordinates | null>();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const updateWeather = async (): Promise<void> => {
    try {
      const locations = await getStorageData("locations");
      const storageLocations: WeatherData[] =
        (locations?.value as WeatherData[]) || [];
      const updateWeatherData = await Promise.all(
        storageLocations?.map(async (location) => {
          try {
            const locationWeather = await getWeatherData(location.name);
            return locationWeather;
          } catch (error) {
            console.log(
              "Błąd podczas pobierania danych pogodowych z storage",
              error
            );
            return null;
          }
        })
      );
      const updateStorage: StorageData = {
        value: updateWeatherData.filter((data) => data !== null),
      };

      setSavedLocations(updateStorage);
    } catch (error) {
      console.log("Błąd podczas aktualizacji pogody:", error);
    }
  };

  const fetchData = async (): Promise<void> => {
    try {
      const coords = await fetchLocationData();

      if (!coords) {
        setLocation(null);
      } else {
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

    updateWeather();
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
