import { StatusBar, StyleSheet } from "react-native";

import React from "react";
import { useFonts } from "expo-font";
import "react-native-gesture-handler";
import Navigation from "./navigations/Navigation";
import WeatherProvider from "./providers/WeatherProviders";
import { RootSiblingParent } from "react-native-root-siblings";

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-300": require("./assets/fonts/Poppins-Thin.ttf"),
    "Poppins-400": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-500": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-600": require("./assets/fonts/Poppins-Thin.ttf"),
    "Poppins-700": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-900": require("./assets/fonts/Poppins-Black.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <RootSiblingParent>
      <WeatherProvider>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <Navigation />
      </WeatherProvider>
    </RootSiblingParent>
  );
};

export default App;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
