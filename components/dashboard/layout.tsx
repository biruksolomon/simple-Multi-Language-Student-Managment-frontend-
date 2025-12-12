"use client"

import type React from "react"
import type { Language } from "@/lib/i18n"
import { t } from "@/lib/i18n"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Button } from "@/components/ui/button"
import { LogOut, Menu, Bell } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

interface DashboardLayoutProps {
  lang: Language
  children: React.ReactNode
}

export function DashboardLayout({ lang, children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const isRTL = lang === "ar"

  const navigationItems = [
    { label: t("nav.dashboard", lang), href: `/${lang}/dashboard` },
    { label: t("nav.students", lang), href: `/${lang}/students` },
    { label: t("nav.courses", lang), href: `/${lang}/courses` },
    { label: t("nav.exams", lang), href: `/${lang}/exams` },
    { label: t("nav.teachers", lang), href: `/${lang}/teachers` },
    { label: t("nav.announcements", lang), href: `/${lang}/announcements` },
    { label: t("nav.summaries", lang), href: `/${lang}/summaries` },
    { label: t("nav.payments", lang), href: `/${lang}/payments` },
  ]

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = `/${lang}`
  }

  return (
    <div className={`flex h-screen bg-neutral-50 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white border-r border-neutral-200 transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
          {sidebarOpen && (
            <h1 className="text-xl font-bold text-blue-600">
              {lang === "ar" ? "أكاديميتي" : lang === "am" ? "አካዳሚ" : lang === "om" ? "Akadeemii" : "Academy"}
            </h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-3 rounded-lg text-neutral-700 hover:bg-blue-50 hover:text-blue-600 transition-colors truncate text-sm"
              title={sidebarOpen ? "" : item.label}
            >
              {sidebarOpen ? item.label : item.label.charAt(0)}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-neutral-200 space-y-2">
          <LanguageSwitcher />
          <Button onClick={handleLogout} variant="outline" size="sm" className="w-full bg-transparent">
            <LogOut className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
            {sidebarOpen && t("nav.logout", lang)}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="sticky top-0 bg-white border-b border-neutral-200 px-8 py-4 flex items-center justify-between">
          <div className="text-sm text-neutral-600">Welcome back!</div>
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
        </div>
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
