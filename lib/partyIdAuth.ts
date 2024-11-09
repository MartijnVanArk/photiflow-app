import * as SecureStore from "expo-secure-store";

export const partyIdCache = {
  async getItem(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);

      if (item) {
        console.log("Got Item : ", item);
      } else {
        console.log("No such item");
      }

      return item;
    } catch {
      return null;
    }
  },

  async saveItem(key: string, value: string) {
    console.log("try save : ", key, " - ", value);

    try {
      return SecureStore.setItemAsync(key, value);
    } catch {
      return null;
    }
  },
};

export const validatePartyId = (partyId: string): boolean => {
  console.log("Check Valid : ", partyId);
  return partyId === "P1234567890";
};
