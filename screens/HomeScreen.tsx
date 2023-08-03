import {
  StyleSheet,
  Text,
  RefreshControl,
  ScrollView,
  View,
} from "react-native";
import React, { useState, useCallback, useContext, useEffect } from "react";

import CurrentWeather from "../components/CurrentWeather";
import ForecastWeather from "../components/ForecastWeather";
import "react-native-gesture-handler";
import { WeatherContext } from "../providers/WeatherProviders";
import { WeatherContextInterface } from "../interfaces";

const HomeScreen: React.FC = () => {
  const { location, fetchData } =
    useContext<WeatherContextInterface>(WeatherContext);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.main}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <CurrentWeather location={location} />
      <ForecastWeather location={location} />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
