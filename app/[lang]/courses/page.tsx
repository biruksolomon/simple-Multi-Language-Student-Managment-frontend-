"use client"

import type { Language } from "@/lib/i18n"
import { t } from "@/lib/i18n"
import { DashboardLayout } from "@/components/dashboard/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Clock, Users, BookOpen } from "lucide-react"

const mockCourses = [
  {
    id: "1",
    name: "Advanced Mathematics",
    instructor: "Dr. Ahmed Hassan",
    duration: "12 weeks",
    enrolled: 45,
    description: "Master advanced mathematical concepts including calculus and linear algebra",
  },
  {
    id: "2",
    name: "Physics Fundamentals",
    instructor: "Prof. Fatima Ali",
    duration: "10 weeks",
    enrolled: 38,
    description: "Comprehensive physics course covering mechanics, thermodynamics, and waves",
  },
  {
    id: "3",
    name: "English Communication",
    instructor: "Mr. Mohamed Ibrahim",
    duration: "8 weeks",
    enrolled: 52,
    description: "Improve your English speaking, reading, and writing skills",
  },
]

export default function CoursesPage({ params }: { params: { lang: Language } }) {
  const { lang } = params
  const isRTL = lang === "ar"

  return (
    <DashboardLayout lang={lang}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-neutral-900">{t("nav.courses", lang)}</h1>
          <Button className="bg-blue-600 hover:bg-blue-700">{t("common.save", lang)} New Course</Button>
        </div>

        <div className="flex gap-4">
          <Input placeholder="Search courses..." className="flex-1" />
          <Button variant="outline">Filter</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockCourses.map((course) => (
            <Card key={course.id} className={isRTL ? "rtl" : "ltr"} dir={isRTL ? "rtl" : "ltr"}>
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">{course.name}</CardTitle>
                <p className="text-sm text-neutral-600 mt-1">{course.instructor}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-neutral-700">{course.description}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-neutral-600">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-2 text-neutral-600">
                    <Users className="w-4 h-4" />
                    {course.enrolled} students
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <BookOpen className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
