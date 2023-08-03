import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackProp } from "../types";

const BackButton: React.FC = () => {
  const navigation = useNavigation<StackProp>();

  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
      <MaterialIcons name="arrow-back-ios" size={30} color="#fff" />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
  },
});
