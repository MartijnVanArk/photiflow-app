import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { NativeModules, Platform } from "react-native";

import en from "@/languages/en.json";
import nl from "@/languages/nl.json";

const defaultLang = "en";
const supportedLanguages = ["en", "nl"];

const LangDetect = {
  type: "languageDetector",
  init: () => {},
  cacheUserLanguage: () => {},
  detect: () => {
    const locale =
      Platform.OS === "ios"
        ? NativeModules.SettingsManager?.settings?.AppleLocale ||
          NativeModules.SettingsManager?.settings?.AppleLanguages[0] ||
          ""
        : NativeModules.I18nManager?.localeIdentifier || "";

    const [lowerCaseLocale] = locale.split("_");

    if (supportedLanguages.includes(lowerCaseLocale)) {
      return lowerCaseLocale;
    }
    console.warn(
      `locale ${lowerCaseLocale} from ${locale} is not supported, defaulting to ${defaultLang}`,
    );
    return defaultLang;
  },
};

export const initLanguages = () => {
  const resources = {
    en: en,
    nl: nl,
  };

  i18n
    .use(initReactI18next)
    //@ts-expect-error types thing
    .use(LangDetect)
    .init({
      //      fallbackLng: "en",   /// in devmode uit laten om makkelijk te zien waar wat mist etc
      lng: undefined, // anders geen detector
      compatibilityJSON: "v3",
      resources,
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    });
};
