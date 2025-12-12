"use client"

import type { Language } from "@/lib/i18n"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Trash2, Eye } from "lucide-react"

interface SummaryCardProps {
  id: string
  title: string
  courseName: string
  content: string
  lang: Language
}

export function SummaryCard({ id, title, courseName, content, lang }: SummaryCardProps) {
  const isRTL = lang === "ar"

  return (
    <Card className={isRTL ? "rtl" : "ltr"} dir={isRTL ? "rtl" : "ltr"}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <p className="text-sm text-neutral-500 mt-1">{courseName}</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost">
              <Eye className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <Download className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-neutral-700 leading-relaxed line-clamp-4">{content}</p>
      </CardContent>
    </Card>
  )
}
