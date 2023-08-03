import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { WeatherContextInterface, WeatherData } from "../interfaces";
import { getWeatherImage } from "../utils/weather";
import { icons } from "../config/weatherImages";
import { storeLocations } from "../utils/storage";
import { WeatherContext } from "../providers/WeatherProviders";
import { useNavigation } from "@react-navigation/native";
import { DrawerProp } from "../types";

const SearchResult: React.FC<{ data: WeatherData }> = (props) => {
  const { data } = props;
  const { setLocation, updateWeather } =
    useContext<WeatherContextInterface>(WeatherContext);
  const navigation = useNavigation<DrawerProp>();

  const addToLocations = async (): Promise<void> => {
    await storeLocations(data);
    if (data && data.coord) {
      setLocation(data.coord);
      navigation.navigate("HomeScreen");
      await updateWeather();
    }
  };

  return (
    <TouchableOpacity style={styles.main} onPress={addToLocations}>
      <View style={styles.view}>
        <Text style={styles.name}>{data.name}</Text>
      </View>
      <View>
        <View style={styles.data}>
          <Image style={styles.icon} source={icons[getWeatherImage(data.id)]} />
          <Text style={styles.temp}>
            {data.temp.toFixed(0)}
            {"\u00B0"}
          </Text>
        </View>
        <Text style={styles.tempData}>
          {data.maxTemp.toFixed(0)}
          {"\u00B0"}/{data.minTemp.toFixed(0)}
          {"\u00B0"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchResult;

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  name: {
    fontFamily: "Poppins-500",
    color: "#333",
    fontSize: 16,
  },
  view: {
    flex: 1,
  },

  icon: {
    width: 40,
    height: 40,
  },
  data: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  temp: {
    fontSize: 22,
    fontFamily: "Poppins-400",
    textAlign: "center",
    marginLeft: 10,
    color: "#333",
  },
  tempData: {
    color: "#333",
    marginTop: 4,
    textAlign: "right",
    fontFamily: "Poppins-400",
  },
});
