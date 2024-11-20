import * as SecureStore from "expo-secure-store";

export const GUEST_INFO_KEY = "guest-info";
export const AUTH_TOKEN_KEY = "auth-token";

export const AppMainStorage = {
  async getItem(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);

      if (item) {
        console.log("Got Item : ", item);
      } else {
        console.log("No such item - ", key);
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
