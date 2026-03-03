import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";
import { translations } from "../i18n/translations";
import type { Language, TranslationKeys } from "../i18n/translations";

interface LanguageContextType {
  lang: Language;
  t: TranslationKeys;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem("lang");
    return saved === "id" || saved === "en" ? saved : "en";
  });

  const toggleLanguage = () => {
    setLang((prev) => {
      const next = prev === "en" ? "id" : "en";
      localStorage.setItem("lang", next);
      return next;
    });
  };

  const setLanguage = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  return (
    <LanguageContext.Provider
      value={{ lang, t: translations[lang], toggleLanguage, setLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
