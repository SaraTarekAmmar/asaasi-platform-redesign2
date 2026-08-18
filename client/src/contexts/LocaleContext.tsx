/* Editorial Operating System, one persistent locale state governs bilingual copy and RTL direction across public and operator surfaces. */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Locale = "en" | "ar";

type LocaleContextValue = {
  locale: Locale;
  isRTL: boolean;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (english: string, arabic: string) => string;
  formatNum: (n: number | string) => string;
};

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") return "en";
    const requestedLocale = new URLSearchParams(window.location.search).get("lang");
    if (requestedLocale === "ar") return "ar";
    if (requestedLocale === "en") return "en";
    return window.localStorage.getItem("asaasi-locale") === "ar" ? "ar" : "en";
  });
  const isRTL = locale === "ar";

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.classList.toggle("locale-ar", isRTL);
    document.documentElement.classList.toggle("locale-en", !isRTL);
    window.localStorage.setItem("asaasi-locale", locale);
  }, [isRTL, locale]);

  const value = useMemo(() => ({
    locale,
    isRTL,
    setLocale,
    toggleLocale: () => setLocale((current) => current === "en" ? "ar" : "en"),
    t: (english: string, arabic: string) => isRTL ? arabic : english,
    formatNum: (n: number | string) => {
      const str = String(n);
      if (!isRTL) return str;
      const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
      return str.replace(/\d/g, (d) => arabicDigits[Number(d)]);
    },
  }), [isRTL, locale]);

  return <LocaleContext.Provider value={value}><div className={`locale-root locale-${locale}`} dir={isRTL ? "rtl" : "ltr"}>{children}</div></LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used within LocaleProvider");
  return context;
}

export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { toggleLocale, t } = useLocale();
  return <button type="button" className={`sign-in language-toggle${compact ? " language-toggle-compact" : ""}`} onClick={toggleLocale} aria-label={t("Switch to Arabic", "التبديل إلى الإنجليزية")}>
    {t("العربية", "EN")}
  </button>;
}
