import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";

import DayWeather from "./DayWeather";
import { WeatherContextInterface, WeatherData } from "../interfaces";
import { WeatherContext } from "../providers/WeatherProviders";

const ForecastWeather: React.FC<{
  forecastData: WeatherData[] | undefined;
}> = (props) => {
  const { forecastData } = props;

  const { appColors } = useContext<WeatherContextInterface>(WeatherContext);

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
