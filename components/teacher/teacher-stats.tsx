"use client"

import { useEffect, useState } from "react"
import type { Language } from "@/lib/i18n"
import { Card, CardContent } from "@/components/ui/card"
import { Users, BookOpen, FileText, AlertCircle } from "lucide-react"

interface TeacherStats {
  totalReports: number
  totalStudents: number
  averageAttendance: number
  coursesTeaching: number
  issuesReported: number
  thisWeekReports: number
}

interface TeacherStatsProps {
  lang: Language
  teacherId: string
}

export function TeacherStats({ lang, teacherId }: TeacherStatsProps) {
  const [stats, setStats] = useState<TeacherStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`/api/reports/get-summary?teacherId=${teacherId}`)
        const data = await response.json()
        if (data.success) {
          setStats(data.data)
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [teacherId])

  if (loading) {
    return <div>Loading statistics...</div>
  }

  if (!stats) {
    return null
  }

  const statCards = [
    {
      label: "Total Reports",
      value: stats.totalReports,
      icon: FileText,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Students",
      value: stats.totalStudents,
      icon: Users,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Avg Attendance",
      value: `${stats.averageAttendance}%`,
      icon: Users,
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "Courses",
      value: stats.coursesTeaching,
      icon: BookOpen,
      color: "bg-orange-100 text-orange-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-500 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-neutral-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}

      {stats.issuesReported > 0 && (
        <div className="col-span-full bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="font-medium text-red-900">
              {stats.issuesReported} issue{stats.issuesReported !== 1 ? "s" : ""} reported this period
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
