import { StyleSheet, Modal, View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import AnimatedLottieView from "lottie-react-native";

const LocationRemovalModal: React.FC<{
  modalVisible: boolean;
  name: string;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onRemove: () => void;
}> = ({ modalVisible, name, setModalVisible, onRemove }) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalVisible}
      statusBarTranslucent
    >
      <View style={styles.modal}>
        <View style={styles.container}>
          <View style={styles.content}>
            <AnimatedLottieView
              autoPlay
              source={require("../assets/removeLocation.json")}
              style={styles.icon}
            />
            <Text style={styles.text}>
              Czy na pewno chcesz usunąć lokalizację{" "}
              <Text style={styles.bold}>{name}</Text>?
            </Text>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={[styles.button, styles.highlight]}
                onPress={() => onRemove()}
              >
                <Text style={[styles.buttonText, styles.white]}>Tak</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Nie</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LocationRemovalModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    margin: 0,
    padding: 15,
  },
  container: {
    width: "100%",
  },

  content: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 30,
    backgroundColor: "#fff",
    borderRadius: 10,
  },

  text: {
    fontSize: 16,
    fontFamily: "Poppins-400",
    textAlign: "center",
    color: "#333",
    lineHeight: 26,
    marginVertical: 5,
  },
  bold: {
    fontFamily: "Poppins-700",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    marginTop: 15,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#ededed",
  },
  highlight: {
    backgroundColor: "#a82532",
  },

  buttonText: {
    fontFamily: "Poppins-500",
    lineHeight: 20,
    fontSize: 16,
  },
  white: {
    color: "#fff",
  },
  icon: {
    width: 180,
    height: 180,
    alignSelf: "center",
  },
});
