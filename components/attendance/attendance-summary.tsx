"use client"

import { useEffect, useState } from "react"
import type { Language } from "@/lib/i18n"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Check, X, Clock } from "lucide-react"

interface AttendanceSummaryProps {
  lang: Language
  studentId: string
  courseId: string
}

interface AttendanceData {
  totalClasses: number
  presentDays: number
  absentDays: number
  excusedDays: number
  percentage: string
}

export function AttendanceSummary({ lang, studentId, courseId }: AttendanceSummaryProps) {
  const [data, setData] = useState<AttendanceData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await fetch(`/api/attendance/get-summary?studentId=${studentId}&courseId=${courseId}`)
        const result = await response.json()
        setData(result.data)
      } catch (error) {
        console.error("Failed to fetch attendance:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAttendance()
  }, [studentId, courseId])

  if (loading) {
    return <div>Loading attendance...</div>
  }

  if (!data) {
    return <div>No attendance data available</div>
  }

  const percentage = Number.parseFloat(data.percentage)
  const statusColor = percentage >= 75 ? "bg-green-500" : percentage >= 60 ? "bg-yellow-500" : "bg-red-500"

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-neutral-600">Attendance Rate</span>
          <div className="text-right">
            <p
              className={`text-2xl font-bold ${statusColor === "bg-green-500" ? "text-green-600" : statusColor === "bg-yellow-500" ? "text-yellow-600" : "text-red-600"}`}
            >
              {data.percentage}%
            </p>
          </div>
        </div>

        <Progress value={percentage} className="h-2" />

        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center p-3 bg-green-50 rounded-lg">
            <Check className="w-5 h-5 text-green-600 mb-2" />
            <p className="text-lg font-bold text-green-600">{data.presentDays}</p>
            <p className="text-xs text-neutral-600">Present</p>
          </div>

          <div className="flex flex-col items-center p-3 bg-red-50 rounded-lg">
            <X className="w-5 h-5 text-red-600 mb-2" />
            <p className="text-lg font-bold text-red-600">{data.absentDays}</p>
            <p className="text-xs text-neutral-600">Absent</p>
          </div>

          <div className="flex flex-col items-center p-3 bg-amber-50 rounded-lg">
            <Clock className="w-5 h-5 text-amber-600 mb-2" />
            <p className="text-lg font-bold text-amber-600">{data.excusedDays}</p>
            <p className="text-xs text-neutral-600">Excused</p>
          </div>
        </div>

        <div className="text-sm text-neutral-600">
          <p>Total Classes: {data.totalClasses}</p>
        </div>
      </CardContent>
    </Card>
  )
}
