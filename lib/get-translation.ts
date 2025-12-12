import { translations, type Language } from "./i18n"

export function getTranslation(key: string, language: Language): string {
  // Direct key lookup - translations are flat, not nested
  const translation = translations[language]?.[key]

  if (translation) {
    return translation
  }

  // Fallback to English if translation not found
  const fallback = translations.en?.[key]

  if (fallback) {
    return fallback
  }

  // Return the key itself if no translation found
  return key
}
