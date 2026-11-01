import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Locale } from "../localization.types";
import { en } from "../translations/en";
import { uk } from "../translations/uk";

const STORAGE_KEY = "tr-ce-locale";

const translations = {
  uk,
  en,
} as const;

type Translations = (typeof translations)[Locale];

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: Translations;
}

export const LocaleContext = createContext<LocaleContextValue | null>(null);

interface LocaleProviderProps {
  children: ReactNode;
}

function getInitialLocale(): Locale {
  const storedLocale = localStorage.getItem(STORAGE_KEY);

  if (storedLocale === "uk" || storedLocale === "en") {
    return storedLocale;
  }

  return "uk";
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,

      toggleLocale: () => {
        setLocale((currentLocale) =>
          currentLocale === "uk" ? "en" : "uk",
        );
      },

      t: translations[locale],
    }),
    [locale],
  );

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}