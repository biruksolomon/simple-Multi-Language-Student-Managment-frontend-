"use client"

import type { Language } from "@/lib/i18n"
import { t } from "@/lib/i18n"
import { DashboardLayout } from "@/components/dashboard/layout"
import { ExamForm } from "@/components/exams/exam-form"
import { ResultEntry } from "@/components/exams/result-entry"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ExamsPage({ params }: { params: { lang: Language } }) {
  const { lang } = params

  return (
    <DashboardLayout lang={lang}>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-neutral-900">{t("nav.exams", lang)}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ExamForm lang={lang} courseId="course-1" />

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-neutral-900">Recent Results</h2>
            <ResultEntry lang={lang} examId="exam-1" studentName="Ahmed Hassan" totalMarks={100} />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("nav.exams", lang)} List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                  <div>
                    <p className="font-medium">Exam Title {item}</p>
                    <p className="text-sm text-neutral-500">2024-01-{20 + item} • 100 marks • 60 minutes</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Active</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
