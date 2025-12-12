"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Download, Plus, Edit2, Trash2 } from "lucide-react"
import Link from "next/link"

const mockTeachers = [
  {
    id: 1,
    name: "Dr. Ahmed Ali",
    email: "ahmed@example.com",
    department: "Mathematics",
    courses: ["MATH101", "MATH102"],
    status: "active",
  },
  {
    id: 2,
    name: "Ms. Fatima Hassan",
    email: "fatima@example.com",
    department: "Languages",
    courses: ["ENG101"],
    status: "active",
  },
  {
    id: 3,
    name: "Prof. Mohamed Ibrahim",
    email: "ibrahim@example.com",
    department: "Sciences",
    courses: ["PHY101", "PHY102"],
    status: "pending",
  },
]

const availableCourses = [
  { id: "MATH101", name: "Mathematics 101" },
  { id: "MATH102", name: "Mathematics 102" },
  { id: "ENG101", name: "English 101" },
  { id: "PHY101", name: "Physics 101" },
  { id: "PHY102", name: "Physics 102" },
  { id: "CHEM101", name: "Chemistry 101" },
]

export default function AdminTeachersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTeacher, setSelectedTeacher] = useState<number | null>(null)
  const [showAssignDialog, setShowAssignDialog] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState("")

  const filteredTeachers = mockTeachers.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teacher Management</h1>
          <p className="text-gray-600 mt-2">Register, manage, and assign teachers to courses</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/teachers/register">
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Register Teacher
            </Button>
          </Link>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search teachers by name or email..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredTeachers.map((teacher) => (
              <div
                key={teacher.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{teacher.name}</p>
                  <p className="text-sm text-gray-500">{teacher.email}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                      {teacher.department}
                    </span>
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded ${teacher.status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                    >
                      {teacher.status}
                    </span>
                  </div>
                </div>
                <div className="text-right mr-4">
                  <p className="text-xs text-gray-600">Courses</p>
                  <p className="font-semibold text-gray-900">{teacher.courses.length}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedTeacher(teacher.id)
                      setShowAssignDialog(true)
                    }}
                  >
                    Assign Course
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Course to Teacher</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select Course</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
              >
                <option value="">Choose a course...</option>
                {availableCourses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name} ({course.id})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-3">
              <Button className="bg-green-600 hover:bg-green-700">Assign</Button>
              <Button variant="outline" onClick={() => setShowAssignDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
