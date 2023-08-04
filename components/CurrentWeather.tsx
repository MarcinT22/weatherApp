import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { getWeatherData, getWeatherImage } from "../utils/weather";
import {
  Coordinates,
  WeatherContextInterface,
  WeatherData,
} from "../interfaces";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { dateFormat } from "../utils/dateFormat";
import { LinearGradient } from "expo-linear-gradient";
import { icons, lottieIcons } from "../config/weatherImages";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { getColors } from "../config/colors";
import { WeatherContext } from "../providers/WeatherProviders";
import { DrawerProp } from "../types";
import AnimatedLottieView from "lottie-react-native";

const CurrentWeather: React.FC<{
  location: Coordinates | null;
}> = (props) => {
  const { location } = props;
  const navigation = useNavigation<DrawerProp>();

  const [weatherData, setWeatherData] = useState<WeatherData | null>();
  const [lastUpdate, setLastUpdate] = useState<string>();
  const [windSpeedInKMH, setWindSpeedInKMGH] = useState<number | null>();

  const { appColors, setAppColors } =
    useContext<WeatherContextInterface>(WeatherContext);

  const fetchWeather = async (): Promise<void> => {
    try {
      if (!location) return;

      const weather = await getWeatherData(location);
      setWeatherData(weather);

      const colors = await getColors(weather?.id);
      if (colors) {
        setAppColors(colors);
      }
      const windSpeedInKMH = weather?.wind ? weather.wind * 3.6 : undefined;
      setWindSpeedInKMGH(windSpeedInKMH);
      const date = new Date();

      setLastUpdate(dateFormat(date, "HH:mm"));
    } catch (error) {
      console.log("Błąd podczas pobierania danych miasta:", error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [location]);

  return (
    <>
      <LinearGradient
        colors={[appColors.primary, appColors.secondary]}
        style={styles.main}
      >
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.toggleDrawer()}
        >
          <Feather name="menu" size={40} color="#fff" />
        </TouchableOpacity>
        {weatherData && (
          <AnimatedLottieView
            autoPlay
            style={styles.icon}
            source={lottieIcons[getWeatherImage(weatherData.id)]}
          />
        )}
        <Text style={styles.cityName} numberOfLines={1}>
          {weatherData?.name}
        </Text>
        <Text style={styles.description}>{weatherData?.description}</Text>
        <Text style={styles.temp}>
          {weatherData?.temp.toFixed(0)}
          {"\u00B0"}
        </Text>

        {lastUpdate && (
          <View style={styles.lastUpdate}>
            <MaterialIcons
              name="update"
              size={18}
              color="rgba(255,255,255,0.7)"
            />
            <Text style={styles.lastUpdateText}>{lastUpdate}</Text>
          </View>
        )}

        <View style={styles.data}>
          <View style={styles.tempData}>
            <FontAwesome5 name="temperature-high" size={22} color="white" />
            <Text style={styles.label}>max/min</Text>
            <Text style={styles.text}>
              {weatherData?.maxTemp.toFixed(0)}
              {"\u00B0"}/{weatherData?.minTemp.toFixed(0)}
              {"\u00B0"}
            </Text>
          </View>

          <View style={styles.tempData}>
            <Ionicons name="water-outline" size={22} color="white" />
            <Text style={styles.label}>Wilgotność</Text>
            <Text style={styles.text}>{weatherData?.humidity}%</Text>
          </View>
          <View style={styles.tempData}>
            <MaterialIcons name="speed" size={22} color="white" />
            <Text style={styles.label}>Ciśnienie</Text>
            <Text style={styles.text}>{weatherData?.pressure} hPa</Text>
          </View>
          <View style={styles.tempData}>
            <Feather name="wind" size={22} color="white" />
            <Text style={styles.label}>Wiatr</Text>
            <Text style={styles.text}>{windSpeedInKMH?.toFixed(0)} km/h</Text>
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

export default CurrentWeather;

const styles = StyleSheet.create({
  main: {
    position: "relative",
    padding: 20,
    height: 445,
  },
  cityName: {
    fontFamily: "Poppins-700",
    fontSize: 26,
    color: "#fff",
    textTransform: "uppercase",
    textAlign: "center",
  },

  lastUpdate: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    color: "#fff",
    marginTop: -15,
    marginLeft: -15,
  },
  lastUpdateText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    fontFamily: "Poppins-400",
    marginLeft: 5,
  },

  temp: {
    color: "#fff",
    fontFamily: "Poppins-500",
    fontSize: 90,
    lineHeight: 100,
    marginTop: 20,
    marginLeft: 20,
    textAlign: "center",
  },

  description: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Poppins-400",
    textAlign: "center",
    marginTop: -8,
  },

  data: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
  },

  tempData: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: "#fff",
    fontFamily: "Poppins-500",
    fontSize: 12,
    marginTop: 8,
  },
  text: {
    color: "#fff",
    marginTop: 2,
    fontFamily: "Poppins-400",
    lineHeight: 18,
    fontSize: 14,
  },
  textMargin: {
    marginLeft: 3,
  },

  icon: {
    width: 120,
    height: 120,
    alignSelf: "center",
  },

  menuButton: {
    position: "absolute",
    left: 20,
    top: 10,
    zIndex: 100,
  },
});
