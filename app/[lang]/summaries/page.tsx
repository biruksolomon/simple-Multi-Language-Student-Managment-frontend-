"use client"

import type { Language } from "@/lib/i18n"
import { t } from "@/lib/i18n"
import { DashboardLayout } from "@/components/dashboard/layout"
import { SummaryForm } from "@/components/summaries/summary-form"
import { SummaryCard } from "@/components/summaries/summary-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

const mockSummaries = [
  {
    id: "1",
    title: "Algebra Fundamentals",
    courseName: "Mathematics",
    content: "Key concepts of algebra including equations, polynomials, and factoring techniques...",
  },
  {
    id: "2",
    title: "Photosynthesis Process",
    courseName: "Biology",
    content: "Understanding how plants convert light energy into chemical energy through photosynthesis...",
  },
  {
    id: "3",
    title: "World War II Overview",
    courseName: "History",
    content: "Comprehensive summary of WWII causes, major events, and historical significance...",
  },
]

export default function SummariesPage({ params }: { params: { lang: Language } }) {
  const { lang } = params
  const [selectedCourse, setSelectedCourse] = useState("")
  const courses = ["All Courses", "Mathematics", "Physics", "Chemistry", "English", "Arabic"]

  return (
    <DashboardLayout lang={lang}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-neutral-900">{t("nav.summaries", lang)}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <SummaryForm lang={lang} />
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="flex gap-4 flex-wrap">
              <Input placeholder="Search summaries..." className="flex-1 min-w-48" />
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline">Search</Button>
            </div>

            <div className="space-y-4">
              {mockSummaries.map((summary) => (
                <SummaryCard key={summary.id} {...summary} lang={lang} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
