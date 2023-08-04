import NetInfo from "@react-native-community/netinfo";
import { toast } from "./toast";

export const checkNetworkConnection = async (): Promise<boolean> => {
  const state = await NetInfo.fetch();
  if (!state.isConnected) {
    toast("Brak połączenia sieciowego");
    return false;
  }

  return true;
};
