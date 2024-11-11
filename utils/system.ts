import { NativeModules, Platform } from "react-native";

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
