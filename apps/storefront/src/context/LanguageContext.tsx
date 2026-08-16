'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Locale = 'en' | 'bn';

interface LanguageContextType {
  locale: Locale;
  isBn: boolean;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    const saved = localStorage.getItem('kenakata_locale') as Locale;
    if (saved === 'en' || saved === 'bn') {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('kenakata_locale', newLocale);
  };

  const toggleLocale = () => {
    const next = locale === 'en' ? 'bn' : 'en';
    setLocale(next);
  };

  return (
    <LanguageContext.Provider
      value={{
        locale,
        isBn: locale === 'bn',
        setLocale,
        toggleLocale,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      locale: 'en' as Locale,
      isBn: false,
      setLocale: () => {},
      toggleLocale: () => {},
    };
  }
  return context;
}
