"use client"

import type React from "react"

import { useState } from "react"
import type { Language } from "@/lib/i18n"
import { t } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Check, X, Clock } from "lucide-react"

interface AttendanceManagerProps {
  lang: Language
  courseId: string
  students: Array<{ id: string; name: string }>
}

interface AttendanceRecord {
  studentId: string
  status: "present" | "absent" | "excused"
}

export function AttendanceManager({ lang, courseId, students }: AttendanceManagerProps) {
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split("T")[0])
  const [records, setRecords] = useState<Record<string, "present" | "absent" | "excused">>({})
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const isRTL = lang === "ar"

  const toggleStatus = (studentId: string) => {
    const currentStatus = records[studentId] || "present"
    const statuses = ["present", "absent", "excused"] as const
    const currentIndex = statuses.indexOf(currentStatus)
    const nextStatus = statuses[(currentIndex + 1) % statuses.length]
    setRecords((prev) => ({ ...prev, [studentId]: nextStatus }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      for (const [studentId, status] of Object.entries(records)) {
        await fetch("/api/attendance/record", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            studentId,
            courseId,
            attendanceDate,
            status,
          }),
        })
      }

      toast({
        title: t("common.success", lang),
        description: "Attendance recorded successfully",
      })

      setRecords({})
    } catch (error) {
      toast({
        title: t("common.error", lang),
        description: "Failed to record attendance",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: "present" | "absent" | "excused") => {
    switch (status) {
      case "present":
        return <Check className="w-4 h-4 text-green-600" />
      case "absent":
        return <X className="w-4 h-4 text-red-600" />
      case "excused":
        return <Clock className="w-4 h-4 text-amber-600" />
    }
  }

  const getStatusBadge = (status: "present" | "absent" | "excused") => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-100 text-green-800">Present</Badge>
      case "absent":
        return <Badge className="bg-red-100 text-red-800">Absent</Badge>
      case "excused":
        return <Badge className="bg-amber-100 text-amber-800">Excused</Badge>
    }
  }

  return (
    <Card dir={isRTL ? "rtl" : "ltr"}>
      <CardHeader>
        <CardTitle>Mark Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
              required
            />
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {students.map((student) => {
              const status = records[student.id] || "present"
              return (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
                >
                  <span className="font-medium text-neutral-900">{student.name}</span>
                  <button type="button" onClick={() => toggleStatus(student.id)} className="flex items-center gap-2">
                    {getStatusIcon(status)}
                    {getStatusBadge(status)}
                  </button>
                </div>
              )
            })}
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
            {loading ? t("common.loading", lang) : "Save Attendance"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
