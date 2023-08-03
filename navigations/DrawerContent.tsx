import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { WeatherContext } from "../providers/WeatherProviders";
import Location from "../components/Location";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { WeatherContextInterface } from "../interfaces";

const DrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const { navigation } = props;
  const { appColors, savedLocations } =
    useContext<WeatherContextInterface>(WeatherContext);

  const data = Array.isArray(savedLocations?.value)
    ? savedLocations?.value
    : [];
  const closeDrawer = () => {
    navigation.closeDrawer();
  };

  return (
    <View style={[styles.main, { backgroundColor: appColors.primary }]}>
      {data?.length ? (
        <>
          <View style={styles.header}>
            <View style={styles.label}>
              <MaterialCommunityIcons
                name="map-marker-multiple-outline"
                size={22}
                color="rgba(255,255,255,0.8)"
              />
              <Text style={[styles.text, styles.textBold]}>
                Twoje lokalizacje:
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("AddLocationScreen");
                }}
              >
                <MaterialCommunityIcons
                  name="map-marker-plus"
                  size={28}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            data={data}
            renderItem={({ item }) => (
              <Location data={item} onCloseDrawer={closeDrawer} />
            )}
          />

          <TouchableOpacity
            style={styles.management}
            onPress={() => {
              navigation.navigate("LocationsScreen");
            }}
          >
            <Text style={styles.managementText}>Zarządzaj lokalizacjami</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.centered}>
          <Text style={styles.text}>Brak zapisanych lokalizaji</Text>
          <TouchableOpacity
            style={styles.management}
            onPress={() => {
              navigation.navigate("AddLocationScreen");
            }}
          >
            <Text style={styles.managementText}>Dodaj lokalizację</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 10,
  },

  header: {
    paddingBottom: 5,
    marginTop: 5,
    marginBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.2)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  management: {
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 30,
    width: "100%",
    alignSelf: "center",
    marginVertical: 5,
  },

  managementText: {
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

  label: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  text: {
    color: "rgba(255,255,255,0.8)",
    fontFamily: "Poppins-400",
    marginLeft: 4,
  },
  textBold: {
    fontFamily: "Poppins-500",
  },
});
