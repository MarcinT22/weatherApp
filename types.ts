import { DrawerNavigationProp } from "@react-navigation/drawer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StorageData } from "./interfaces";

export type DrawerParamList = {
  HomeScreen: undefined;
};

export type DrawerProp = DrawerNavigationProp<DrawerParamList, "HomeScreen">;

export type StackParamList = {
  Home: undefined;
  AddLocationScreen: undefined;
  LocationsScreen: { savedLocations: StorageData | null };
};

export type StackProp = NativeStackNavigationProp<
  StackParamList,
  "Home" | "AddLocationScreen" | "LocationsScreen"
>;
