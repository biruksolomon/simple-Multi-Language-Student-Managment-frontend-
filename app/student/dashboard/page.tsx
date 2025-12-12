"use client"

import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/components/use-i18n"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { BookOpen } from "lucide-react"
import Link from "next/link"

const mockCourses = [
  { id: 1, name: "Mathematics 101", instructor: "Dr. Ahmed Ali", progress: 75, status: "Active" },
  { id: 2, name: "English Literature", instructor: "Ms. Fatima Hassan", progress: 60, status: "Active" },
  { id: 3, name: "Physics Advanced", instructor: "Prof. Mohamed Ibrahim", progress: 45, status: "Active" },
]

const mockAttendance = [
  { name: "Math", attendance: 92 },
  { name: "English", attendance: 88 },
  { name: "Physics", attendance: 85 },
  { name: "Chemistry", attendance: 90 },
  { name: "History", attendance: 78 },
]

const mockGrades = [
  { name: "Quiz 1", value: 85, fill: "#3b82f6" },
  { name: "Assignment 1", value: 78, fill: "#10b981" },
  { name: "Midterm", value: 82, fill: "#f59e0b" },
  { name: "Quiz 2", value: 88, fill: "#8b5cf6" },
]

export default function StudentDashboard() {
  const { user } = useAuth()
  const { t, isRTL } = useI18n()
  const student = user as any

  return (
    <div className={`p-8 space-y-8 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">
          {t("dashboard.welcomeBack")} {student?.name}!
        </h1>
        <p className="text-gray-600">{t("dashboard.studentWelcomeMsg")}</p>
      </div>

      {/* Status Alert */}
      <Alert className="bg-green-50 border-green-200">
        <AlertDescription className="text-green-700">{t("dashboard.accountActive")}</AlertDescription>
      </Alert>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{t("student.enrolledCourses")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">3</div>
            <p className="text-xs text-gray-500 mt-1">{t("dashboard.activeEnrollments")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{t("dashboard.overallGPA")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">3.8</div>
            <p className="text-xs text-gray-500 mt-1">{t("dashboard.excellentStanding")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{t("attendance.percentage")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">87%</div>
            <p className="text-xs text-gray-500 mt-1">{t("dashboard.aboveAverage")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{t("certificate.completion")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">2</div>
            <p className="text-xs text-gray-500 mt-1">{t("dashboard.completedCourses")}</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="courses">{t("teacher.myCourses")}</TabsTrigger>
          <TabsTrigger value="performance">{t("dashboard.performance")}</TabsTrigger>
          <TabsTrigger value="attendance">{t("nav.attendance")}</TabsTrigger>
          <TabsTrigger value="certificates">{t("nav.certificates")}</TabsTrigger>
        </TabsList>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-4">
            {mockCourses.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                        {course.name}
                      </CardTitle>
                      <CardDescription>
                        {t("course.instructor")}: {course.instructor}
                      </CardDescription>
                    </div>
                    <Link href={`/student/courses/${course.id}`}>
                      <Button size="sm" variant="outline">
                        {t("common.view")} {t("common.details")}
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{t("dashboard.progress")}</span>
                      <span className="font-semibold">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.gradeDistribution")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={mockGrades} dataKey="value" cx="50%" cy="50%" labelLine={false} label>
                    {mockGrades.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {t("attendance.summary")} {t("common.by")} {t("course.name")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockAttendance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="attendance" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Certificates Tab */}
        <TabsContent value="certificates" className="space-y-4">
          <div className="grid gap-4">
            {[
              { name: "Basic Mathematics", date: "2024-06-15" },
              { name: "Web Development Fundamentals", date: "2024-05-20" },
            ].map((cert, index) => (
              <Card key={index}>
                <CardHeader className="flex justify-between items-start">
                  <div>
                    <CardTitle>{cert.name}</CardTitle>
                    <CardDescription>
                      {t("certificate.date")}: {cert.date}
                    </CardDescription>
                  </div>
                  <Button size="sm" variant="outline">
                    {t("common.download")}
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
