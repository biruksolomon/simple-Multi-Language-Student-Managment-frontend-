"use client"

import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/get-translation"

export function useI18n() {
  const { language, direction } = useLanguage()

  return {
    t: (key: string) => getTranslation(key, language),
    language,
    direction,
    isRTL: direction === "rtl",
  }
}
