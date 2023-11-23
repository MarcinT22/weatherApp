import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";

import DayWeather from "./DayWeather";
import { WeatherContextInterface, WeatherData } from "../interfaces";
import { WeatherContext } from "../providers/WeatherProviders";
import Animated, { FadeInDown, FadeOut } from "react-native-reanimated";

const ForecastWeather: React.FC<{
  forecastData: WeatherData[] | null | undefined;
}> = (props) => {
  const { forecastData } = props;

  const { appColors } = useContext<WeatherContextInterface>(WeatherContext);

  return (
    <View style={styles.main}>
      {forecastData && (
        <>
          <Animated.Text
            style={[styles.text, { color: appColors.primary }]}
            entering={FadeInDown.delay(200).duration(1000).springify()}
          >
            Prognoza na 5 dni (co 3 godziny)
          </Animated.Text>

          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
            exiting={FadeOut.duration(500).springify()}
          >
            <FlatList
              initialNumToRender={4}
              contentContainerStyle={styles.flatList}
              showsHorizontalScrollIndicator={false}
              horizontal
              keyExtractor={(item, index) => index.toString()}
              data={forecastData}
              renderItem={({ item }) => <DayWeather item={item} />}
            />
          </Animated.View>
        </>
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
