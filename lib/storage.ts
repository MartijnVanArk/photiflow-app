import * as SecureStore from "expo-secure-store";

export const EVENT_ID_KEY = "event-id";
export const GUEST_INFO_KEY = "guest-info";

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

export const validateEventId = (EventId: string): boolean => {
  console.log("Check Valid : ", EventId);
  return EventId === "P1234567890";
};
