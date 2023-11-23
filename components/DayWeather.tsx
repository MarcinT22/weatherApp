import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

import { DayWeatherProps } from "../interfaces";
import { dateFormat, getDayName } from "../utils/dateFormat";
import { getWeatherImage } from "../utils/weather";
import { icons } from "../config/weatherImages";
import { Ionicons } from "@expo/vector-icons";

const DayWeather: React.FC<DayWeatherProps> = React.memo((props) => {
  const { item } = props;

  return (
    <View style={styles.view}>
      <Text style={styles.date}>{getDayName(item.date)}</Text>
      <Text style={styles.date}>{dateFormat(item.date, "HH:mm")}</Text>
      <Image
        style={styles.icon}
        source={icons[getWeatherImage(item.id, item.date)]}
      />
      <Text style={styles.temp}>
        {item.temp.toFixed(0)}
        {"\u00B0"}
      </Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.data}>
        <View style={styles.humidity}>
          <Ionicons name="water-outline" size={14} color="#777" />
          <Text style={styles.humidityText}>{item?.humidity}%</Text>
        </View>
      </View>
    </View>
  );
});

export default DayWeather;

const styles = StyleSheet.create({
  view: {
    width: 110,
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#f1f1f1",
  },
  date: {
    color: "#777",
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Poppins-400",
  },
  icon: {
    width: 50,
    height: 50,
    marginVertical: 6,
  },
  data: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  temp: {
    fontSize: 18,
    color: "#777",
    fontFamily: "Poppins-500",
  },
  description: {
    fontSize: 10,
    color: "#777",
    textAlign: "center",
    fontFamily: "Poppins-400",
    lineHeight: 12,
  },

  humidity: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
  },

  humidityText: {
    color: "#777",
    fontSize: 12,
    fontFamily: "Poppins-400",
  },
});
