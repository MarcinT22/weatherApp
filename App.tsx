import { StatusBar } from "react-native";

import React from "react";

import Navigation from "./navigations/Navigation";
import WeatherProvider from "./providers/WeatherProviders";
import { RootSiblingParent } from "react-native-root-siblings";
import { useFonts } from "expo-font";
import { fonts } from "./utils/fonts";

const App: React.FC = () => {
  const [fontsLoaded] = useFonts(fonts);

  return (
    <RootSiblingParent>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <WeatherProvider fontsLoaded={fontsLoaded}>
        <Navigation />
      </WeatherProvider>
    </RootSiblingParent>
  );
};

export default App;
