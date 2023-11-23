import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Foundation } from "@expo/vector-icons";
import { WeatherData } from "../interfaces";

const LocationManagement: React.FC<{
  item: WeatherData;
  onRemove: () => void;
}> = ({ item, onRemove }) => {
  return (
    <View style={styles.view}>
      <Text numberOfLines={1} style={styles.text}>
        {item.name}
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity onPress={onRemove}>
          <Foundation name="trash" size={24} color="#c73a3a" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocationManagement;

const styles = StyleSheet.create({
  view: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    fontFamily: "Poppins-400",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },

  default: {
    marginRight: 20,
  },
});
