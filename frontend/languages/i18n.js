import i18next from "i18next";
import english from "./english.json";
import french from "./french.json";
import pidjin from "./pidjin.json";
import { initReactI18next } from "react-i18next";
i18next.use(initReactI18next).init({
  compatibilityJSON: "v3",
  lng: "en",
  resources: {
    en: english,
    fr: french,
    cm: pidjin,
  },
  react: {
    useSuspense: false,
  },
});
export default i18next;
