"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Calendar } from "lucide-react"

const mockSummaries = [
  {
    id: 1,
    course: "Mathematics 101",
    title: "Algebra Fundamentals - Chapter 1 & 2",
    content: "Key concepts including variables, equations, linear functions, and graphing techniques...",
    date: "2024-12-10",
    status: "completed",
  },
  {
    id: 2,
    course: "Mathematics 101",
    title: "Geometry Basics",
    content: "Introduction to angles, triangles, circles, and spatial reasoning...",
    date: "2024-12-05",
    status: "completed",
  },
  {
    id: 3,
    course: "English 101",
    title: "Literature Analysis - Shakespeare",
    content: "Analysis of major themes in Shakespeare's works and writing styles...",
    date: "2024-12-08",
    status: "completed",
  },
  {
    id: 4,
    course: "Physics 101",
    title: "Motion and Forces",
    content: "Newton's laws, velocity, acceleration, and force calculations...",
    date: "2024-12-12",
    status: "pending",
  },
]

export default function StudentSummariesPage() {
  const [selectedSummary, setSelectedSummary] = useState<number | null>(null)

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Learning Summaries</h1>
        <p className="text-gray-600 mt-2">ملخصات التعليم - Download learning summaries for your courses</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {mockSummaries.map((summary) => (
          <Card
            key={summary.id}
            className={`cursor-pointer transition-all ${selectedSummary === summary.id ? "ring-2 ring-blue-500" : ""}`}
            onClick={() => setSelectedSummary(summary.id)}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={summary.status === "completed" ? "default" : "secondary"}>{summary.status}</Badge>
                    <span className="text-sm text-gray-500">{summary.course}</span>
                  </div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    {summary.title}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">{summary.content}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  {summary.date}
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockSummaries.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No summaries available yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
