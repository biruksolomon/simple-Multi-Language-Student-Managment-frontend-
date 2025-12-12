"use client"

import type React from "react"

import { useState } from "react"
import { useI18n } from "@/components/use-i18n"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Save } from "lucide-react"
import type { Language } from "@/lib/i18n"

export default function AdminSettingsPage() {
  const { t } = useI18n()
  const { language, setLanguage } = useLanguage()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    schoolName: "Academic Management System",
    schoolEmail: "info@ams.edu",
    maxStudentsPerClass: "35",
    academicYear: "2024-2025",
  })

  const languageNames: Record<Language, string> = {
    en: "English",
    ar: "العربية",
    am: "አማርኛ",
    om: "Afan Oromo",
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: t("common.success"),
        description: "Admin settings updated successfully",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t("nav.settings")}</h1>
        <p className="text-gray-600 mt-2">Manage system settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle>System Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">School Name</label>
                <input
                  type="text"
                  value={formData.schoolName}
                  onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">School Email</label>
                <input
                  type="email"
                  value={formData.schoolEmail}
                  onChange={(e) => setFormData({ ...formData, schoolEmail: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Max Students Per Class</label>
                <input
                  type="number"
                  value={formData.maxStudentsPerClass}
                  onChange={(e) => setFormData({ ...formData, maxStudentsPerClass: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Academic Year</label>
                <input
                  type="text"
                  value={formData.academicYear}
                  onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                {loading ? "Saving..." : t("common.save")}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Language Settings */}
        <Card>
          <CardHeader>
            <CardTitle>
              {t("nav.settings")} - {t("common.import")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-4">Current Language</label>
              <div className="space-y-2">
                {(["en", "ar", "am", "om"] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`w-full p-3 rounded-lg border-2 text-left transition-colors ${
                      language === lang ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <p className="font-medium">{languageNames[lang]}</p>
                    <p className="text-xs text-gray-500">
                      {lang === "en"
                        ? "English - LTR"
                        : lang === "ar"
                          ? "Arabic - RTL"
                          : lang === "am"
                            ? "Amharic - LTR"
                            : "Afan Oromo - LTR"}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-900">Language Support Info</p>
              <p className="text-xs text-blue-700 mt-2">
                The system supports 4 languages: English, Arabic (with RTL support), Amharic, and Afan Oromo. Your
                preference will be saved locally.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
