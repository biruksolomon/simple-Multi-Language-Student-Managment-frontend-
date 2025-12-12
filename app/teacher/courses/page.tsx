"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, BookOpen } from "lucide-react"

const mockCourses = [
  {
    id: 1,
    name: "Mathematics 101",
    code: "MATH101",
    students: 45,
    lessons: 12,
    status: "active",
  },
  {
    id: 2,
    name: "Mathematics 102",
    code: "MATH102",
    students: 38,
    lessons: 10,
    status: "active",
  },
]

export default function TeacherCoursesPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600 mt-2">Manage all your courses</p>
        </div>
        <Link href="/teacher/courses/new">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            New Course
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-green-600" />
                {course.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Code</p>
                  <p className="font-semibold text-gray-900">{course.code}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Students</p>
                  <p className="font-semibold text-gray-900">{course.students}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Lessons</p>
                  <p className="font-semibold text-gray-900">{course.lessons}</p>
                </div>
              </div>
              <Link href={`/teacher/courses/${course.id}`}>
                <Button className="w-full bg-green-600 hover:bg-green-700">Manage Course</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
