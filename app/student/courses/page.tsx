"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Users } from "lucide-react"

const mockCourses = [
  {
    id: 1,
    name: "Mathematics 101",
    instructor: "Dr. Ahmed Ali",
    description: "Introduction to calculus and advanced mathematics",
    students: 45,
    lessons: 12,
    progress: 75,
    status: "active",
  },
  {
    id: 2,
    name: "English Literature",
    instructor: "Ms. Fatima Hassan",
    description: "Classical and modern literature studies",
    students: 38,
    lessons: 10,
    progress: 60,
    status: "active",
  },
  {
    id: 3,
    name: "Physics Advanced",
    instructor: "Prof. Mohamed Ibrahim",
    description: "Advanced physics and quantum mechanics",
    students: 32,
    lessons: 14,
    progress: 45,
    status: "active",
  },
]

export default function StudentCoursesPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
        <p className="text-gray-600 mt-2">View all your enrolled courses and track progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCourses.map((course) => (
          <Link key={course.id} href={`/student/courses/${course.id}`}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      {course.name}
                    </CardTitle>
                    <CardDescription>{course.instructor}</CardDescription>
                  </div>
                  <Badge variant="outline">{course.progress}%</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{course.description}</p>
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.students} students
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.lessons} lessons
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
