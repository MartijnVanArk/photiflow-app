import * as Application from "expo-application";
import { NativeModules, Platform } from "react-native";

export const getDeviceID = async (): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    if (Platform.OS === "android") {
      resolve(Application.getAndroidId());
      return;
    } else if (Platform.OS === "ios") {
      Application.getIosIdForVendorAsync().then((id) => resolve(id || ""));
    } else {
      resolve("");
    }
  });
};

export const getSysLocale = (fallback: string = "en-US"): string => {
  let locale = fallback;

  switch (Platform.OS) {
    case "ios":
      locale =
        NativeModules.SettingsManager.settings.AppleLocale.toString() ||
        NativeModules.SettingsManager.settings.AppleLanguages[0].toString();
      break;
    case "android":
      locale = NativeModules.I18nManager.localeIdentifier.toString();
      break;
    case "windows":
    case "macos":
    case "web":
  }
  return locale.replace("_", "-");
};
