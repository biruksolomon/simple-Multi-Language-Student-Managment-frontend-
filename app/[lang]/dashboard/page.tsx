"use client"

import type { Language } from "@/lib/i18n"
import { DashboardLayout } from "@/components/dashboard/layout"
import { DashboardOverview } from "@/components/dashboard/overview"

export default function DashboardPage({ params }: { params: { lang: Language } }) {
  const { lang } = params

  return (
    <DashboardLayout lang={lang}>
      <DashboardOverview lang={lang} />
    </DashboardLayout>
  )
}
