"use client"

import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/components/use-i18n"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Bell, LogOut } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Language } from "@/lib/i18n"

export function StudentHeader() {
  const { user, logout } = useAuth()
  const { t, language } = useI18n()
  const { setLanguage } = useLanguage()
  const student = user as any

  const languageNames: Record<Language, string> = {
    en: "English",
    ar: "العربية",
    am: "አማርኛ",
    om: "Afan Oromo",
  }

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{t("nav.dashboard")}</h2>
      </div>

      <div className="flex items-center gap-4">
        <Button size="icon" variant="ghost" className="text-gray-600 hover:text-gray-900">
          <Bell className="w-5 h-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              {languageNames[language as Language]}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {(["en", "ar", "am", "om"] as Language[]).map((lang) => (
              <DropdownMenuItem key={lang} onClick={() => setLanguage(lang)}>
                {languageNames[lang]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="text-right">
            <p className="font-medium text-gray-900">{student?.name}</p>
            <p className="text-xs text-gray-500">{student?.email}</p>
          </div>
          <Button size="sm" variant="ghost" onClick={logout} className="text-red-600 hover:text-red-700">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
