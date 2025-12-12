"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download } from "lucide-react"

const mockStudentsList = [
  { id: 1, name: "Ahmed Hassan", email: "ahmed@example.com", status: "active", courses: 3, gpa: 3.8 },
  { id: 2, name: "Fatima Mohamed", email: "fatima@example.com", status: "active", courses: 2, gpa: 3.6 },
  { id: 3, name: "Hassan Ali", email: "hassan@example.com", status: "inactive", courses: 1, gpa: 3.2 },
  { id: 4, name: "Zainab Ibrahim", email: "zainab@example.com", status: "active", courses: 3, gpa: 3.9 },
]

export default function AdminStudentsPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
          <p className="text-gray-600 mt-2">View and manage all students in the system</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input placeholder="Search students..." className="pl-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active" className="space-y-4">
            <TabsList>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
              <TabsTrigger value="all">All Students</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-3">
              {mockStudentsList.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-500">{student.email}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs text-gray-600">Courses</p>
                      <p className="font-semibold text-gray-900">{student.courses}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600">GPA</p>
                      <p className="font-semibold text-gray-900">{student.gpa}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Details
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
