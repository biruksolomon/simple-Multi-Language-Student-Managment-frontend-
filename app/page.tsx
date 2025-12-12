"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function RootPage() {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "student") {
        router.push("/student/dashboard")
      } else if (user.role === "teacher") {
        router.push("/teacher/dashboard")
      } else if (user.role === "admin") {
        router.push("/admin/dashboard")
      }
    }
  }, [isAuthenticated, user, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Academic Management System</h1>
          <p className="text-xl text-gray-600">Empowering Education with Technology</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Student Card */}
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Student</CardTitle>
              <CardDescription>Register and access your courses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">Register, track attendance, view grades, and access video lessons</p>
              <Link href="/auth/student-login" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Student Login</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Teacher Card */}
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Teacher</CardTitle>
              <CardDescription>Manage your courses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Create courses, manage students, grade assignments, and track attendance
              </p>
              <Link href="/auth/teacher-login" className="block">
                <Button className="w-full bg-green-600 hover:bg-green-700">Teacher Login</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Admin Card */}
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Admin</CardTitle>
              <CardDescription>System administration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Approve students, generate certificates, manage users and system settings
              </p>
              <Link href="/auth/admin-login" className="block">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Admin Login</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-blue-600 font-semibold hover:underline">
              Register as a Student
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
