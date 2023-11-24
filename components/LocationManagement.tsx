import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
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
          <FontAwesome name="trash-o" size={26} color="rgba(0,0,0,0.5)" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocationManagement;

const styles = StyleSheet.create({
  view: {
    backgroundColor: "rgba(255, 255, 255, 0.22)",
    borderColor: "#rgba(255,255,255,0.6)",
    borderWidth: 1,
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
    fontFamily: "Poppins-500",
    color: "#fff",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },

  default: {
    marginRight: 20,
  },
});
