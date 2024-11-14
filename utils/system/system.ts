import * as Application from "expo-application";
import * as Device from "expo-device";
import { getLocales } from "expo-localization";
import { Platform } from "react-native";

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

export const getSysLocale = (fallback: string = "en-US"): string => {
  let locale = fallback;

  const locales = getLocales();

  if (locales.length <= 0) {
    return fallback;
  }

  locale = locales[0].languageTag || fallback;

  return locale.replace("_", "-");
};
