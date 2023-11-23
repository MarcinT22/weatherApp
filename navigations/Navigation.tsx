import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigation from "./Drawer";
import AddLocationScreen from "../screens/AddLocationScreen";
import LocationsScreen from "../screens/LocationsScreen";

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={DrawerNavigation} />
        <Stack.Screen name="AddLocationScreen" component={AddLocationScreen} />
        <Stack.Screen name="LocationsScreen" component={LocationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
