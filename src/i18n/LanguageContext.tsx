import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "es" | "en";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

// Diccionario plano: clave → { es, en }
// Se carga vía import dinámico para evitar bundle gigante en este archivo.
import { dictionary } from "./dictionary";

const STORAGE_KEY = "sysde_lang";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "es";
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    return stored === "en" || stored === "es" ? stored : "es";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);
  const toggle = () => setLangState((l) => (l === "es" ? "en" : "es"));

  const t = (key: string): string => {
    const entry = dictionary[key];
    if (!entry) return key;
    return entry[lang] ?? entry.es ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useT = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useT must be used within LanguageProvider");
  return ctx;
};
