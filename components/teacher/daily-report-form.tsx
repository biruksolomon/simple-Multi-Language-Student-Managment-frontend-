"use client"

import type React from "react"

import { useState } from "react"
import type { Language } from "@/lib/i18n"
import { t } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface DailyReportFormProps {
  lang: Language
  teacherId: string
  courses: Array<{ id: string; name: string }>
  onSuccess?: () => void
}

export function DailyReportForm({ lang, teacherId, courses, onSuccess }: DailyReportFormProps) {
  const [formData, setFormData] = useState({
    courseId: courses[0]?.id || "",
    reportDate: new Date().toISOString().split("T")[0],
    topicCovered: "",
    attendanceCount: "",
    issuesNotes: "",
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const isRTL = lang === "ar"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/reports/submit-daily", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teacherId,
          ...formData,
          attendanceCount: Number(formData.attendanceCount),
        }),
      })

      if (!response.ok) throw new Error("Failed to submit report")

      toast({
        title: t("common.success", lang),
        description: "Daily report submitted successfully",
      })

      setFormData({
        courseId: courses[0]?.id || "",
        reportDate: new Date().toISOString().split("T")[0],
        topicCovered: "",
        attendanceCount: "",
        issuesNotes: "",
      })

      onSuccess?.()
    } catch (error) {
      toast({
        title: t("common.error", lang),
        description: error instanceof Error ? error.message : "Failed to submit report",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card dir={isRTL ? "rtl" : "ltr"}>
      <CardHeader>
        <CardTitle>Daily Class Report</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="courseId">Select Course</Label>
            <select
              id="courseId"
              name="courseId"
              value={formData.courseId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
              required
            >
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="reportDate">Report Date</Label>
            <Input
              id="reportDate"
              name="reportDate"
              type="date"
              value={formData.reportDate}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="topicCovered">Topic Covered</Label>
            <Textarea
              id="topicCovered"
              name="topicCovered"
              value={formData.topicCovered}
              onChange={handleChange}
              placeholder="Describe the topic covered in today's class"
              rows={3}
              required
              dir={isRTL ? "rtl" : "ltr"}
            />
          </div>

          <div>
            <Label htmlFor="attendanceCount">Attendance Count</Label>
            <Input
              id="attendanceCount"
              name="attendanceCount"
              type="number"
              value={formData.attendanceCount}
              onChange={handleChange}
              placeholder="Number of students present"
              min="0"
              required
            />
          </div>

          <div>
            <Label htmlFor="issuesNotes">Issues & Notes (Optional)</Label>
            <Textarea
              id="issuesNotes"
              name="issuesNotes"
              value={formData.issuesNotes}
              onChange={handleChange}
              placeholder="Any issues or important notes to report"
              rows={3}
              dir={isRTL ? "rtl" : "ltr"}
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
            {loading ? t("common.loading", lang) : "Submit Report"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
