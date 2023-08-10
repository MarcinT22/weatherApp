import {
  StyleSheet,
  RefreshControl,
  ScrollView,
  View,
  Text,
} from "react-native";
import React, { useState, useCallback, useContext, useEffect } from "react";

import CurrentWeather from "../components/CurrentWeather";
import ForecastWeather from "../components/ForecastWeather";
import "react-native-gesture-handler";
import { WeatherContext } from "../providers/WeatherProviders";
import {
  Coordinates,
  WeatherContextInterface,
  WeatherData,
} from "../interfaces";
import { checkNetworkConnection } from "../utils/networkConnection";
import { getForecastData, getWeatherData } from "../utils/weather";
import { getColors } from "../config/colors";
import { isLoaded } from "expo-font";
import AnimatedLottieView from "lottie-react-native";

const HomeScreen: React.FC = () => {
  const {
    fetchData,
    location,
    appColors,
    setAppColors,
    isUpdating,
    setIsUpdating,
  } = useContext<WeatherContextInterface>(WeatherContext);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [forecastData, setForecastData] = useState<WeatherData[]>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const isNetwork = await checkNetworkConnection();
    if (isNetwork) {
      await fetchData();
    }
    setRefreshing(false);
  }, []);

  const getWeather = async (location: Coordinates): Promise<void> => {
    try {
      const [weatherData, forecastData] = await Promise.all([
        getWeatherData(location),
        getForecastData(location),
      ]);
      if (weatherData && forecastData) {
        await setColors(weatherData?.id);
        setWeatherData(weatherData);
        setForecastData(forecastData);
        setIsLoaded(true);
        setIsUpdating(false);
      }
    } catch (error) {
      console.log("Błąd podczas pobierania danych pogodowych", error);
    }
  };

  const setColors = async (weatherId: number): Promise<void> => {
    const colors = await getColors(weatherId);
    if (colors) {
      setAppColors(colors);
    }
  };

  useEffect(() => {
    if (location) {
      getWeather(location);
    }
  }, [location]);

  return (
    <ScrollView
      contentContainerStyle={styles.main}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {isLoaded ? (
        <>
          <CurrentWeather weatherData={weatherData} update={isUpdating} />
          <ForecastWeather forecastData={forecastData} />
        </>
      ) : (
        <View style={[styles.loader, { backgroundColor: appColors.primary }]}>
          <AnimatedLottieView
            source={require("../assets/loader.json")}
            style={{ width: 150, height: 150 }}
            autoPlay
          />
        </View>
      )}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
