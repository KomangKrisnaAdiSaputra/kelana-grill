import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import {
  ensureUrlHasLanguage,
  getInitialLanguage,
  getLanguageFromUrl,
  getLocalizedHrefByLanguage,
  replaceUrlLanguage,
  saveLanguage,
} from "@/helpers/language";
import { landingTexts } from "@/lang/landing";
import type { LanguageMode } from "@/lang/landing";

type LanguageText = typeof landingTexts[LanguageMode];

type LanguageContextValue = {
  language: LanguageMode;
  text: LanguageText;
  setLanguage: (language: LanguageMode) => void;
  toggleLanguage: () => void;
  getLocalizedHref: (href: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

type Props = {
  children: ReactNode;
};

export function LanguageProvider({ children }: Props) {
  const [language, setLanguageState] =
    useState<LanguageMode>(getInitialLanguage);

  const setLanguage = useCallback((nextLanguage: LanguageMode) => {
    replaceUrlLanguage(nextLanguage);
    saveLanguage(nextLanguage);
    setLanguageState(nextLanguage);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((currentLanguage) => {
      const nextLanguage = currentLanguage === "id" ? "en" : "id";

      replaceUrlLanguage(nextLanguage);
      saveLanguage(nextLanguage);

      return nextLanguage;
    });
  }, []);

  const getLocalizedHref = useCallback(
    (href: string) => {
      return getLocalizedHrefByLanguage(href, language);
    },
    [language]
  );

  useEffect(() => {
    ensureUrlHasLanguage(language);
  }, [language]);

  useEffect(() => {
    saveLanguage(language);
  }, [language]);

  useEffect(() => {
    const handlePopState = () => {
      const languageFromUrl = getLanguageFromUrl();

      if (languageFromUrl) {
        saveLanguage(languageFromUrl);
        setLanguageState(languageFromUrl);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const value = useMemo<LanguageContextValue>(() => {
    return {
      language,
      text: landingTexts[language],
      setLanguage,
      toggleLanguage,
      getLocalizedHref,
    };
  }, [language, setLanguage, toggleLanguage, getLocalizedHref]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}