import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { WeatherContext } from "../providers/WeatherProviders";
import BackButton from "../components/BackButton";

import { useNavigation } from "@react-navigation/native";
import { StackProp } from "../types";

import { FlatList } from "react-native";

import {
  StorageData,
  WeatherContextInterface,
  WeatherData,
} from "../interfaces";
import { storeData } from "../utils/storage";
import LocationManagement from "../components/LocationManagement";
import LocationRemovalModal from "../components/LocationRemovalModal";

const LocationsScreen: React.FC = () => {
  const { appColors, savedLocations, setSavedLocations } =
    useContext<WeatherContextInterface>(WeatherContext);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [locationData, setLocationData] = useState<WeatherData | null>(null);
  const navigation = useNavigation<StackProp>();

  let data = Array.isArray(savedLocations?.value) ? savedLocations?.value : [];

  const removeLocation = async (location: WeatherData): Promise<void> => {
    const updatedData: StorageData = {
      value: data?.filter((item) => item.name !== location.name) ?? [],
    };

    setSavedLocations(updatedData);
    await storeData("locations", updatedData);
  };

  const showModal = (item: WeatherData): void => {
    setLocationData(item);
    setModalVisible(true);
  };

  return (
    <View style={[styles.main, { backgroundColor: appColors.primary }]}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.title}>Zarządzaj lokalizacjami</Text>
      </View>

      {data?.length ? (
        <>
          <FlatList
            initialNumToRender={8}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            data={data}
            renderItem={({ item }) => (
              <LocationManagement
                item={item}
                onRemove={() => showModal(item)}
                // onRemove={() => removeLocation(item)}
              />
            )}
          />
        </>
      ) : (
        <View style={styles.centered}>
          <Text style={styles.text}>Brak zapisanych lokalizacji</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          navigation.navigate("AddLocationScreen");
        }}
      >
        <Text style={styles.addButtonText}>Dodaj lokalizację</Text>
      </TouchableOpacity>
      <LocationRemovalModal
        modalVisible={modalVisible}
        name={locationData?.name || "Nieznana lokalizacja"}
        setModalVisible={setModalVisible}
        onRemove={() => {
          if (locationData) {
            removeLocation(locationData);
            setModalVisible(false);
          }
        }}
      />
    </View>
  );
};

export default LocationsScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: "Poppins-500",
    color: "#fff",
  },
  addButton: {
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 30,
    width: "100%",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10,
  },

  addButtonText: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "Poppins-500",
    fontSize: 14,
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
});
