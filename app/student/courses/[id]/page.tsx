"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Play, FileText, CheckCircle } from "lucide-react"
import Link from "next/link"

const mockCourse = {
  id: 1,
  name: "Mathematics 101",
  instructor: "Dr. Ahmed Ali",
  description: "Introduction to calculus and advanced mathematics",
  enrolledStudents: 45,
  progress: 75,
  lessons: [
    {
      id: 1,
      title: "Lesson 1: Introduction to Calculus",
      duration: "45 min",
      watched: true,
      videoUrl: "https://example.com/video1",
    },
    {
      id: 2,
      title: "Lesson 2: Derivatives",
      duration: "52 min",
      watched: true,
      videoUrl: "https://example.com/video2",
    },
    {
      id: 3,
      title: "Lesson 3: Integration",
      duration: "48 min",
      watched: false,
      videoUrl: "https://example.com/video3",
    },
    {
      id: 4,
      title: "Lesson 4: Applications",
      duration: "55 min",
      watched: false,
      videoUrl: "https://example.com/video4",
    },
  ],
  assignments: [
    { id: 1, title: "Problem Set 1", dueDate: "2024-12-20", submitted: true, score: 95 },
    { id: 2, title: "Problem Set 2", dueDate: "2024-12-27", submitted: false, score: null },
  ],
}

export default function CourseDetailPage() {
  const [selectedLesson, setSelectedLesson] = useState(mockCourse.lessons[0])

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <Link href="/student/dashboard" className="text-blue-600 hover:underline text-sm mb-4 block">
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">{mockCourse.name}</h1>
        <p className="text-gray-600 mt-2">{mockCourse.description}</p>
      </div>

      {/* Course Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Instructor</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold text-gray-900">{mockCourse.instructor}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Enrolled Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold text-gray-900">{mockCourse.enrolledStudents}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Course Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold text-gray-900">{mockCourse.progress}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="lessons" className="space-y-4">
        <TabsList>
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        {/* Lessons Tab */}
        <TabsContent value="lessons" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Player */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>{selectedLesson.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-black rounded-lg flex items-center justify-center h-96">
                    <Play className="w-16 h-16 text-white" />
                  </div>
                  <div className="mt-4 flex gap-4">
                    <Button variant="outline">Previous</Button>
                    <Button className="flex-1">Next Lesson</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lessons List */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Course Lessons</CardTitle>
                  <CardDescription>{mockCourse.lessons.length} total lessons</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {mockCourse.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => setSelectedLesson(lesson)}
                      className={`w-full p-3 rounded-lg text-left text-sm transition-colors ${
                        selectedLesson.id === lesson.id ? "bg-blue-100 border-l-4 border-blue-600" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {lesson.watched ? (
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-gray-300 flex-shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className="font-medium text-gray-900 line-clamp-2">{lesson.title}</p>
                          <p className="text-xs text-gray-500 mt-1">{lesson.duration}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Assignments Tab */}
        <TabsContent value="assignments" className="space-y-4">
          {mockCourse.assignments.map((assignment) => (
            <Card key={assignment.id}>
              <CardHeader className="flex justify-between items-start">
                <div>
                  <CardTitle>{assignment.title}</CardTitle>
                  <CardDescription>Due: {assignment.dueDate}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {assignment.submitted && <Badge className="bg-green-100 text-green-800">Submitted</Badge>}
                  {assignment.score && <span className="font-semibold text-gray-900">{assignment.score}%</span>}
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline">View Assignment</Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Materials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Lecture Notes - Chapter {i}</p>
                      <p className="text-sm text-gray-500">PDF • 2.4 MB</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Download
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
