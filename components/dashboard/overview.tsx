"use client"

import type { Language } from "@/lib/i18n"
import { t } from "@/lib/i18n"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, Clipboard, DollarSign } from "lucide-react"

interface DashboardOverviewProps {
  lang: Language
}

export function DashboardOverview({ lang }: DashboardOverviewProps) {
  const stats = [
    {
      title: t("nav.students", lang),
      value: "245",
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: t("nav.courses", lang),
      value: "12",
      icon: BookOpen,
      color: "bg-green-100 text-green-600",
    },
    {
      title: t("nav.exams", lang),
      value: "18",
      icon: Clipboard,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: t("nav.payments", lang),
      value: "$45,230",
      icon: DollarSign,
      color: "bg-purple-100 text-purple-600",
    },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">Welcome to Academic Management System</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-neutral-500 text-sm">{stat.title}</p>
                    <p className="text-3xl font-bold text-neutral-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Students</CardTitle>
            <CardDescription>Latest enrolled students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between py-2 border-b">
                  <div>
                    <p className="font-medium">Student Name {item}</p>
                    <p className="text-sm text-neutral-500">student{item}@example.com</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Exams</CardTitle>
            <CardDescription>Next scheduled examinations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between py-2 border-b">
                  <div>
                    <p className="font-medium">Exam Title {item}</p>
                    <p className="text-sm text-neutral-500">2024-01-{20 + item}</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{45 + item} min</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
