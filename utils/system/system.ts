import * as Application from "expo-application";
import * as Device from "expo-device";
import { NativeModules, Platform } from "react-native";

import { DeviceInfoTagsDefaults } from "@/types/systypes";

export const getDeviceInfoTagsDefault = (): DeviceInfoTagsDefaults => {
  return {
    os: Platform.OS,
    type: niceDeviceType(),
    model: Device.modelName || "unknown",
    name: Device.deviceName || "unknown",
  };
};

export const niceDeviceType = () => {
  return Device.deviceType ? Device.DeviceType[Device.deviceType] : "unknown";
};

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

export function getSystemLocale(): string {
  switch (Platform.OS) {
    case "ios":
      return NativeModules.SettingsManager.settings.AppleLocale.toString();
    case "android":
      return NativeModules.I18nManager.localeIdentifier.toString();
    case "windows":
    case "macos":
    case "web":
  }
  return "en-US";
}

export const getSysLocale = (fallback: string = "en-US"): string => {
  let locale = fallback;

  try {
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
  } catch (error) {
    locale = fallback;
  }

  return locale.replace("_", "-");
};
