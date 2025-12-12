"use client"

import type { Language } from "@/lib/i18n"
import { t } from "@/lib/i18n"
import { DashboardLayout } from "@/components/dashboard/layout"
import { AnnouncementForm } from "@/components/announcements/announcement-form"
import { AnnouncementCard } from "@/components/announcements/announcement-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const mockAnnouncements = [
  {
    id: "1",
    title: "Midterm Exams Schedule",
    content: "Midterm exams will be held from March 15-20. Please prepare accordingly.",
    author: "Admin",
    date: "2024-03-01",
  },
  {
    id: "2",
    title: "New Video Lessons Available",
    content: "New video lessons on Advanced Mathematics are now available in the courses section.",
    author: "System",
    date: "2024-02-28",
  },
  {
    id: "3",
    title: "Payment Reminder",
    content: "Please complete your course fees payment by March 10 to continue access.",
    author: "Finance",
    date: "2024-02-25",
  },
]

export default function AnnouncementsPage({ params }: { params: { lang: Language } }) {
  const { lang } = params

  return (
    <DashboardLayout lang={lang}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-neutral-900">{t("nav.announcements", lang)}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <AnnouncementForm lang={lang} />
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="flex gap-4">
              <Input placeholder="Search announcements..." className="flex-1" />
              <Button variant="outline">Filter</Button>
            </div>

            <div className="space-y-4">
              {mockAnnouncements.map((announcement) => (
                <AnnouncementCard key={announcement.id} {...announcement} lang={lang} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
