import React, { useContext, useState, useRef, useEffect } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { WeatherContext } from "../providers/WeatherProviders";
import BackButton from "../components/BackButton";
import { getWeatherData } from "../utils/weather";
import Loader from "../components/Loader";
import { WeatherContextInterface, WeatherData } from "../interfaces";
import SearchResult from "../components/SearchResult";

const AddLocationScreen = () => {
  const { appColors } = useContext<WeatherContextInterface>(WeatherContext);
  const [isFocused, setIsFocused] = useState<boolean>(true);
  const [text, setText] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>();
  const [error, setError] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const handleSearch = async (): Promise<void> => {
    setIsSearching(true);
    setError(null);
    const errorMessage = "Nie znaleziono lokalizacji";
    try {
      const response = await getWeatherData(text);

      if (response === undefined) {
        setError(errorMessage);
        return;
      }
      setWeatherData(response);
      setText("");
    } catch (error) {
      setError(errorMessage);
      console.log("Błąd podczas wyszukiwania lokalizacji", error);
    } finally {
      setIsSearching(false);
      setIsFocused(false);
    }
  };

  return (
    <>
      <View style={[styles.main, { backgroundColor: appColors.primary }]}>
        <View style={styles.search}>
          <BackButton />
          <TextInput
            autoFocus={isFocused}
            returnKeyType="search"
            value={text}
            onChangeText={(value) => setText(value)}
            placeholder="Wyszukaj"
            style={styles.input}
            placeholderTextColor="#fff"
            onSubmitEditing={handleSearch}
          />
        </View>
        {weatherData && !error ? (
          <View style={styles.results}>
            {!isSearching ? (
              <SearchResult data={weatherData} />
            ) : (
              <Loader color="#fff" />
            )}
          </View>
        ) : (
          <View style={styles.centered}>
            {!error ? (
              <Text style={styles.text}>Wprowadź nazwę lokalizacji</Text>
            ) : (
              <Text style={styles.text}>{error}</Text>
            )}
          </View>
        )}
      </View>
    </>
  );
};

export default AddLocationScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  search: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    color: "#fff",
    fontFamily: "Poppins-400",
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Poppins-400",
    color: "#fff",
  },
  results: {
    paddingVertical: 20,
    flex: 1,
  },
});
