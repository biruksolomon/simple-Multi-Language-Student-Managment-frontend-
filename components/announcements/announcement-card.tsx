"use client"

import type { Language } from "@/lib/i18n"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Edit2, CalendarDays, User } from "lucide-react"

interface AnnouncementCardProps {
  id: string
  title: string
  content: string
  author: string
  date: string
  lang: Language
}

export function AnnouncementCard({ id, title, content, author, date, lang }: AnnouncementCardProps) {
  const isRTL = lang === "ar"

  return (
    <Card className={isRTL ? "rtl" : "ltr"} dir={isRTL ? "rtl" : "ltr"}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost">
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-neutral-700 leading-relaxed">{content}</p>
        <div className="flex items-center justify-between text-sm text-neutral-500 pt-4 border-t">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            {author}
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            {date}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
