import { translations, type Language } from "./i18n"

export function getTranslation(key: string, language: Language): string {
  const parts = key.split(".")
  let current: any = translations[language]

  for (const part of parts) {
    current = current?.[part]
  }

  if (!current) {
    return translations.en[key] || key
  }

  return current
}
