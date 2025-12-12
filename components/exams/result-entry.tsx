"use client"

import type React from "react"

import { useState } from "react"
import type { Language } from "@/lib/i18n"
import { t } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface ResultEntryProps {
  lang: Language
  examId: string
  studentName: string
  totalMarks: number
  onSuccess?: () => void
}

export function ResultEntry({ lang, examId, studentName, totalMarks, onSuccess }: ResultEntryProps) {
  const [marksObtained, setMarksObtained] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const isRTL = lang === "ar"

  const calculateGrade = (marks: number) => {
    const percentage = (marks / totalMarks) * 100
    if (percentage >= 80) return "A"
    if (percentage >= 60) return "B"
    if (percentage >= 40) return "C"
    return "F"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const marks = Number(marksObtained)
      if (marks > totalMarks) {
        throw new Error(`Marks cannot exceed ${totalMarks}`)
      }

      const response = await fetch("/api/exams/submit-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examId,
          studentId: "student-id",
          marksObtained: marks,
        }),
      })

      if (!response.ok) throw new Error("Failed to submit result")

      const data = await response.json()

      toast({
        title: t("common.success", lang),
        description: `Result recorded: ${data.data.grade}`,
      })

      setMarksObtained("")
      onSuccess?.()
    } catch (error) {
      toast({
        title: t("common.error", lang),
        description: error instanceof Error ? error.message : "Failed to submit result",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card dir={isRTL ? "rtl" : "ltr"}>
      <CardHeader>
        <CardTitle>Enter Results</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Student</Label>
            <Input value={studentName} disabled className="bg-neutral-100" dir={isRTL ? "rtl" : "ltr"} />
          </div>

          <div>
            <Label>Marks Obtained (out of {totalMarks})</Label>
            <Input
              type="number"
              value={marksObtained}
              onChange={(e) => setMarksObtained(e.target.value)}
              min="0"
              max={totalMarks}
              required
              placeholder="Enter marks"
              dir={isRTL ? "rtl" : "ltr"}
            />
            {marksObtained && (
              <div className="mt-2 p-2 bg-blue-50 rounded">
                <p className="text-sm">
                  Grade: <span className="font-bold">{calculateGrade(Number(marksObtained))}</span>
                </p>
                <p className="text-sm text-neutral-600">
                  Percentage: {((Number(marksObtained) / totalMarks) * 100).toFixed(2)}%
                </p>
              </div>
            )}
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
            {loading ? t("common.loading", lang) : "Submit Result"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
