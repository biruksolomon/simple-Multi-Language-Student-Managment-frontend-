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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface SummaryFormProps {
  lang: Language
  onSuccess?: () => void
}

export function SummaryForm({ lang, onSuccess }: SummaryFormProps) {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [course, setCourse] = useState("")
  const [content, setContent] = useState("")
  const { toast } = useToast()
  const isRTL = lang === "ar"

  const courses = ["Mathematics", "Physics", "Chemistry", "English", "Arabic"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !course || !content) {
      toast({
        title: t("common.error", lang),
        description: "Please fill all fields",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      toast({
        title: t("common.success", lang),
        description: "Summary created successfully",
      })
      setTitle("")
      setCourse("")
      setContent("")
      onSuccess?.()
    } catch (error) {
      toast({
        title: t("common.error", lang),
        description: "Failed to create summary",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className={isRTL ? "rtl" : "ltr"} dir={isRTL ? "rtl" : "ltr"}>
      <CardHeader>
        <CardTitle>{t("summary.title", lang)}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">{t("summary.title", lang)}</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter summary title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="course">{t("summary.course", lang)}</Label>
            <Select value={course} onValueChange={setCourse}>
              <SelectTrigger id="course">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">{t("summary.content", lang)}</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter summary content"
              rows={6}
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
