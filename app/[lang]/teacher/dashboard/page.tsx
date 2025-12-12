"use client"

import type { Language } from "@/lib/i18n"
import { DashboardLayout } from "@/components/dashboard/layout"
import { DailyReportForm } from "@/components/teacher/daily-report-form"
import { ReportsList } from "@/components/teacher/reports-list"
import { TeacherStats } from "@/components/teacher/teacher-stats"
import { useState } from "react"

const mockCourses = [
  { id: "course-1", name: "Advanced Python Programming" },
  { id: "course-2", name: "Data Science Fundamentals" },
  { id: "course-3", name: "Web Development with React" },
]

export default function TeacherDashboardPage({ params }: { params: { lang: Language } }) {
  const { lang } = params
  const teacherId = "teacher-001"
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  return (
    <DashboardLayout lang={lang}>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-neutral-900">Teacher Dashboard</h1>

        <TeacherStats lang={lang} teacherId={teacherId} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <DailyReportForm
              lang={lang}
              teacherId={teacherId}
              courses={mockCourses}
              onSuccess={() => setRefreshTrigger((prev) => prev + 1)}
            />
          </div>

          <div className="lg:col-span-2">
            <ReportsList lang={lang} teacherId={teacherId} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
