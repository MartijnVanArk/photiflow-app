import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/languages/en.json";
import nl from "@/languages/nl.json";

export const initLanguages = () => {
  const resources = {
    en: en,
    nl: nl,
  };

  i18n.use(initReactI18next).init({
    fallbackLng: "en",
    compatibilityJSON: "v3",
    resources,
  });
};
