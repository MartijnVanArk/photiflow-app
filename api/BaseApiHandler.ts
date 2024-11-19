import { Platform } from "react-native";

import { getDeviceID } from "@/utils/system/system";

export default class BaseApiHandler {
  SECRET_ID: string | undefined = "";
  DEV_ID = "";

  constructor(testMode: boolean = false) {
    this.SECRET_ID = testMode
      ? process.env.EXPO_PUBLIC_CLIENT_TESTING
      : Platform.select({
          ios: process.env.EXPO_PUBLIC_CLIENT_IOS,
          android: process.env.EXPO_PUBLIC_CLIENT_ANDROID,
        });

    getDeviceID().then((id) => (this.DEV_ID = id));
  }
}
