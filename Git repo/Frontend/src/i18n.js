import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(HttpApi) // Load translations from files
  .use(LanguageDetector) // Detects user's language
  .use(initReactI18next) // Enables hooks for React
  .init({
    supportedLngs: ["ar", "fr", "en"], // Add your supported languages
    fallbackLng: "en", // Default language
    detection: {
      order: ["cookie", "localStorage", "navigator", "htmlTag", "path", "subdomain"],
      caches: ["cookie", "localStorage"],
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // Translation files path
    },
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
  });

export default i18n;
