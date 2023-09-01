import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { WeatherContextInterface, WeatherData } from "../interfaces";
import { icons } from "../config/weatherImages";
import { getWeatherImage } from "../utils/weather";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { WeatherContext } from "../providers/WeatherProviders";
import { checkNetworkConnection } from "../utils/networkConnection";

interface LocationComponent {
  data: WeatherData;
  onCloseDrawer?: () => void;
}

const Location: React.FC<LocationComponent> = (props) => {
  const { data, onCloseDrawer } = props;
  const { location, setLocation, updateWeather, setIsUpdating } =
    useContext<WeatherContextInterface>(WeatherContext);

  const isActive =
    location?.lat === data.coord?.lat && location?.lon === data.coord?.lon;

  const selectLocation = async (): Promise<void> => {
    setIsUpdating(true);
    onCloseDrawer?.();
    if (data && data.coord) {
      const isNetwork = await checkNetworkConnection();
      if (!isNetwork) {
        return;
      }
      setLocation(data.coord);
      await updateWeather();
    }
  };

  return (
    <TouchableOpacity style={styles.main} onPress={selectLocation}>
      <View style={[styles.item, isActive && styles.activeItem]}>
        {isActive && (
          <MaterialCommunityIcons
            name="map-marker-outline"
            size={20}
            color="white"
          />
        )}
        <Text
          numberOfLines={1}
          style={[styles.text, isActive && styles.active]}
        >
          {data.name}
        </Text>
      </View>
      <View style={styles.data}>
        <Image
          style={styles.image}
          source={icons[getWeatherImage(data.id, data.date)]}
        />
        <Text style={styles.temp}>
          {data.temp.toFixed(0)}
          {"\u00B0"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Location;

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    paddingVertical: 5,
    paddingLeft: 25,
    paddingRight: 15,
  },
  item: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  activeItem: {
    marginLeft: -25,
  },
  text: {
    color: "#fff",
    fontFamily: "Poppins-400",
    fontSize: 14,
  },

  active: {
    fontFamily: "Poppins-700",
    marginLeft: 5,
  },

  data: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  image: {
    width: 24,
    height: 24,
  },

  temp: {
    fontFamily: "Poppins-400",
    fontSize: 12,
    color: "#fff",
    marginLeft: 5,
  },
});
