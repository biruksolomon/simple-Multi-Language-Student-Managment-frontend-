import type React from "react"
import type { Metadata } from "next"
import type { Language } from "@/lib/i18n"

interface LayoutProps {
  children: React.ReactNode
  params: {
    lang: Language
  }
}

export async function generateMetadata({ params }: { params: { lang: Language } }): Promise<Metadata> {
  const titles: Record<Language, string> = {
    en: "Academic Management System",
    ar: "نظام إدارة المؤسسات التعليمية",
    am: "አካዳሚክ ማ ሰራ ስርዓት",
    om: "Sirna Bulchiinsa Akadeemikaa",
  }

  return {
    title: titles[params.lang] || "Academic Management System",
  }
}

export default function LangLayout({ children, params }: LayoutProps) {
  const isRTL = params.lang === "ar"

  return (
    <div dir={isRTL ? "rtl" : "ltr"} lang={params.lang}>
      {children}
    </div>
  )
}
