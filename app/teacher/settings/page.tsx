"use client"

import type React from "react"

import { useState } from "react"
import { useI18n } from "@/components/use-i18n"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Save } from "lucide-react"

export default function TeacherSettingsPage() {
  const { t } = useI18n()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    notifications: true,
    reportReminders: true,
    emailUpdates: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: t("common.success"),
        description: "Settings updated successfully",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t("nav.settings")}</h1>
        <p className="text-gray-600 mt-2">Manage your account preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("nav.settings")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.notifications}
                  onChange={(e) => setFormData({ ...formData, notifications: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span>{t("nav.announcements")}</span>
              </label>
            </div>

            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.reportReminders}
                  onChange={(e) => setFormData({ ...formData, reportReminders: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span>{t("report.submit")} Reminders</span>
              </label>
            </div>

            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.emailUpdates}
                  onChange={(e) => setFormData({ ...formData, emailUpdates: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span>Email updates</span>
              </label>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              <Save className="w-4 h-4 mr-2" />
              {loading ? "Saving..." : t("common.save")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
