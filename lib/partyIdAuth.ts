import * as SecureStore from "expo-secure-store";

export const partyIdCache = {
  async getPartyID(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);

      if (item) {
        console.log("Got Item");
      } else {
        console.log("No such item");
      }

      return item;
    } catch {
      return null;
    }
  },

  async savePartyId(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch {
      return null;
    }
  },
};

export const validatePartyId = (partyId: string): boolean => {
  return false;
};
