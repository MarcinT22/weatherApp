import { StatusBar } from "react-native";

import React from "react";

import Navigation from "./navigations/Navigation";
import WeatherProvider from "./providers/WeatherProviders";
import { RootSiblingParent } from "react-native-root-siblings";

const App: React.FC = () => {
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
