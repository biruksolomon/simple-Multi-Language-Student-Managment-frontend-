"use client"

import type React from "react"

import { useState } from "react"
import type { Language } from "@/lib/i18n"
import { t } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface ExamFormProps {
  lang: Language
  courseId: string
  onSuccess?: () => void
}

export function ExamForm({ lang, courseId, onSuccess }: ExamFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    examDate: "",
    durationMinutes: 60,
    totalMarks: 100,
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const isRTL = lang === "ar"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes("Minutes") || name.includes("Marks") ? Number(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/exams/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          ...formData,
        }),
      })

      if (!response.ok) throw new Error("Failed to create exam")

      toast({
        title: t("common.success", lang),
        description: "Exam created successfully",
      })

      setFormData({
        title: "",
        description: "",
        examDate: "",
        durationMinutes: 60,
        totalMarks: 100,
      })

      onSuccess?.()
    } catch (error) {
      toast({
        title: t("common.error", lang),
        description: error instanceof Error ? error.message : "Failed to create exam",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card dir={isRTL ? "rtl" : "ltr"}>
      <CardHeader>
        <CardTitle>{t("exam.title", lang)}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">{t("exam.title", lang)}</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              dir={isRTL ? "rtl" : "ltr"}
            />
          </div>

          <div>
            <Label htmlFor="description">{t("course.description", lang)}</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              dir={isRTL ? "rtl" : "ltr"}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="examDate">{t("exam.date", lang)}</Label>
              <Input
                id="examDate"
                name="examDate"
                type="datetime-local"
                value={formData.examDate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="durationMinutes">{t("exam.duration", lang)}</Label>
              <Input
                id="durationMinutes"
                name="durationMinutes"
                type="number"
                value={formData.durationMinutes}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="totalMarks">{t("exam.totalMarks", lang)}</Label>
            <Input
              id="totalMarks"
              name="totalMarks"
              type="number"
              value={formData.totalMarks}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
            {loading ? t("common.loading", lang) : t("common.save", lang)}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
