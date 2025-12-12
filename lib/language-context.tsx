"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Language } from "./i18n"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  direction: "ltr" | "rtl"
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedLang = localStorage.getItem("preferred-language") as Language | null
    if (savedLang && ["en", "ar", "am", "om"].includes(savedLang)) {
      setLanguageState(savedLang)
    }
    setMounted(true)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("preferred-language", lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        direction: language === "ar" ? "rtl" : "ltr",
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
