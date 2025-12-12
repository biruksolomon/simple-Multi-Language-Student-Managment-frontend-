"use client"

import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/components/use-i18n"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts"
import { BookOpen, Plus } from "lucide-react"
import Link from "next/link"

const mockCourses = [
  {
    id: 1,
    name: "Mathematics 101",
    students: 45,
    lessons: 12,
    averageGrade: 82,
    attendance: 87,
  },
  {
    id: 2,
    name: "Mathematics 102",
    students: 38,
    lessons: 10,
    averageGrade: 79,
    attendance: 84,
  },
]

const mockStudents = [
  { id: 1, name: "Ahmed Hassan", course: "Math 101", attendance: 92, grade: 85 },
  { id: 2, name: "Fatima Mohamed", course: "Math 101", attendance: 88, grade: 78 },
  { id: 3, name: "Hassan Ali", course: "Math 102", attendance: 85, grade: 82 },
]

const classPerformanceData = [
  { week: "Week 1", average: 75 },
  { week: "Week 2", average: 78 },
  { week: "Week 3", average: 80 },
  { week: "Week 4", average: 82 },
  { week: "Week 5", average: 79 },
]

export default function TeacherDashboard() {
  const { user } = useAuth()
  const { t, isRTL } = useI18n()
  const teacher = user as any

  return (
    <div className={`p-8 space-y-8 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {t("dashboard.welcomeBack")} {teacher?.name}!
          </h1>
          <p className="text-gray-600 mt-2">{t("dashboard.teacherWelcomeMsg")}</p>
        </div>
        <Link href="/teacher/courses/new">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            {t("course.createNew")}
          </Button>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{t("teacher.totalCourses")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{mockCourses.length}</div>
            <p className="text-xs text-gray-500 mt-1">{t("dashboard.activeCourses")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{t("dashboard.totalStudents")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">83</div>
            <p className="text-xs text-gray-500 mt-1">{t("dashboard.acrossAllCourses")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{t("dashboard.avgGrade")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">81</div>
            <p className="text-xs text-gray-500 mt-1">{t("dashboard.overallAverage")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{t("attendance.percentage")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">86%</div>
            <p className="text-xs text-gray-500 mt-1">{t("dashboard.averageRate")}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="courses">{t("teacher.myCourses")}</TabsTrigger>
          <TabsTrigger value="students">{t("nav.students")}</TabsTrigger>
          <TabsTrigger value="performance">{t("dashboard.performance")}</TabsTrigger>
          <TabsTrigger value="grading">{t("dashboard.grading")}</TabsTrigger>
        </TabsList>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-4">
          {mockCourses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-green-600" />
                      {course.name}
                    </CardTitle>
                  </div>
                  <Link href={`/teacher/courses/${course.id}`}>
                    <Button size="sm" variant="outline">
                      {t("common.edit")}
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">{t("nav.students")}</p>
                    <p className="text-lg font-semibold text-gray-900">{course.students}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t("dashboard.lessons")}</p>
                    <p className="text-lg font-semibold text-gray-900">{course.lessons}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t("dashboard.avgGrade")}</p>
                    <p className="text-lg font-semibold text-gray-900">{course.averageGrade}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t("attendance.percentage")}</p>
                    <p className="text-lg font-semibold text-gray-900">{course.attendance}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Students Tab */}
        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.studentList")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockStudents.map((student) => (
                  <div
                    key={student.id}
                    className={`flex items-center justify-between p-4 bg-gray-50 rounded-lg ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <div>
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.course}</p>
                    </div>
                    <div className={`flex gap-6 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <div className={isRTL ? "text-left" : "text-right"}>
                        <p className="text-sm text-gray-600">{t("nav.attendance")}</p>
                        <p className="font-semibold text-gray-900">{student.attendance}%</p>
                      </div>
                      <div className={isRTL ? "text-left" : "text-right"}>
                        <p className="text-sm text-gray-600">{t("dashboard.grade")}</p>
                        <p className="font-semibold text-gray-900">{student.grade}%</p>
                      </div>
                      <Link href={`/teacher/students/${student.id}`}>
                        <Button size="sm" variant="outline">
                          {t("common.view")}
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.classPerformanceTrend")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={classPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="average" stroke="#16a34a" name={t("dashboard.classAverage")} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Grading Tab */}
        <TabsContent value="grading" className="space-y-4">
          <Card>
            <CardHeader className="flex justify-between items-start">
              <CardTitle>{t("dashboard.pendingGrading")}</CardTitle>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                {t("dashboard.gradeAssignment")}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { id: 1, assignment: "Problem Set 1", submitted: 28, pending: 17 },
                  { id: 2, assignment: "Quiz 2", submitted: 35, pending: 10 },
                  { id: 3, assignment: "Project 1", submitted: 20, pending: 25 },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{item.assignment}</p>
                      <p className="text-sm text-gray-500">
                        {item.submitted} {t("dashboard.submitted")}, {item.pending} {t("dashboard.pending")}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      {t("dashboard.gradeNow")}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
