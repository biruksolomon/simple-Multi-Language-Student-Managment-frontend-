"use client"

import { useState } from "react"
import { useI18n } from "@/components/use-i18n"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Download } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

const mockStudentsData: Record<string, any[]> = {
  MATH101: [
    { id: 1, name: "Ahmed Hassan", status: "present" as const },
    { id: 2, name: "Fatima Mohamed", status: "absent" as const },
    { id: 3, name: "Hassan Ali", status: "late" as const },
    { id: 4, name: "Zainab Ibrahim", status: "present" as const },
  ],
  ENG102: [
    { id: 5, name: "Ibrahim Yusuf", status: "present" as const },
    { id: 6, name: "Aisha Ahmed", status: "present" as const },
  ],
}

const mockCourses: Record<string, string> = {
  MATH101: "Mathematics 101",
  ENG102: "English 102",
}

const mockAttendanceHistory: Record<string, any[]> = {
  MATH101: [
    { date: "2024-12-10", present: 28, absent: 2, late: 5, total: 35 },
    { date: "2024-12-09", present: 30, absent: 3, late: 2, total: 35 },
    { date: "2024-12-08", present: 32, absent: 1, late: 2, total: 35 },
  ],
  ENG102: [
    { date: "2024-12-10", present: 25, absent: 3, late: 2, total: 30 },
    { date: "2024-12-09", present: 27, absent: 2, late: 1, total: 30 },
  ],
}

export default function TeacherAttendancePage() {
  const { t } = useI18n()
  const params = useParams()
  const courseId = params.id as string
  const { user } = useAuth()
  const { toast } = useToast()

  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split("T")[0])
  const [records, setRecords] = useState<Record<string, "present" | "absent" | "late">>({})
  const [loading, setLoading] = useState(false)

  const mockStudents = mockStudentsData[courseId] || []
  const courseName = mockCourses[courseId] || "Unknown Course"
  const attendanceHistory = mockAttendanceHistory[courseId] || []

  const studentRecords = mockStudents.map((s) => ({
    ...s,
    status: records[s.id.toString()] || s.status,
  }))

  const toggleStatus = (studentId: string) => {
    const currentStatus = records[studentId] || "present"
    const statuses = ["present", "absent", "late"] as const
    const currentIndex = statuses.indexOf(currentStatus)
    const nextStatus = statuses[(currentIndex + 1) % statuses.length]
    setRecords((prev) => ({ ...prev, [studentId]: nextStatus }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: t("common.success"),
        description: `${t("attendance.record")} ${t("attendance.date")}: ${attendanceDate}`,
      })
      setRecords({})
      setAttendanceDate(new Date().toISOString().split("T")[0])
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = () => {
    const stats = { present: 0, absent: 0, late: 0 }
    studentRecords.forEach((s) => {
      stats[s.status]++
    })
    return stats
  }

  const stats = calculateStats()
  const attendancePercent = studentRecords.length > 0 ? Math.round((stats.present / studentRecords.length) * 100) : 0

  return (
    <div className="p-8 space-y-8">
      <Link href="/teacher/courses">
        <Button variant="ghost">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t("common.back")}
        </Button>
      </Link>

      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {t("attendance.mark")} - {courseName}
        </h1>
        <p className="text-gray-600 mt-2">
          {t("attendance.record")} {t("course.name")}
        </p>
      </div>

      <Tabs defaultValue="mark" className="space-y-4">
        <TabsList>
          <TabsTrigger value="mark">{t("attendance.mark")}</TabsTrigger>
          <TabsTrigger value="history">{t("attendance.summary")}</TabsTrigger>
          <TabsTrigger value="report">{t("report.daily")}</TabsTrigger>
        </TabsList>

        {/* Mark Attendance Tab */}
        <TabsContent value="mark">
          <Card>
            <CardHeader>
              <CardTitle>
                {t("attendance.mark")} {attendanceDate}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">{t("attendance.date")}</label>
                <input
                  type="date"
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">{t("attendance.present")}</p>
                  <p className="text-2xl font-bold text-green-600">{stats.present}</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-gray-600">{t("attendance.absent")}</p>
                  <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg">
                  <p className="text-sm text-gray-600">{t("attendance.late")}</p>
                  <p className="text-2xl font-bold text-amber-600">{stats.late}</p>
                </div>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {studentRecords.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 cursor-pointer transition-colors"
                    onClick={() => toggleStatus(student.id.toString())}
                  >
                    <span className="font-medium text-neutral-900">{student.name}</span>
                    <Badge
                      variant={
                        student.status === "present"
                          ? "default"
                          : student.status === "absent"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {t(`attendance.${student.status}`)}
                    </Badge>
                  </div>
                ))}
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleSubmit} disabled={loading}>
                {loading ? t("common.loading") : t("common.save")}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>{t("attendance.summary")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {attendanceHistory.map((record) => (
                  <div key={record.date} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{record.date}</p>
                      <p className="text-sm text-gray-500">
                        {t("common.details")}: {record.total} {t("student.registerNew")}
                      </p>
                    </div>
                    <div className="flex gap-6">
                      <div className="text-center">
                        <p className="text-xs text-gray-600">{t("attendance.present")}</p>
                        <p className="text-lg font-semibold text-green-600">{record.present}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-600">{t("attendance.absent")}</p>
                        <p className="text-lg font-semibold text-red-600">{record.absent}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-600">{t("attendance.late")}</p>
                        <p className="text-lg font-semibold text-amber-600">{record.late}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Report Tab */}
        <TabsContent value="report">
          <Card>
            <CardHeader className="flex justify-between items-start">
              <CardTitle>{t("attendance.summary")}</CardTitle>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                {t("common.export")}
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">{t("report.daily")}</p>
                  <p className="text-2xl font-bold text-blue-600">{attendanceHistory.length}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">{t("attendance.percentage")}</p>
                  <p className="text-2xl font-bold text-green-600">{attendancePercent}%</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-gray-600">High Absentees</p>
                  <p className="text-2xl font-bold text-yellow-600">3</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600">{t("student.registerNew")}</p>
                  <p className="text-2xl font-bold text-purple-600">{mockStudents.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
