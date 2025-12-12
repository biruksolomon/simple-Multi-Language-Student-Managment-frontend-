"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import type { Language } from "@/lib/i18n"
import { languages } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentLang = (pathname.split("/")[1] as Language) || "en"

  const handleLanguageChange = (lang: Language) => {
    const segments = pathname.split("/").filter(Boolean)
    if (["en", "ar", "am", "om"].includes(segments[0])) {
      segments[0] = lang
    } else {
      segments.unshift(lang)
    }
    const newPathname = "/" + segments.join("/")
    const newUrl = `${newPathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`
    router.push(newUrl)
  }

  const languageNames: Record<Language, string> = {
    en: "English",
    ar: "العربية",
    am: "አማርኛ",
    om: "Afan Oromo",
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
          {languageNames[currentLang]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className={currentLang === lang ? "bg-blue-50" : ""}
          >
            {languageNames[lang]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
