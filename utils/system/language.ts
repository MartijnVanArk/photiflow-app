import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/languages/en.json";
import nl from "@/languages/nl.json";

const resources = {
  en: en,
  nl: nl,
};

const supportedLanguages = Object.keys(resources);
const fallBackLang = "en";

const LangDetect = {
  type: "languageDetector",
  init: () => {},
  cacheUserLanguage: () => {},
  detect: () => {
    const locales = getLocales();

    if (locales.length <= 0) {
      return fallBackLang;
    }

    console.log(locales);

    const lowerCaseLocale = locales[0].languageCode?.toLowerCase() || "";

    if (supportedLanguages.includes(lowerCaseLocale)) {
      return lowerCaseLocale;
    }

    console.warn(
      `locale ${lowerCaseLocale} from ${lowerCaseLocale} is not supported, defaulting to ${fallBackLang}`,
    );
    return fallBackLang;
  },
};

export const initLanguages = () => {
  i18n
    .use(initReactI18next)
    //@ts-expect-error types thing
    .use(LangDetect)
    .init({
      //fallbackLng: fallBackLang, /// in devmode uit laten om makkelijk te zien waar wat mist etc
      lng: undefined, // anders geen detector
      compatibilityJSON: "v3",
      resources,
      interpolation: {
        escapeValue: false, // dubbelop met react eigen xss protectie
      },
    });
};
