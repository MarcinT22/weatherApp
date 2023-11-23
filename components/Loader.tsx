import { ActivityIndicator, StyleSheet, View } from "react-native";
import React from "react";
import { LoaderProps } from "../interfaces";

const Loader: React.FC<LoaderProps> = ({ color = "#ffffff" }) => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={color} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loading: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
