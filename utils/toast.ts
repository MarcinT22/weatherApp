import Toast from "react-native-root-toast";

export const toast = (message: string) => {
  Toast.show(message, {
    duration: Toast.durations.SHORT,
    backgroundColor: "#333",
  });
};
