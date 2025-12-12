"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { CheckCircle, XCircle, Users, BarChart3, BookOpen, Award } from "lucide-react"
import Link from "next/link"

const mockPendingStudents = [
  {
    id: 1,
    name: "Ahmed Hassan",
    email: "ahmed@example.com",
    registeredDate: "2024-12-15",
    status: "pending",
  },
  {
    id: 2,
    name: "Fatima Mohamed",
    email: "fatima@example.com",
    registeredDate: "2024-12-16",
    status: "pending",
  },
  {
    id: 3,
    name: "Hassan Ali",
    email: "hassan@example.com",
    registeredDate: "2024-12-14",
    status: "pending",
  },
]

const mockCourseAssignments = [
  { course: "Mathematics 101", teacher: "Dr. Ahmed Ali", students: 45, status: "active" },
  { course: "English 101", teacher: "Ms. Fatima Hassan", students: 38, status: "active" },
  { course: "Physics 101", teacher: "Prof. Mohamed Ibrahim", students: 32, status: "pending" },
]

const userDistribution = [
  { name: "Students", value: 250, fill: "#3b82f6" },
  { name: "Teachers", value: 45, fill: "#10b981" },
  { name: "Admin", value: 5, fill: "#8b5cf6" },
]

const systemStats = [
  { month: "Jan", registrations: 45, approvals: 40, payments: 38 },
  { month: "Feb", registrations: 52, approvals: 48, payments: 45 },
  { month: "Mar", registrations: 48, approvals: 46, payments: 43 },
  { month: "Apr", registrations: 61, approvals: 58, payments: 55 },
  { month: "May", registrations: 55, approvals: 52, payments: 50 },
]

export default function AdminDashboard() {
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null)

  const handleApproveStudent = (id: number) => {
    console.log("[v0] Approving student:", id)
    // Mock approval
  }

  const handleRejectStudent = (id: number) => {
    console.log("[v0] Rejecting student:", id)
    // Mock rejection
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">System Administration</h1>
        <p className="text-gray-600 mt-2">Manage the entire education platform</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">250</div>
            <p className="text-xs text-gray-500 mt-1">+15 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Total Teachers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">45</div>
            <p className="text-xs text-gray-500 mt-1">+2 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Active Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">28</div>
            <p className="text-xs text-gray-500 mt-1">+3 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Pending Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{mockPendingStudents.length}</div>
            <p className="text-xs text-gray-500 mt-1">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Award className="w-4 h-4" />
              Certificates Issued
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">89</div>
            <p className="text-xs text-gray-500 mt-1">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="approvals" className="space-y-4">
        <TabsList>
          <TabsTrigger value="approvals">Student Approvals</TabsTrigger>
          <TabsTrigger value="courses">Course Management</TabsTrigger>
          <TabsTrigger value="users">Users Management</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Approvals Tab */}
        <TabsContent value="approvals" className="space-y-4">
          <Alert className="bg-yellow-50 border-yellow-200">
            <AlertDescription className="text-yellow-700">
              {mockPendingStudents.length} students are pending approval. Review and approve or reject their
              registrations.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            {mockPendingStudents.map((student) => (
              <Card key={student.id} className={selectedStudent === student.id ? "ring-2 ring-purple-500" : ""}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{student.name}</h3>
                      <p className="text-sm text-gray-500">{student.email}</p>
                      <p className="text-xs text-gray-400 mt-1">Registered: {student.registeredDate}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleApproveStudent(student.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                        onClick={() => handleRejectStudent(student.id)}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <Link href="/admin/courses">
              <Button className="w-full bg-green-600 hover:bg-green-700 justify-start">
                <BookOpen className="w-4 h-4 mr-2" />
                Manage Courses
              </Button>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Course Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockCourseAssignments.map((assignment, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{assignment.course}</p>
                      <p className="text-sm text-gray-500">Teacher: {assignment.teacher}</p>
                    </div>
                    <div className="text-right mr-4">
                      <p className="text-xs text-gray-600">Students</p>
                      <p className="font-semibold text-gray-900">{assignment.students}</p>
                    </div>
                    <Badge variant={assignment.status === "active" ? "default" : "secondary"}>
                      {assignment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={userDistribution} dataKey="value" cx="50%" cy="50%" labelLine={false} label>
                      {userDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* User Management Actions */}
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/admin/students">
                  <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">Manage Students</Button>
                </Link>
                <Link href="/admin/teachers">
                  <Button className="w-full justify-start bg-green-600 hover:bg-green-700">Manage Teachers</Button>
                </Link>
                <Link href="/admin/courses">
                  <Button className="w-full justify-start bg-purple-600 hover:bg-purple-700">Manage Courses</Button>
                </Link>
                <Link href="/admin/system-settings">
                  <Button className="w-full justify-start bg-orange-600 hover:bg-orange-700">System Settings</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly System Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={systemStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="registrations" fill="#3b82f6" name="Registrations" />
                  <Bar dataKey="approvals" fill="#10b981" name="Approvals" />
                  <Bar dataKey="payments" fill="#f59e0b" name="Payments" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
