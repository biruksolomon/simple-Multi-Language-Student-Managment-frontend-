"use client"

import { useEffect, useState } from "react"
import type { Language } from "@/lib/i18n"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Users } from "lucide-react"

interface Report {
  id: number
  courseId: string
  courseName: string
  reportDate: string
  topicCovered: string
  attendanceCount: number
  totalStudents: number
  issuesNotes: string
}

interface ReportsListProps {
  lang: Language
  teacherId: string
}

export function ReportsList({ lang, teacherId }: ReportsListProps) {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const isRTL = lang === "ar"

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(`/api/reports/get-teacher?teacherId=${teacherId}`)
        const data = await response.json()
        if (data.success) {
          setReports(data.data)
        }
      } catch (error) {
        console.error("Failed to fetch reports:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [teacherId])

  if (loading) {
    return <div>Loading reports...</div>
  }

  return (
    <div className="space-y-4" dir={isRTL ? "rtl" : "ltr"}>
      <h2 className="text-xl font-bold text-neutral-900">Recent Reports</h2>

      {reports.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-neutral-500">No reports submitted yet</p>
          </CardContent>
        </Card>
      ) : (
        reports.map((report) => (
          <Card key={report.id}>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-neutral-900">{report.courseName}</h3>
                    <p className="text-sm text-neutral-500">{report.reportDate}</p>
                  </div>
                  {report.issuesNotes && (
                    <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Issue
                    </Badge>
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium text-neutral-600">Topic Covered:</p>
                  <p className="text-neutral-900">{report.topicCovered}</p>
                </div>

                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">
                      {report.attendanceCount}/{report.totalStudents} present
                    </span>
                  </div>
                </div>

                {report.issuesNotes && (
                  <div className="bg-amber-50 border border-amber-200 rounded p-3">
                    <p className="text-sm text-amber-900">{report.issuesNotes}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
