import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import DayWeather from "./DayWeather";
import { getForecastData } from "../utils/weather";
import {
  Coordinates,
  WeatherContextInterface,
  WeatherData,
} from "../interfaces";
import { WeatherContext } from "../providers/WeatherProviders";
import { isLoaded } from "expo-font";

const ForecastWeather: React.FC<{
  location: Coordinates | null;
}> = (props) => {
  const { location } = props;

  const [forecastData, setForecastData] = useState<
    WeatherData[] | null | undefined
  >(null);
  const { appColors } = useContext<WeatherContextInterface>(WeatherContext);

  useEffect(() => {
    const fetchForecastData = async (): Promise<void> => {
      if (!location) return;
      try {
        const forecastData = await getForecastData(location);
        setForecastData(null);
        setForecastData(forecastData);
      } catch (error) {
        console.log("Błąd podczas pobierania pogody na kolejne dni");
      }
    };
    fetchForecastData();
  }, [location]);

  return (
    <View style={styles.main}>
      <Text style={[styles.text, { color: appColors.primary }]}>
        Prognoza na 5 dni (co 3 godziny)
      </Text>
      {forecastData && (
        <FlatList
          initialNumToRender={4}
          contentContainerStyle={styles.flatList}
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          data={forecastData}
          renderItem={({ item }) => <DayWeather item={item} />}
        />
      )}
    </View>
  );
};

export default ForecastWeather;

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#fff",
    paddingVertical: 15,
  },
  text: {
    paddingHorizontal: 10,
    fontFamily: "Poppins-500",
  },
  flatList: {
    paddingLeft: 10,
    marginVertical: 5,
  },
});
