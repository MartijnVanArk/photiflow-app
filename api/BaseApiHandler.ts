import { Platform } from "react-native";

import { basicJWTChecks } from "@/utils/jwtutils";
import { AppMainStorage } from "@/utils/system/storage";
import { getDeviceID } from "@/utils/system/system";

export default class BaseApiHandler {
  SECRET_ID: string | undefined = "";
  DEV_ID = "";
  BEARER_TOKEN = "";

  JWT_TOKEN_KEY = "jwt-token";
  constructor(tokenKey: string, testMode: boolean = false) {
    this.SECRET_ID = testMode
      ? process.env.EXPO_PUBLIC_CLIENT_TESTING
      : Platform.select({
          ios: process.env.EXPO_PUBLIC_CLIENT_IOS,
          android: process.env.EXPO_PUBLIC_CLIENT_ANDROID,
        });

    this.JWT_TOKEN_KEY = tokenKey;

    getDeviceID().then((id) => (this.DEV_ID = id));

    AppMainStorage.getItem(this.JWT_TOKEN_KEY).then((token) => {
      if (token && basicJWTChecks(token)) {
        this.BEARER_TOKEN = token;
      }
    });
  }

  setBearerToken(token: string) {
    this.BEARER_TOKEN = token;
    AppMainStorage.saveItem(this.JWT_TOKEN_KEY, token);
  }
}
